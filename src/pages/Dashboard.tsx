import React, {useEffect, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
    Archive,
    ArrowRight,
    Bookmark,
    Clock,
    Inbox,
    Mail,
    MapPin,
    Menu,
    Search,
    Settings as SettingsIcon,
    User,
    X
} from 'lucide-react';
import {SEO} from '../components/SEO';
import {API_BASE} from '../api';

type JobStatus = 'new' | 'saved' | 'archived';

export interface JobMatch {
    id: number;
    title: string;
    company: string;
    location: string;
    hoursAgo: number;
    score: number | null; // 0–100 fit %, null when the matcher was skipped
    status: JobStatus;
    color: string;
    url: string;
}

// --- backend (/users/:id/matches) → dashboard card shape -----------------
interface ApiMatch {
    id: number;
    title: string;
    company: string;
    location: string | null;
    job_url: string;
    date_posted: string | null;
    score: number | null;
    created_at: string | null;
}

// Stable hue from the company name — backend has no brand color.
const colorFor = (s: string) =>
    `oklch(55% 0.15 ${[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360})`;

// created_at is UTC but emitted without a 'Z'; treat a tz-less stamp as UTC.
const parseUtc = (s: string) => Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : s + 'Z');

const toJobMatch = (m: ApiMatch): JobMatch => ({
    id: m.id,
    title: m.title,
    company: m.company,
    location: m.location ?? '',
    hoursAgo: m.created_at ? Math.max(0, Math.round((Date.now() - parseUtc(m.created_at)) / 3.6e6)) : 0,
    score: m.score,
    status: 'new', // ponytail: backend has no saved/archived — Save/Dismiss stay local-only
    color: colorFor(m.company),
    url: m.job_url,
});

type Tab = 'new' | 'saved' | 'archived' | 'all';
type Sort = 'fit' | 'new';

const rel = (h: number) => {
    if (h < 1) return 'just now';
    if (h < 24) return `${h}h ago`;
    const d = Math.round(h / 24);
    return d === 1 ? 'yesterday' : `${d}d ago`;
};

export const Dashboard: React.FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const [jobs, setJobs] = useState<JobMatch[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [tab, setTab] = useState<Tab>('new');
    const [sort, setSort] = useState<Sort>('fit');
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!userId) return;
        fetch(`${API_BASE}/users/${userId}/matches`)
            .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((d: { matches: ApiMatch[] }) => setJobs(d.matches.map(toJobMatch)))
            .catch(e => {
                console.error('matches fetch failed', e);
                setLoadError('Could not load your matches.');
            });
    }, [userId]);

    const counts = useMemo(() => {
        const c = {new: 0, saved: 0, archived: 0, all: 0};
        jobs.forEach(j => {
            c[j.status]++;
            if (j.status !== 'archived') c.all++;
        });
        return c;
    }, [jobs]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        const arr = jobs.filter(j => {
            const inTab = tab === 'all' ? j.status !== 'archived' : j.status === tab;
            if (!inTab) return false;
            if (!q) return true;
            return (j.title + ' ' + j.company + ' ' + j.location).toLowerCase().includes(q);
        });
        arr.sort((a, b) => (sort === 'fit' ? (b.score ?? -1) - (a.score ?? -1) : a.hoursAgo - b.hoursAgo));
        return arr;
    }, [jobs, tab, sort, query]);

    const setStatus = (id: number, status: JobStatus) => {
        setJobs(prev => prev.map(j => (j.id === id ? {...j, status} : j)));
    };

    const emptyMsg =
        tab === 'new'
            ? {h: 'Inbox zero', p: "Nothing new cleared the bar. That's the filter working."}
            : tab === 'saved'
                ? {h: 'No saved roles', p: 'Save a match to keep it here.'}
                : tab === 'archived'
                    ? {h: 'Nothing archived', p: 'Dismissed matches land here.'}
                    : {h: 'No matches', p: 'Adjust your search or check back after the next scan.'};

    return (
        <main className="dash-app">
            <SEO title="Your matches — Your Job Finder"
                 description="The job matches we found for your profile, sorted by fit."
                 url="https://yourjobfinder.website/dashboard"/>
            <div className={`dash-scrim ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)}/>
            {/* SIDEBAR */}
            <aside className={`dash-aside ${menuOpen ? 'open' : ''}`}>
                <div className="dash-brand">
                    <span className="mark"/>Job Finder
                </div>
                <nav className="dash-nav">
                    <div className="nav-label">Inbox</div>
                    <button className={`nav-item ${tab === 'new' ? 'on' : ''}`}
                            onClick={() => {
                                setTab('new');
                                setMenuOpen(false);
                            }}>
                        <Mail size={17}/> Matches
                        <span className="badge">{counts.new}</span>
                    </button>
                    <button className={`nav-item ${tab === 'saved' ? 'on' : ''}`}
                            onClick={() => {
                                setTab('saved');
                                setMenuOpen(false);
                            }}>
                        <Bookmark size={17}/> Saved
                        <span className="badge ink">{counts.saved}</span>
                    </button>
                    <button className={`nav-item ${tab === 'archived' ? 'on' : ''}`}
                            onClick={() => {
                                setTab('archived');
                                setMenuOpen(false);
                            }}>
                        <Archive size={17}/> Archived
                    </button>
                    <div className="dash-divider"/>
                    <div className="nav-label">Account</div>
                    <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <User size={17}/> Profile
                    </Link>
                    <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <SettingsIcon size={17}/> Settings
                    </Link>
                </nav>
                <div className="dash-sidefoot">
                    <div className="scan">
                        <span className="live"/> Live · last scan 07:00
                    </div>
                    <div>247 listings scanned today</div>
                    <div className="side-user">
                        <span className="av">T</span>
                        <span>tahito@work.email</span>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="dash-main">
                <div className="dash-topbar">
                    <div>
                        <div className="topbar-row">
                            <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
                                <Menu size={18}/>
                            </button>
                            <h1>Your matches</h1>
                        </div>
                        <div className="dash-meta">
                            <b>{counts.new} new</b> today · cleared from 247 listings · last scan 7:00 AM
                        </div>
                    </div>
                    <div className="dash-search">
                        <Search size={15}/>
                        <input type="text" placeholder="Search title, company, location"
                               value={query} onChange={e => setQuery(e.target.value)}/>
                    </div>
                </div>

                <div className="dash-controls">
                    <div className="dash-tabs">
                        {([
                            ['new', 'New', counts.new],
                            ['saved', 'Saved', counts.saved],
                            ['archived', 'Archived', counts.archived],
                            ['all', 'All', counts.all],
                        ] as [Tab, string, number][]).map(([key, label, ct]) => (
                            <button key={key} className={`tab ${tab === key ? 'on' : ''}`} onClick={() => setTab(key)}>
                                {label} <span className="ct">{ct}</span>
                            </button>
                        ))}
                    </div>
                    <div className="dash-sort">
                        Sort
                        <div className="seg">
                            <button className={sort === 'fit' ? 'on' : ''} onClick={() => setSort('fit')}>Best fit
                            </button>
                            <button className={sort === 'new' ? 'on' : ''} onClick={() => setSort('new')}>Newest
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dash-list">
                    {visible.length === 0 ? (
                        <div className="dash-empty">
                            <Inbox size={28}/>
                            <div className="big">{loadError ? 'Something went wrong' : emptyMsg.h}</div>
                            <p>{loadError ?? emptyMsg.p}</p>
                        </div>
                    ) : (
                        visible.map((j, i) => (
                            <article className="dash-card" key={j.id} style={{animationDelay: `${i * 45}ms`}}>
                                <div className="logo" style={{background: j.color}}>{j.company.trim()[0]}</div>
                                <div className="info">
                                    <div className="titleline">
                                        <span className="title">{j.title}</span>
                                        {j.status === 'new' && j.hoursAgo <= 12 && <span className="newdot">NEW</span>}
                                    </div>
                                    <div className="metarow">
                                        <span className="co">{j.company}</span>
                                        <span className="sep">·</span>
                                        <span className="loc"><MapPin size={13}/>{j.location}</span>
                                        <span className="sep">·</span>
                                        <span className={`posted ${j.hoursAgo <= 12 ? 'fresh' : ''}`}>
                                            <Clock size={13}/>{rel(j.hoursAgo)}
                                        </span>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className={`score ${(j.score ?? 0) >= 90 ? 'hi' : ''}`}>
                                        {j.score ?? '—'}<small>% fit</small>
                                    </div>
                                    {j.status === 'archived' ? (
                                        <button className="restore"
                                                onClick={() => setStatus(j.id, 'new')}>Restore</button>
                                    ) : (
                                        <>
                                            <div className="actions">
                                                <button className={`iconbtn ${j.status === 'saved' ? 'saved' : ''}`}
                                                        title={j.status === 'saved' ? 'Unsave' : 'Save'}
                                                        onClick={() => setStatus(j.id, j.status === 'saved' ? 'new' : 'saved')}>
                                                    <Bookmark size={16}/>
                                                </button>
                                                <button className="iconbtn dismiss" title="Dismiss"
                                                        onClick={() => setStatus(j.id, 'archived')}>
                                                    <X size={16}/>
                                                </button>
                                            </div>
                                            <a className="viewbtn" href={j.url} target="_blank"
                                               rel="noopener noreferrer">View <ArrowRight size={13}/></a>
                                        </>
                                    )}
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
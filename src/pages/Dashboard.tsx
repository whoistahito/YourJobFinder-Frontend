import React, {useEffect, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
    Archive,
    ArrowRight,
    Bookmark,
    Envelope,
    List,
    MagnifyingGlass,
    SlidersHorizontal as SettingsIcon,
    Tray as Inbox,
    User,
    X
} from '@phosphor-icons/react';
import {SEO} from '../components/SEO';
import {API_BASE} from '../api';
import brandMark from '../assets/J-Puzzle-180.png';

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

interface MatchesResponse {
    user_id: string;
    email: string | null;
    matches: ApiMatch[];
}

// /users/:id/profile — what the user set up at signup (read-only).
interface ProfileData {
    user_id: string;
    email: string | null;
    position: string | null;
    location: string | null;
    job_type: string | null;
    skills: string[];
    experiences: string[];
    educations: string[];
}

// Stable hue from the company name — backend has no brand color.
const colorFor = (s: string) =>
    `oklch(55% 0.15 ${[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360})`;

// created_at is UTC but emitted without a 'Z'; a tz-less stamp is treated as UTC.
// Unparseable/missing stamps age to Infinity so they sort oldest-first.
const parseUtc = (s: string) => Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : s + 'Z');

const ageHours = (iso: string | null): number => {
    if (!iso) return Number.POSITIVE_INFINITY;
    const ms = Date.now() - parseUtc(iso);
    return Number.isFinite(ms) ? Math.max(0, Math.round(ms / 3.6e6)) : Number.POSITIVE_INFINITY;
};

const toJobMatch = (m: ApiMatch): JobMatch => ({
    id: m.id,
    title: m.title,
    company: m.company,
    location: m.location ?? '',
    hoursAgo: ageHours(m.created_at),
    score: m.score,
    status: 'new', // ponytail: backend has no saved/archived — Save/Dismiss stay local-only
    color: colorFor(m.company),
    url: m.job_url,
});

type Tab = 'new' | 'saved' | 'archived' | 'all';
type Sort = 'fit' | 'new';

const rel = (h: number) => {
    if (!Number.isFinite(h)) return 'long ago';
    if (h < 1) return 'just now';
    if (h < 24) return `${h}h ago`;
    const d = Math.round(h / 24);
    return d === 1 ? 'yesterday' : `${d}d ago`;
};

type StatusMap = Record<number, JobStatus>;

const readUid = (): string | undefined => localStorage.getItem('jmf:uid') ?? undefined;

const loadStatuses = (uid: string | undefined): StatusMap => {
    if (!uid) return {};
    try {
        return JSON.parse(localStorage.getItem(`jmf:status:${uid}`) ?? '{}') as StatusMap;
    } catch {
        return {};
    }
};

// "last scan" ≈ the newest match we ever wrote for this user
const fmtClock = (ms: number) => new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(ms);

export const Dashboard: React.FC = () => {
    const params = useParams<{ userId: string }>();
    // Bookmarked /dashboard without an id falls back to the last signed-up id.
    const userId: string | undefined = params.userId ?? readUid();
    const [rawJobs, setRawJobs] = useState<JobMatch[]>([]);
    const [overrides, setOverrides] = useState<StatusMap>(() => loadStatuses(userId));
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [lastScan, setLastScan] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [includeOlder, setIncludeOlder] = useState(false);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [profOpen, setProfOpen] = useState(false);
    const [tab, setTab] = useState<Tab>('new');
    const [sort, setSort] = useState<Sort>('fit');
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (params.userId) localStorage.setItem('jmf:uid', params.userId);
    }, [params.userId]);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        setOverrides(loadStatuses(userId));
        // Backend defaults to the last 30 days; ?older=1 lifts the window.
        const q = includeOlder ? '?older=1' : '';
        fetch(`${API_BASE}/users/${userId}/matches${q}`)
            .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((d: MatchesResponse) => {
                setUserEmail(d.email);
                setRawJobs(d.matches.map(toJobMatch));
                const newest = d.matches.reduce<string | null>(
                    (a, m) => (m.created_at && (!a || m.created_at > a) ? m.created_at : a), null);
                setLastScan(newest ? fmtClock(parseUtc(newest)) : null);
            })
            .catch(e => {
                console.error('matches fetch failed', e);
                setLoadError('Could not load your matches.');
            })
            .finally(() => setLoading(false));
    }, [userId, includeOlder]);

    useEffect(() => {
        if (!userId) return;
        fetch(`${API_BASE}/users/${userId}/profile`)
            .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((p: ProfileData) => setProfile(p))
            .catch(() => setProfile(null));
    }, [userId]);

    // backend only knows 'new'; saved/archived live in overrides
    const jobs = useMemo(() => rawJobs.map(j => ({...j, status: overrides[j.id] ?? j.status})), [rawJobs, overrides]);

    useEffect(() => {
        if (userId) localStorage.setItem(`jmf:status:${userId}`, JSON.stringify(overrides));
    }, [overrides, userId]);

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
        setOverrides(prev => ({...prev, [id]: status}));
    };

    const emptyMsg =
        !userId ? {h: 'No matches yet', p: 'Sign up and your matches will collect here.'}
            : tab === 'new'
            ? {h: 'Inbox zero', p: "Nothing new cleared the bar. That's the filter working."}
            : tab === 'saved'
                ? {h: 'No saved roles', p: 'Save a match to keep it here.'}
                : tab === 'archived'
                    ? {h: 'Nothing archived', p: 'Dismissed matches land here.'}
                    : {h: 'No matches', p: 'Adjust your search or check back after the next scan.'};

    return (
        <main id="main-content" className="dash-app">
            <SEO title="Your matches — Your Job Finder"
                 description="The job matches we found for your profile, sorted by fit."
                 url="https://yourjobfinder.website/dashboard"/>
            <div className={`dash-scrim ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)}/>
            {/* SIDEBAR */}
            <aside className={`dash-aside ${menuOpen ? 'open' : ''}`}>
                <div className="dash-brand">
                    <img className="mark" src={brandMark} alt=""/>Job Finder
                </div>
                <nav className="dash-nav">
                    <div className="nav-label">Inbox</div>
                    <button className={`nav-item ${tab === 'new' ? 'on' : ''}`}
                            onClick={() => {
                                setTab('new');
                                setMenuOpen(false);
                            }}>
                        <Envelope size={17} weight="bold"/> Matches
                        <span className="badge">{counts.new}</span>
                    </button>
                    <button className={`nav-item ${tab === 'saved' ? 'on' : ''}`}
                            onClick={() => {
                                setTab('saved');
                                setMenuOpen(false);
                            }}>
                        <Bookmark size={17} weight="bold"/> Saved
                        <span className="badge ink">{counts.saved}</span>
                    </button>
                    <button className={`nav-item ${tab === 'archived' ? 'on' : ''}`}
                            onClick={() => {
                                setTab('archived');
                                setMenuOpen(false);
                            }}>
                        <Archive size={17} weight="bold"/> Archived
                    </button>
                    <div className="dash-divider"/>
                    <div className="nav-label">Account</div>
                    <button className="nav-item" onClick={() => {
                        setProfOpen(true);
                        setMenuOpen(false);
                    }}>
                        <User size={17} weight="bold"/> Profile
                    </button>
                    <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <SettingsIcon size={17} weight="bold"/> Settings
                    </Link>
                </nav>
                <div className="dash-sidefoot">
                    <div className="scan">
                        <span className="live"/> Live{lastScan ? ` · last scan ${lastScan}` : ''}
                    </div>
                    <div>{counts.all === 0 ? 'No matches yet' : `${counts.all} matches · ${counts.new} new`}</div>
                    <div className="side-user">
                        <span className="av">{(userEmail?.trim()?.[0] ?? 'U').toUpperCase()}</span>
                        <span>{userEmail ?? 'your account'}</span>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="dash-main">
                <div className="dash-topbar">
                    <div>
                        <div className="topbar-row">
                            <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
                                <List size={18} weight="bold"/>
                            </button>
                            <h1>Your matches</h1>
                        </div>
                        <div className="dash-meta">
                            <b>{counts.new} new</b> · {counts.all} matches{lastScan ? ` · last scan ${lastScan}` : ''}
                        </div>
                    </div>
                    <div className="dash-search">
                        <MagnifyingGlass size={15} weight="bold"/>
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
                        <button className={`older-chip ${includeOlder ? 'on' : ''}`}
                                onClick={() => setIncludeOlder(v => !v)}>
                            Include older
                        </button>
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
                    {loading ? (
                        <div className="dash-empty">
                            <Inbox size={28} weight="bold"/>
                            <div className="big">Loading your matches…</div>
                        </div>
                    ) : visible.length === 0 ? (
                        <div className="dash-empty">
                            <Inbox size={28} weight="bold"/>
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
                                        <span className={`score-badge ${j.score == null ? 'none' : ''}`}>
                                            {j.score == null ? 'unscored' : `${j.score}% fit`}
                                        </span>
                                    </div>
                                    <div className="metarow">
                                        <span className="co">{j.company}</span>
                                        <span className="sep">·</span>
                                        <span className="loc">{j.location || 'any location'}</span>
                                        <span className="sep">·</span>
                                        <span className={`posted ${j.hoursAgo <= 12 ? 'fresh' : ''}`}>
                                            {rel(j.hoursAgo)}
                                        </span>
                                    </div>
                                    <div className="foot">
                                        {j.status === 'archived' ? (
                                            <button className="restore"
                                                    onClick={() => setStatus(j.id, 'new')}>Restore</button>
                                        ) : (
                                            <>
                                                <button className={`iconbtn ${j.status === 'saved' ? 'saved' : ''}`}
                                                        title={j.status === 'saved' ? 'Unsave' : 'Save'}
                                                        onClick={() => setStatus(j.id, j.status === 'saved' ? 'new' : 'saved')}>
                                                    <Bookmark size={16} weight="bold"/>
                                                </button>
                                                <button className="iconbtn dismiss" title="Dismiss"
                                                        onClick={() => setStatus(j.id, 'archived')}>
                                                    <X size={16} weight="bold"/>
                                                </button>
                                                <a className="viewbtn" href={j.url} target="_blank"
                                                   rel="noopener noreferrer">View <ArrowRight size={13} weight="bold"/></a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>

            <div className={`dash-scrim ${profOpen ? 'show' : ''}`} onClick={() => setProfOpen(false)}/>
            {/* PROFILE DRAWER — read-only view of the signup data */}
            <aside className={`dash-profile ${profOpen ? 'open' : ''}`} aria-hidden={!profOpen}>
                <div className="prof-head">
                    <img className="mark" src={brandMark} alt=""/> Your profile
                    <button className="prof-close" onClick={() => setProfOpen(false)} aria-label="Close">
                        <X size={16} weight="bold"/>
                    </button>
                </div>
                <div className="prof-body">
                    {!profile ? (
                        <p className="prof-empty">Profile could not be loaded.</p>
                    ) : (
                        <>
                            <div className="prof-grid">
                                <div className="prof-cell">
                                    <span className="lbl">Email</span>
                                    <b>{profile.email ?? '—'}</b>
                                </div>
                                <div className="prof-cell">
                                    <span className="lbl">Role</span>
                                    <b>{profile.position ?? '—'}</b>
                                </div>
                                <div className="prof-cell">
                                    <span className="lbl">Job type</span>
                                    <b>{(profile.job_type ?? '—').replace(/-/g, ' ')}</b>
                                </div>
                                <div className="prof-cell">
                                    <span className="lbl">Location</span>
                                    <b>{profile.location ?? '—'}</b>
                                </div>
                            </div>
                            <div className="prof-section">
                                <span className="lbl">Skills</span>
                                {profile.skills.length ? (
                                    <div className="prof-chips">
                                        {profile.skills.map(s => <span key={s} className="prof-chip">{s}</span>)}
                                    </div>
                                ) : <span className="prof-empty">Not provided</span>}
                            </div>
                            <div className="prof-section">
                                <span className="lbl">Experience</span>
                                {profile.experiences.length ? (
                                    <ul className="prof-list">
                                        {profile.experiences.map(s => <li key={s}>{s}</li>)}
                                    </ul>
                                ) : <span className="prof-empty">Not provided</span>}
                            </div>
                            <div className="prof-section">
                                <span className="lbl">Education</span>
                                {profile.educations.length ? (
                                    <ul className="prof-list">
                                        {profile.educations.map(s => <li key={s}>{s}</li>)}
                                    </ul>
                                ) : <span className="prof-empty">Not provided</span>}
                            </div>
                            <p className="prof-note">
                                These are the inputs your matches are scored against. They come from the
                                signup form and the daily scan.
                            </p>
                        </>
                    )}
                </div>
            </aside>
        </main>
    );
};

export default Dashboard;
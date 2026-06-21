import React from 'react';
import {Badge} from './ui/Badge';

// Three marketing-forward takes on the "Why us" stack card, privacy led.
// Each returns the INNER content of an <article className="stack-card"> so it drops
// straight into JobSearchForm. Copy follows the brand voice: terse, absolute, no em dashes.
//
// Research basis (Apple, DuckDuckGo, Proton, Signal): privacy reads as identity not a
// feature bullet; claims are absolute and plain ("we never sell your data"); credibility
// comes from the model, not from shield badges.

const secondary = [
    {t: 'Smarter matching', d: 'AI reads the whole posting and matches meaning, not keywords.'},
    {t: 'One email, max', d: 'A single message a day, and only when something genuinely fits.'},
    {t: 'Leave in one click', d: 'The unsubscribe link sits in every email. No hoops, no questions.'},
];

// ── Variant A — Manifesto ──────────────────────────────────────────────────
// Privacy is the headline. Big declarative statement, model-based credibility,
// the functional value props demoted to a quiet supporting row. Apple/Proton stance.
export const WhyUsManifesto: React.FC = () => (
    <>
        <h2>Your data<br/>stays yours.</h2>
        <div className="stack-line"/>
        <div className="max-w-2xl space-y-6">
            <p className="subcopy">
                Your profile does exactly one thing: find you a job. We never sell it, never share it
                with recruiters, and never mine it for ads. There are no ads here to mine it for.
            </p>
            <div className="flex flex-wrap gap-2">
                <Badge tone="accent">Never sold</Badge>
                <Badge tone="accent">Never shared</Badge>
                <Badge tone="ink">No ads, ever</Badge>
            </div>
        </div>
    </>
);

// ── Variant B — Promises ───────────────────────────────────────────────────
// Anti-noise voice: a list of blunt commitments, privacy first. NEVER/ONE tags carry
// the rhythm. DuckDuckGo-style absolutes. Matches "opinionated, decisive" brand.
const promises = [
    {
        tag: 'NEVER',
        tone: 'accent' as const,
        t: 'We never sell or share your data.',
        d: 'Not to recruiters, not to advertisers, not to anyone. It stays between you and the matching engine.'
    },
    {
        tag: 'NEVER',
        tone: 'accent' as const,
        t: 'We never run an ad.',
        d: 'The product is the email, not your attention. Nothing on this page is trying to sell your eyeballs.'
    },
    {
        tag: 'ONE',
        tone: 'ink' as const,
        t: 'One email a day, at most.',
        d: 'And only when a posting genuinely fits. Silence is the default, not the exception.'
    },
    {
        tag: 'ONE',
        tone: 'ink' as const,
        t: 'One click to leave.',
        d: 'The unsubscribe link is in every email. No funnel, no "are you sure", no retention tricks.'
    },
];

export const WhyUsPromises: React.FC = () => (
    <>
        <h2>Four promises.</h2>
        <div className="stack-line"/>
        <ul className="divide-y divide-[color:var(--clr-border)]">
            {promises.map(p => (
                <li key={p.t} className="flex flex-col gap-3 py-6 sm:flex-row sm:gap-6 first:pt-0 last:pb-0">
                    <div className="sm:w-24 shrink-0">
                        <Badge tone={p.tone}>{p.tag}</Badge>
                    </div>
                    <div>
                        <h3 className="text-[1.0625rem] font-medium text-[color:var(--clr-text)] leading-snug">{p.t}</h3>
                        <p className="mt-1.5 max-w-md text-[0.8125rem] leading-relaxed text-[color:var(--clr-sub)]">{p.d}</p>
                    </div>
                </li>
            ))}
        </ul>
    </>
);

// ── Variant C — Pledge + Proof ─────────────────────────────────────────────
// Two columns: a privacy pledge with a what-we-use / what-we-never-do contrast for
// credibility, beside the functional value props. Balances privacy emphasis with the
// rest of the pitch.
export const WhyUsPledge: React.FC = () => (
    <>
        <h2>Why us</h2>
        <div className="stack-line"/>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
                <p className="eyebrow" style={{color: 'var(--clr-amber)'}}>The privacy pledge</p>
                <p className="text-[1.5rem] leading-tight font-semibold text-[color:var(--clr-text)]"
                   style={{fontFamily: "'Barlow Condensed', sans-serif"}}>
                    Privacy is the default here, not a setting you have to find.
                </p>
                <p className="subcopy" style={{fontSize: '0.95rem'}}>
                    We collect only what the match needs, and we use it for nothing else.
                </p>
                <div
                    className="grid grid-cols-2 gap-px bg-[color:var(--clr-border)] border-2 border-[color:var(--clr-text)]">
                    <div className="bg-[color:var(--clr-base)] p-4">
                        <p className="eyebrow mb-2" style={{color: 'var(--clr-sub)'}}>What we use</p>
                        <p className="text-[0.8125rem] leading-relaxed text-[color:var(--clr-text)]">Your role, skills,
                            and email. To match and to notify.</p>
                    </div>
                    <div className="bg-[color:var(--clr-base)] p-4">
                        <p className="eyebrow mb-2" style={{color: 'var(--clr-danger)'}}>What we never do</p>
                        <p className="text-[0.8125rem] leading-relaxed text-[color:var(--clr-text)]">Sell it, share it
                            with recruiters, or run ads against it.</p>
                    </div>
                </div>
            </div>
            <ul className="divide-y divide-[color:var(--clr-border)]">
                {secondary.map((s, i) => (
                    <li key={s.t} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        <span className="stack-badge">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <h3 className="text-[1rem] font-medium text-[color:var(--clr-text)] leading-snug">{s.t}</h3>
                            <p className="mt-1 text-[0.8125rem] leading-relaxed text-[color:var(--clr-sub)]">{s.d}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

export const WHY_US_VARIANTS = [
    {
        key: 'manifesto',
        name: 'A. Manifesto',
        blurb: 'Privacy is the headline. Big declarative statement, model-based credibility, value props demoted. Apple / Proton stance.',
        Component: WhyUsManifesto
    },
    {
        key: 'promises',
        name: 'B. Four promises',
        blurb: 'Anti-noise voice: blunt NEVER / ONE commitments, privacy first. DuckDuckGo-style absolutes.',
        Component: WhyUsPromises
    },
    {
        key: 'pledge',
        name: 'C. Pledge + proof',
        blurb: 'Privacy pledge with a use / never-do contrast for credibility, beside the functional benefits.',
        Component: WhyUsPledge
    },
] as const;

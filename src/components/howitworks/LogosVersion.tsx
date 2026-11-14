import React from 'react';

// V4 — "The logo steps": the Third League pattern, rebuilt in our system.
// Three cards, one bold mark per step, a number and one line of copy. The
// marks are drawn here (not stock icons) so they share the same ink/blue rules
// as the rest of the page. No motion.

const ScanMark: React.FC = () => (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
        <rect x="8" y="14" width="56" height="14" fill="var(--clr-base)" stroke="var(--clr-text)"
              strokeWidth="3"/>
        <rect x="8" y="36" width="56" height="14" fill="var(--clr-base)" stroke="var(--clr-text)"
              strokeWidth="3"/>
        <rect x="8" y="58" width="56" height="14" fill="var(--clr-base)" stroke="var(--clr-text)"
              strokeWidth="3"/>
        <circle cx="64" cy="54" r="16" fill="var(--clr-amber)" stroke="var(--clr-text)" strokeWidth="3"/>
        <line x1="76" y1="66" x2="88" y2="78" stroke="var(--clr-text)" strokeWidth="5"/>
    </svg>
);

const CheckMark: React.FC = () => (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
        <rect x="10" y="8" width="62" height="80" fill="var(--clr-base)" stroke="var(--clr-text)"
              strokeWidth="3"/>
        <circle cx="28" cy="28" r="6" fill="var(--clr-amber)" stroke="var(--clr-text)" strokeWidth="3"/>
        <line x1="40" y1="28" x2="60" y2="28" stroke="var(--clr-text)" strokeWidth="3"/>
        <line x1="22" y1="46" x2="62" y2="46" stroke="var(--clr-text)" strokeWidth="3"/>
        <line x1="22" y1="56" x2="52" y2="56" stroke="var(--clr-text)" strokeWidth="3"/>
        <path d="M42 70 l9 9 l18 -22" fill="none" stroke="var(--clr-amber)" strokeWidth="7"/>
    </svg>
);

const SendMark: React.FC = () => (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
        <rect x="10" y="30" width="62" height="44" fill="var(--clr-base)" stroke="var(--clr-text)"
              strokeWidth="3"/>
        <path d="M10 30 L41 52 L72 30" fill="none" stroke="var(--clr-text)" strokeWidth="3"/>
        <circle cx="74" cy="28" r="13" fill="var(--clr-amber)" stroke="var(--clr-text)" strokeWidth="3"/>
        <text x="74" y="33" textAnchor="middle" fontFamily="Geist Mono, ui-monospace, monospace"
              fontSize="13" fontWeight="700" fill="var(--clr-base)">1
        </text>
    </svg>
);

const steps = [
    {
        n: '01',
        title: 'Scan every posting',
        copy: 'Every new listing, read in full — title, stack, seniority, pay.',
        Mark: ScanMark,
    },
    {
        n: '02',
        title: 'Check it against you',
        copy: 'Skills, salary floor, city. One requirement off and the posting is out.',
        Mark: CheckMark,
    },
    {
        n: '03',
        title: 'Send one email',
        copy: 'Only when something clears. One job, one email, at 08:00.',
        Mark: SendMark,
    },
];

export const LogosVersion: React.FC = () => (
    <div className="w-full">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <h2>How it works</h2>
            <p className="subcopy max-w-md">
                You set the bar once. Every morning we read the new listings against your profile and send the one that
                clears it. The rest you never see.
            </p>
        </header>

        <ol className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {steps.map(step => {
                const Mark = step.Mark;
                return (
                    <li key={step.n}
                        className="flex flex-col border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-float)] p-5 shadow-[4px_4px_0_var(--clr-text)] lg:p-7">
                        <span
                            className="font-mono text-sm font-semibold leading-none tracking-[0.16em] text-[color:var(--clr-amber)] lg:text-lg">
                            {step.n}
                        </span>
                        <div className="mt-5 flex justify-center lg:mt-6">
                            <div
                                className="flex h-20 w-20 items-center justify-center border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-base)] p-2.5 shadow-[3px_3px_0_var(--clr-text)] lg:h-36 lg:w-36 lg:p-4">
                                <Mark/>
                            </div>
                        </div>
                        <h3 className="mt-5 text-lg font-bold leading-tight text-[color:var(--clr-text)] lg:mt-6 lg:text-xl">
                            {step.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--clr-sub)] lg:text-sm">
                            {step.copy}
                        </p>
                    </li>
                );
            })}
        </ol>
    </div>
);

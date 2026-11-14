import React from 'react';

// V1 — "The inbox": the output leads. A framed mock of the one email you get,
// with the three-step pipeline reduced to a quiet caption underneath.
// No motion: this variant is meant to be read, not watched.
const fitChecks = [
    'React + TypeScript, 5 years',
    'Senior level, inside your salary band',
    'Berlin, hybrid friendly',
];

export const InboxVersion: React.FC = () => (
    <div role="img"
         aria-label="Mock daily email: one job, why it fits, and a view job button. Below it: scan every posting, check it against you, send one.">
        <div className="border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-base)] shadow-[6px_6px_0_var(--clr-text)]">
            {/* Mail chrome — one line, no fake sender address */}
            <div className="flex items-center justify-between gap-4 border-b-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-raised)] px-5 py-2.5">
                <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--clr-text)]">
                    <span aria-hidden="true" className="h-2 w-2 bg-[color:var(--clr-amber)]"/>
                    Your daily email
                </span>
                <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--clr-sub)]">
                    08:02<span className="hidden sm:inline"> · Mon</span>
                </span>
            </div>

            <div className="p-5 sm:p-6">
                <p className="text-2xl font-bold leading-tight tracking-[-0.015em] text-[color:var(--clr-text)]">
                    Senior Frontend Engineer
                </p>
                <p className="mt-1 text-sm text-[color:var(--clr-sub)]">
                    Northwind Labs · Berlin · €85–100k
                </p>

                <div className="mt-5 border-t border-[color:var(--clr-border)] pt-4">
                    <p className="eyebrow">Why it fits</p>
                    <ul className="mt-2.5 space-y-1.5">
                        {fitChecks.map(check => (
                            <li key={check}
                                className="flex items-start gap-2.5 text-sm font-medium text-[color:var(--clr-text)]">
                                <span aria-hidden="true" className="mt-0.5 text-[color:var(--clr-amber)]">✓</span>
                                {check}
                            </li>
                        ))}
                    </ul>
                </div>

                <span
                    className="mt-5 inline-flex items-center gap-2 border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-amber)] px-4 py-2 text-sm font-semibold text-[color:var(--clr-base)] shadow-[3px_3px_0_var(--clr-text)]">
                    View job <span aria-hidden="true">→</span>
                </span>
            </div>
        </div>

        {/* The pipeline as a caption, not a diagram */}
        <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--clr-sub)]">
            <span>Scan every posting</span>
            <span aria-hidden="true" className="text-[color:var(--clr-amber)]">→</span>
            <span>Check it against you</span>
            <span aria-hidden="true" className="text-[color:var(--clr-amber)]">→</span>
            <span>Send one</span>
        </p>
    </div>
);

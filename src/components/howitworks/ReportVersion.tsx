import React from 'react';

// V2 — "The match report": the mechanism as a worksheet. What the posting asks
// sits next to what you bring, row by row, and the verdict is the payoff.
// Inspired by receipt/report UI: rules, mono labels, one total at the bottom.
const rows = [
    {ask: 'React + TypeScript', you: '5 years'},
    {ask: 'Senior level', you: '7 years'},
    {ask: 'Berlin or hybrid', you: 'Berlin'},
    {ask: '€85–100k', you: 'In your band'},
];

export const ReportVersion: React.FC = () => (
    <div role="img"
         aria-label="Mock match report: four requirements from the posting checked against your profile, ending in one match sent at 08:02."
         className="border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-base)] shadow-[6px_6px_0_var(--clr-text)]">
        <div className="flex items-center justify-between gap-4 border-b-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-raised)] px-5 py-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--clr-text)]">
                Match report
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--clr-sub)]">
                #0042 · 08:02
            </span>
        </div>

        <div className="px-5 pb-5 pt-4 sm:px-6">
            <p className="text-lg font-bold leading-tight text-[color:var(--clr-text)]">
                Senior Frontend Engineer
            </p>
            <p className="mt-0.5 text-sm text-[color:var(--clr-sub)]">
                Northwind Labs · Berlin
            </p>

            <div className="mt-4 border-t-[length:2px] border-[color:var(--clr-text)]">
                <div className="grid grid-cols-[1.2fr_1fr] gap-3 border-b border-[color:var(--clr-border)] py-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--clr-sub)]">
                        What it asks
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--clr-sub)]">
                        You
                    </span>
                </div>
                {rows.map(row => (
                    <div key={row.ask}
                         className="grid grid-cols-[1.2fr_1fr] items-center gap-3 border-b border-[color:var(--clr-border)] py-2.5 text-sm">
                        <span className="font-medium text-[color:var(--clr-text)]">{row.ask}</span>
                        <span className="flex items-center gap-2 font-medium text-[color:var(--clr-text)]">
                            <span aria-hidden="true" className="text-[color:var(--clr-amber)]">✓</span>
                            {row.you}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div
            className="flex items-end justify-between gap-4 border-t-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-amber)] px-5 py-3.5 text-[color:var(--clr-base)] sm:px-6">
            <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-80">Verdict</p>
                <p className="text-xl font-bold leading-tight">1 match</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-80">Sent · 08:02</p>
        </div>
    </div>
);

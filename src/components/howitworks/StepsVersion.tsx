import React from 'react';

// V3 — "The numbered process": typography does the work. Three steps with
// oversized mono numbers, one line of plain copy each, and a single blue
// payoff chip after the third. No mocks, no motion.
const steps = [
    {
        n: '01',
        title: 'Scan every posting',
        copy: 'The whole listing. Title, stack, seniority, salary, location. Not just keywords.',
    },
    {
        n: '02',
        title: 'Check it against you',
        copy: 'Skills, years, work style, pay. One requirement off and the posting is out.',
    },
    {
        n: '03',
        title: 'Send one email',
        copy: 'Only when something clears. One job, one email, every morning at 08:00.',
    },
];

export const StepsVersion: React.FC = () => (
    <ol className="border-t-[length:2px] border-[color:var(--clr-text)]">
        {steps.map((step, index) => (
            <li key={step.n}
                className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-[color:var(--clr-border)] py-5">
                <span aria-hidden="true"
                      className="font-mono text-3xl font-semibold leading-none tracking-[-0.03em] text-[color:var(--clr-amber)]">
                    {step.n}
                </span>
                <div>
                    <h3 className="text-lg font-bold leading-tight text-[color:var(--clr-text)]">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--clr-sub)]">{step.copy}</p>
                    {index === steps.length - 1 && (
                        <span
                            className="mt-3 inline-flex items-center gap-2 border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-amber)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--clr-base)]">
                            1 match · 08:02
                        </span>
                    )}
                </div>
            </li>
        ))}
    </ol>
);

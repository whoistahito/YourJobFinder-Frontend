import React from 'react';

const needs = ['Skills', 'Experience', 'Qualifications'];

const Card: React.FC<{ label: string; children: React.ReactNode; accent?: boolean }> = ({label, children, accent}) => (
    <div className="flex-1 min-w-0">
        <div className={"h-28 flex flex-col justify-center gap-2 px-4 border-[length:2px] border-[color:var(--clr-text)] " +
                        "shadow-[4px_4px_0_var(--clr-text)] " + (accent
                ? 'bg-[color:var(--clr-amber)]'
                : 'bg-[color:var(--clr-base)]')}>
            {children}
        </div>
        <p className="eyebrow mt-2 text-center text-[color:var(--clr-sub)]">{label}</p>
    </div>
);

const Arrow: React.FC<{ note: string }> = ({note}) => (
    <div className="flex sm:flex-col items-center justify-center gap-1 shrink-0 py-1 sm:py-0 sm:pb-6"
         aria-hidden="true">
            <span className="text-xl font-bold text-[color:var(--clr-text)]">
                <span className="hidden sm:inline">→</span><span className="sm:hidden">↓</span>
            </span>
        <span className="eyebrow whitespace-nowrap text-[color:var(--clr-sub)]">{note}</span>
    </div>
);

export const MatchingFlow: React.FC = () => (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-3"
         role="img"
         aria-label="A job posting is read by AI into a clean list of needs, checked against your profile, and turned into one email.">
        <Card label="Job posting">
            {['w-[90%]', 'w-[70%]', 'w-[80%]', 'w-[55%]'].map((w, i) => (
                <div key={i} className={"h-2 " + w + " bg-[color:var(--clr-border)]"}/>
            ))}
        </Card>

        <Arrow note="AI reads it"/>

        <Card label="What it needs">
            {needs.map(n => (
                <div key={n} className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-[color:var(--clr-amber)]">✓</span>{n}
                </div>
            ))}
        </Card>

        <Arrow note="vs. your profile"/>

        <Card label="One email" accent>
            <div className="text-center text-[color:var(--clr-base)]">
                <div className="text-2xl leading-none">✉</div>
                <div className="font-semibold text-sm mt-2">It&apos;s a match</div>
            </div>
        </Card>
    </div>
);

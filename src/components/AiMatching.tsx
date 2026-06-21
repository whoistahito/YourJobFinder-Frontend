import React from 'react';

const needs = ['Skills', 'Experience', 'Qualifications'];

const Card: React.FC<{ label: string; children: React.ReactNode; accent?: boolean }> = ({label, children, accent}) => (
    <div className="flex-1 min-w-0">
        <div className="h-28 flex flex-col justify-center gap-2 px-4 border-[length:2px] border-[color:var(--clr-text)]
                        shadow-[4px_4px_0_var(--clr-text)]"
             style={{background: accent ? 'var(--clr-amber)' : 'var(--clr-base)'}}>
            {children}
        </div>
        <p className="eyebrow mt-2 text-center" style={{color: 'var(--clr-sub)'}}>{label}</p>
    </div>
);

const Arrow: React.FC<{ note: string }> = ({note}) => (
    <div className="flex sm:flex-col items-center justify-center gap-1 shrink-0 py-1 sm:py-0 sm:pb-6"
         aria-hidden="true">
        <span style={{fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.4rem'}}>
            <span className="hidden sm:inline">→</span><span className="sm:hidden">↓</span>
        </span>
        <span className="eyebrow whitespace-nowrap" style={{color: 'var(--clr-faint)'}}>{note}</span>
    </div>
);

export const MatchingFlow: React.FC = () => (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-3"
         role="img"
         aria-label="A job posting is read by AI into a clean list of needs, checked against your profile, and turned into one email.">
        <Card label="Job posting">
            {[90, 70, 80, 55].map((w, i) => (
                <div key={i} className="h-2" style={{width: `${w}%`, background: 'var(--clr-border)'}}/>
            ))}
        </Card>

        <Arrow note="AI reads it"/>

        <Card label="What it needs">
            {needs.map(n => (
                <div key={n} className="flex items-center gap-2 text-sm font-semibold">
                    <span style={{color: 'var(--clr-amber)'}}>✓</span>{n}
                </div>
            ))}
        </Card>

        <Arrow note="vs. your profile"/>

        <Card label="One email" accent>
            <div className="text-center" style={{color: 'var(--clr-base)'}}>
                <div style={{fontSize: '1.75rem', lineHeight: 1}}>✉</div>
                <div className="font-semibold text-sm mt-2">It's a match</div>
            </div>
        </Card>
    </div>
);

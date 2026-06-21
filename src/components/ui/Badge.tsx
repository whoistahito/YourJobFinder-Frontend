import React from 'react';
import {cn} from '../../utils/cn';

// Brutalist badge: zero radius, ink border, solid fill. Single accent + ink/outline; danger for errors only.
type BadgeTone = 'accent' | 'ink' | 'outline' | 'danger';

const tones: Record<BadgeTone, string> = {
    accent: 'bg-[color:var(--clr-amber)] text-[color:var(--clr-base)]',
    ink: 'bg-[color:var(--clr-text)] text-[color:var(--clr-base)]',
    outline: 'bg-transparent text-[color:var(--clr-text)]',
    danger: 'bg-[color:var(--clr-danger)] text-[color:var(--clr-base)]',
};

export const Badge: React.FC<{ tone?: BadgeTone; className?: string; children: React.ReactNode }> =
    ({tone = 'accent', className, children}) => (
        <span className={cn(
            'inline-flex items-center gap-1.5 border-2 border-[color:var(--clr-text)] px-2.5 py-0.5',
            'text-[11px] font-semibold uppercase tracking-wide leading-tight',
            tones[tone], className,
        )}>
            {children}
        </span>
    );

import React from 'react';
import {LucideIcon} from 'lucide-react';
import {cn} from '../../utils/cn';

// Brutalist icon tile: square, 2px ink border, hard offset shadow, solid fill.
// Single accent for positive/brand, danger for errors, ink/surface for neutral.
type Tone = 'accent' | 'danger' | 'ink' | 'surface';

const tones: Record<Tone, string> = {
    accent: 'bg-[color:var(--clr-amber)] text-[color:var(--clr-base)]',
    danger: 'bg-[color:var(--clr-danger)] text-[color:var(--clr-base)]',
    ink: 'bg-[color:var(--clr-text)] text-[color:var(--clr-base)]',
    surface: 'bg-[color:var(--clr-base)] text-[color:var(--clr-text)]',
};

const sizes = {
    sm: 'h-11 w-11',
    md: 'h-14 w-14',
    lg: 'h-16 w-16',
} as const;

export const IconTile: React.FC<{
    icon: LucideIcon;
    tone?: Tone;
    size?: keyof typeof sizes;
    className?: string;
}> = ({icon: Icon, tone = 'accent', size = 'md', className}) => (
    <span className={cn(
        'inline-flex items-center justify-center border-2 border-[color:var(--clr-text)] shadow-[3px_3px_0_var(--clr-text)]',
        sizes[size], tones[tone], className,
    )}>
        <Icon className={size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'} strokeWidth={2}/>
    </span>
);

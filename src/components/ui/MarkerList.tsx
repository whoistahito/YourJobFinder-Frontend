import React from 'react';

// Extracted from the bullet/arrow/check list items repeated in EmailConfirm(Error) and Blog.
type Marker = 'bullet' | 'arrow' | 'check';

const markers: Record<Marker, { glyph: string; cls: string }> = {
    bullet: {glyph: '•', cls: 'text-[color:var(--clr-amber)] mt-1'},
    arrow: {glyph: '→', cls: 'text-[color:var(--clr-faint)] mt-1'},
    check: {glyph: '✓', cls: 'text-[color:var(--clr-success)] mt-0.5'},
};

export const MarkerList: React.FC<{ items: React.ReactNode[]; marker?: Marker; className?: string }> =
    ({items, marker = 'bullet', className}) => {
        const m = markers[marker];
        return (
            <ul className={className ?? 'space-y-2 text-sm text-[color:var(--clr-sub)]'}>
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className={m.cls} aria-hidden="true">{m.glyph}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

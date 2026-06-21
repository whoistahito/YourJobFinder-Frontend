import React from 'react';

// Extracted from the bullet/arrow/check list items repeated in EmailConfirm(Error) and Blog.
type Marker = 'bullet' | 'arrow' | 'check';

const markers: Record<Marker, { glyph: string; cls: string }> = {
    bullet: {glyph: '•', cls: 'text-brand-500 mt-1'},
    arrow: {glyph: '→', cls: 'text-gray-400'},
    check: {glyph: '✓', cls: 'text-emerald-600 mt-0.5'},
};

export const MarkerList: React.FC<{ items: React.ReactNode[]; marker?: Marker; className?: string }> =
    ({items, marker = 'bullet', className}) => {
        const m = markers[marker];
        return (
            <ul className={className ?? 'space-y-2 text-sm text-gray-600'}>
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className={m.cls} aria-hidden="true">{m.glyph}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

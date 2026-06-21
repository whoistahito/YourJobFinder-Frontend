import React from 'react';

// Wraps the neo-brutalist chip classes used in the subscription form's token fields.
// variant 'tag' = a selected value with a remove button; 'example' = a quick-add suggestion.
export const Chip: React.FC<{
    variant?: 'tag' | 'example';
    onRemove?: () => void;
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}> = ({variant = 'tag', onRemove, onClick, disabled, children}) => {
    if (variant === 'example') {
        return (
            <button type="button" className="example-chip" onClick={onClick} disabled={disabled}
                    aria-pressed={disabled}>
                {children}
            </button>
        );
    }
    return (
        <span className="tag-badge">
            {children}
            {onRemove && (
                <button type="button" aria-label="Remove" onClick={onRemove}>&times;</button>
            )}
        </span>
    );
};

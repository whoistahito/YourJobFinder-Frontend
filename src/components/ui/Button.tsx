import React from 'react';
import {cn} from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'dark' | 'danger';
    isLoading?: boolean;
}

// Brutalist button: 2px ink border, hard offset shadow, zero radius, press-down on hover/active.
// Style lives in the `.btn` system in index.css so every button stays identical.
const variants = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    dark: 'btn--dark',
    danger: 'btn--danger',
} as const;

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  isLoading,
                                                  className,
                                                  ...props
                                              }) => (
    <button
        className={cn('btn w-full relative', variants[variant], className)}
        disabled={isLoading || props.disabled}
        {...props}
    >
        {children}
        {isLoading && (
            <span
                className="absolute right-4 inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"/>
        )}
    </button>
);

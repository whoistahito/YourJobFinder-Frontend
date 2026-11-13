import React from 'react';
import {type Icon as PhosphorIcon} from '@phosphor-icons/react';
import {cn} from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: PhosphorIcon;
  error?: string;
    variant?: 'default' | 'minimal';
}

export const Input: React.FC<InputProps> = ({
                                                label,
                                                icon: Icon,
                                                error,
  className,
                                                variant = 'default',
                                                id,
                                                ...props
}) => {
    const inputId = id ?? React.useId();
    const baseDefault = [
        'w-full px-3 py-2.5 rounded-none border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-float)]',
        'text-sm placeholder:text-[color:var(--clr-sub)]', 'transition-shadow duration-300',
        'focus:outline-none focus:shadow-[3px_3px_0_var(--clr-amber)]'
    ];
    const baseMinimal = [
        'w-full bg-transparent px-0 py-3 md:py-2 text-base', 'border-0 border-b border-[color:var(--clr-border)] rounded-none',
        'placeholder:text-[color:var(--clr-sub)]', 'focus:outline-none focus:ring-0 focus:border-[color:var(--clr-text)]', 'hover:border-[color:var(--clr-muted)]'
    ];
    const errorClasses = variant === 'minimal'
        ? 'border-b-[color:var(--clr-danger)] focus:border-[color:var(--clr-danger)]'
        : 'border-[color:var(--clr-danger)] focus:shadow-[3px_3px_0_var(--clr-danger)]';

  return (
      <div className={variant === 'minimal' ? 'minimal-field space-y-2' : 'space-y-1.5'}>
          <label htmlFor={inputId} className={variant === 'minimal'
              ? 'block text-xs font-medium tracking-wide text-[color:var(--clr-sub)] uppercase'
              : 'block text-xs font-medium tracking-wide text-[color:var(--clr-sub)] uppercase'}>
        {label}
      </label>
          <div className={variant === 'minimal' ? 'relative' : 'relative group'}>
              {Icon && variant === 'default' && (
                  <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--clr-faint)] transition-colors duration-300 group-focus-within:text-[color:var(--clr-amber)]">
                      <Icon className="h-[18px] w-[18px]" weight="bold"/>
                  </div>
        )}
        <input
          id={inputId}
          className={cn(
              variant === 'default' ? baseDefault : baseMinimal,
              Icon && variant === 'default' && 'pl-10',
              error && errorClasses,
            className
          )}
          {...props}
        />
      </div>
          {error && <p className="text-xs text-[color:var(--clr-danger)]">{error}</p>}
    </div>
  );
}
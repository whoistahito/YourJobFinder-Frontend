import React from 'react';
import {cn} from '../../utils/cn';
import {LucideIcon} from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label: string;
    icon?: LucideIcon;
    error?: string;
    options: SelectOption[];
    onBlur?: () => void;
    variant?: 'default' | 'minimal';
}

export const Select: React.FC<SelectProps> = ({
                                                  label,
                                                  icon: Icon,
                                                  error,
                                                  options,
                                                  className,
                                                  onBlur,
                                                  variant = 'default',
                                                  ...props
                                              }) => {
    const baseDefault = [
        'w-full px-3 py-2.5 rounded-none border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-float)]',
        'text-sm text-gray-900 placeholder:text-gray-400', 'transition-shadow duration-150',
        'focus:outline-none focus:shadow-[3px_3px_0_var(--clr-amber)]'
    ];
    const baseMinimal = [
        'w-full bg-transparent px-0 py-2 text-base',
        'border-0 border-b border-gray-400/60 rounded-none',
        'text-gray-900', 'focus:outline-none focus:ring-0 focus:border-gray-900', 'hover:border-gray-500'
    ];
    const errorClasses = variant === 'minimal'
        ? 'border-b-red-500 focus:border-red-600'
        : 'border-[color:var(--clr-danger)] focus:shadow-[3px_3px_0_var(--clr-danger)]';
    return (
        <div className={variant === 'minimal' ? 'minimal-field space-y-1.5' : 'space-y-1.5'}>
            <label className={variant === 'minimal'
                ? 'block text-xs font-medium tracking-wide text-gray-500 uppercase'
                : 'block text-xs font-medium tracking-wide text-gray-600 uppercase'}>
                {label}
            </label>
            <div className={variant === 'minimal' ? 'relative' : 'relative group'}>
                {Icon && variant === 'default' && (
                    <div
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--clr-faint)] transition-colors duration-200 group-focus-within:text-[color:var(--clr-amber)]">
                        <Icon className="h-[18px] w-[18px] stroke-[2px]"/>
                    </div>
                )}
                <select
                    className={cn(
                        variant === 'default' ? baseDefault : baseMinimal,
                        Icon && variant === 'default' && 'pl-10',
                        error && errorClasses,
                        className
                    )}
                    onBlur={onBlur}
                    {...props}
                >
                    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}

import React from 'react';
import {MapPin} from '@phosphor-icons/react';
import {Input} from './Input';
import {Suggestion} from '../../hooks/useJobSearch';

interface LocationInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    suggestions: Suggestion[];
    showSuggestions: boolean;
    suggestionsRef: React.RefObject<HTMLDivElement>;
    onSuggestionClick: (suggestion: Suggestion) => void;
    error?: string;
    variant?: 'default' | 'minimal';
}

export const LocationInput: React.FC<LocationInputProps> = ({
                                                                value,
                                                                onChange,
                                                                onBlur,
                                                                suggestions,
                                                                showSuggestions,
                                                                suggestionsRef,
                                                                onSuggestionClick,
                                                                error,
                                                                variant = 'default'
                                                            }) => {
    return (
        <div className="relative">
            <Input
                label="Location"
                icon={variant === 'default' ? MapPin : undefined}
                type="text"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="e.g. Berlin, Germany"
                required
                error={error}
                variant={variant}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-10 mt-2 w-full border-2 border-[color:var(--clr-text)]
                               bg-[color:var(--clr-base)] shadow-[4px_4px_0_var(--clr-text)]
                               max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="px-4 py-2 text-sm text-[color:var(--clr-text)]
                                       hover:bg-[color:var(--clr-float)] cursor-pointer"
                            onClick={() => onSuggestionClick(suggestion)}
                        >
                            {suggestion.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

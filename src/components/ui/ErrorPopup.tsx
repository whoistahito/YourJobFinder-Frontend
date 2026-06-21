import React from 'react';
import {AlertTriangle, X} from 'lucide-react';
import {Button} from './Button';
import {IconTile} from './IconTile';

interface ErrorPopupProps {
    show: boolean;
    onClose: () => void;
    error: string | null;
    onContactSupport: () => void;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({show, onClose, error, onContactSupport}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--clr-text)]/40 p-4"
             onClick={onClose}>
            <div className="w-full max-w-sm animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <div className="relative bg-[color:var(--clr-base)] border-2 border-[color:var(--clr-text)]
                                shadow-[6px_6px_0_var(--clr-text)] p-8">
                    <button onClick={onClose} aria-label="Close"
                            className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center
                                       border-2 border-[color:var(--clr-text)] text-[color:var(--clr-text)]
                                       hover:bg-[color:var(--clr-danger)] hover:text-[color:var(--clr-base)] transition-colors">
                        <X size={15} strokeWidth={2.5}/>
                    </button>
                    <div className="text-center space-y-5">
                        <IconTile icon={AlertTriangle} tone="danger" className="mx-auto"/>
                        <div className="space-y-2">
                            <h2 className="section-heading" style={{fontSize: '1.6rem'}}>Submission failed</h2>
                            <p className="subcopy" style={{fontSize: '0.9rem'}}>
                                {error || 'An unexpected error occurred. Please try again.'}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="danger" onClick={onClose}>Try again</Button>
                            <Button variant="secondary" onClick={onContactSupport}>Contact</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

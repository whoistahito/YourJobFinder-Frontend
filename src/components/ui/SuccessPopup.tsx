import React from 'react';
import {Check, X} from 'lucide-react';
import {Button} from './Button';
import {Link} from 'react-router-dom';
import {IconTile} from './IconTile';

interface SuccessPopupProps {
    show: boolean;
    onClose: () => void;
    dashboardUrl?: string;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({show, onClose, dashboardUrl}) => {
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
                                       hover:bg-[color:var(--clr-amber)] hover:text-[color:var(--clr-base)] transition-colors">
                        <X size={15} strokeWidth={2.5}/>
                    </button>
                    <div className="text-center space-y-5">
                        <IconTile icon={Check} tone="accent" className="mx-auto"/>
                        <div className="space-y-2">
                            <h2 className="popup-heading">Subscription confirmed</h2>
                            <p className="popup-copy">
                                Check your inbox to confirm your email — matches then show on your dashboard.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Button variant="dark" onClick={onClose}>Got it</Button>
                            {dashboardUrl && (
                                <Link to={dashboardUrl} className="block text-sm font-medium underline
                                            decoration-dotted underline-offset-2 mt-1">
                                    Open your matches →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

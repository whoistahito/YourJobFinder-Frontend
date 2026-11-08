import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {CircleNotch} from '@phosphor-icons/react';

export const UnsubscribeHandler: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleUnsubscribe = async () => {
            const email = searchParams.get('email');
            const location = searchParams.get('location');
            const position = searchParams.get('position');

            if (!email || !location || !position) {
                navigate('/unsubscribe/error');
                return;
            }

            try {
                const response = await fetch('https://api.yourjobfinder.website/user', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        location,
                        position,
                    })
                });

                if (response.ok) {
                    navigate('/unsubscribe');
                } else {
                    throw new Error('Failed to unsubscribe');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
                navigate('/unsubscribe/error');
            }
        };

        const timeoutId = setTimeout(() => {
            if (!error) {
                navigate('/unsubscribe/error');
            }
        }, 10000); // 10 second timeout

        handleUnsubscribe();

        return () => clearTimeout(timeoutId);
    }, [navigate, searchParams, error]);

    return (
        <main id="main-content" className="page-shell">
            <div className="page-container max-w-xl">
                <div className="flat-section text-center space-y-8">
                    <div className="inline-block">
                        <IconTileAccent/>
                    </div>

                    <div className="space-y-4">
                        <h1 className="section-heading">Processing your request</h1>
                        <p className="subcopy subcopy-sm">
                            Removing your email from job alerts. This usually takes a few seconds.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

// Inline accent tile with spinner — a bespoke loading state for this transient page.
const IconTileAccent: React.FC = () => (
    <span className="inline-flex items-center justify-center h-14 w-14 border-2 border-[color:var(--clr-text)]
                     bg-[color:var(--clr-amber)] text-[color:var(--clr-base)]
                     shadow-[3px_3px_0_var(--clr-text)]">
        <CircleNotch className="h-7 w-7 animate-spin" weight="bold"/>
    </span>
);

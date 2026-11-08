import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Bot, Loader} from 'lucide-react';

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
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center space-y-8">
                    {/* Logo */}
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-50 mb-2">
                        <Bot className="w-8 h-8 text-indigo-600"/>
                    </div>

                    {/* Loading State */}
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <Loader className="w-8 h-8 text-indigo-600 animate-spin"/>
                        </div>
                        <h1 className="section-heading">
                            Processing Your Request
                        </h1>
                        <p className="text-gray-600">
                            Please wait while we unsubscribe your email address...
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};
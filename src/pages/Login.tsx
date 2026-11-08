import React, {useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {CheckCircle2} from 'lucide-react';
import {API_BASE} from '../api';
import {Button} from '../components/ui/Button';
import {IconTile} from '../components/ui/IconTile';
import {Input} from '../components/ui/Input';
import {SEO} from '../components/SEO';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login: React.FC = () => {
    const [params] = useSearchParams();
    const expired = params.get('state') === 'expired';

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setSending(true);
        setError(null);
        try {
            const r = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
            });
            if (r.status === 429) {
                setError('Too many attempts — please wait a few minutes.');
            } else if (!r.ok) {
                setError("The email couldn't be sent. Please try again.");
            } else {
                setSent(true);
            }
        } catch {
            setError('Network error — please try again.');
        } finally {
            setSending(false);
        }
    };

    const expiredBanner = (
        <p className="notice">This sign-in link expired or was already used. Request a new one below.</p>
    );

    return (
        <main className="page-shell min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <SEO title="Sign in — Your Job Finder"
                 description="Get a one-time sign-in link for your job-match dashboard."
                 url="https://yourjobfinder.website/login"/>
            <div className="w-full max-w-md">
                {sent ? (
                    <div className="panel p-8 sm:p-10 text-center space-y-5">
                        <IconTile icon={CheckCircle2} tone="success" className="mx-auto"/>
                        <div className="space-y-2">
                            <h2 className="popup-heading">Check your inbox</h2>
                            <p className="popup-copy">
                                We sent a one-time sign-in link to <b>{email}</b>. It expires in 30 minutes.
                            </p>
                            <p className="micro-hint">
                                Not a subscriber yet? You&apos;ll get an email explaining how to set up alerts.
                            </p>
                        </div>
                        <Link to="/" className="link-quiet inline-flex items-center">
                            <span>Back to sign up</span>
                            <span className="arrow">↗</span>
                        </Link>
                    </div>
                ) : (
                    <div className="panel p-8 sm:p-10 space-y-6">
                        <div className="flex justify-end">
                            <Link to="/" className="link-quiet inline-flex items-center">
                                <span aria-hidden="true">←</span>
                                <span>Back to home</span>
                            </Link>
                        </div>
                        <div className="space-y-2">
                            <h1 className="section-heading">Sign in</h1>
                            <p className="subcopy">
                                No password needed — we email you a one-time link that opens your matches.
                            </p>
                        </div>
                        <form onSubmit={submit} className="space-y-5" noValidate>
                            {expired && expiredBanner}
                            <Input
                                label="Email"
                                type="email"
                                variant="default"
                                value={email}
                                placeholder="you@domain.com"
                                autoComplete="email"
                                error={error ?? undefined}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    setError(null);
                                }}
                            />
                            <Button type="submit" variant="dark" isLoading={sending}>
                                Send login link
                            </Button>
                        </form>
                        <p className="micro-hint">
                            First time here?{' '}
                            <Link to="/" className="font-medium underline decoration-dotted underline-offset-2">
                                Set up job alerts
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Login;

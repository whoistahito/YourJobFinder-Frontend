import React from 'react';
import {CheckCircle2, Mail, Sparkles} from 'lucide-react';
import {Button} from '../components/ui/Button';
import {IconTile} from '../components/ui/IconTile';
import {useSearchParams} from 'react-router-dom';

export const EmailConfirm: React.FC = () => {
    const [params] = useSearchParams();
    const uid = params.get('uid');

    return (
        <main className="page-shell">
            <div className="page-container max-w-2xl">
                <div className="flat-section text-center space-y-9">
                    {/* Success Icon */}
                    <div className="relative inline-block">
                        <IconTile icon={CheckCircle2} tone="success"/>
                        <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-5 h-5 text-[color:var(--clr-amber)] animate-pulse"/>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className="display-heading">Email Confirmed!</h1>
                        <p className="subcopy max-w-md mx-auto">
                            Your email has been successfully verified. You're all set to receive personalized job
                            alerts.
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="surface-card p-6 md:p-8 space-y-4 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Mail className="w-6 h-6 text-[color:var(--clr-amber)]"/>
                            </div>
                            <div className="space-y-2">
                                <h2 className="section-heading">What happens next?</h2>
                                <ul className="space-y-2 text-sm text-[color:var(--clr-sub)]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[color:var(--clr-amber)] mt-1">•</span>
                                        <span>We'll start monitoring job boards for positions matching your criteria</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[color:var(--clr-amber)] mt-1">•</span>
                                        <span>You'll receive email alerts when relevant opportunities are found</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[color:var(--clr-amber)] mt-1">•</span>
                                        <span>Each email will include direct links to apply for the positions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="panel-muted p-6 space-y-3 text-left">
                        <h3 className="section-heading flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[color:var(--clr-amber)]"/>
                            Pro Tips
                        </h3>
                        <ul className="space-y-2 text-sm text-[color:var(--clr-sub)]">
                            <li className="flex items-start gap-2">
                                <span className="text-[color:var(--clr-faint)]">→</span>
                                <span>Check your spam folder if you don't see our emails</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[color:var(--clr-faint)]">→</span>
                                <span>Add our email to your contacts for better deliverability</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[color:var(--clr-faint)]">→</span>
                                <span>You can unsubscribe anytime from the links in our emails</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="pt-4 space-y-4">
                        {uid && (
                            <Button
                                variant="primary"
                                onClick={() => window.location.href = `/dashboard/${uid}`}
                                className="!w-auto mx-auto px-8"
                            >
                                <span>Open your matches</span>
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            onClick={() => window.location.href = '/'}
                            className="!w-auto mx-auto px-8"
                        >
                            <span>Back to Home</span>
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <div className="pt-6 border-t border-[color:var(--clr-border)]">
                        <p className="micro-hint">
                            Need help? <a href="/contact" className="link-quiet"><span>our support team</span><span
                            className="arrow">↗</span></a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};


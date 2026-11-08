import React from 'react';
import {ArrowLeft, Envelope, ChatCircle, ArrowsClockwise, XCircle} from '@phosphor-icons/react';
import {Button} from '../components/ui/Button';
import {IconTile} from '../components/ui/IconTile';
import {Link} from 'react-router-dom';

export const EmailConfirmError: React.FC = () => {
    return (
        <main id="main-content" className="page-shell">
            <div className="page-container max-w-2xl">
                <div className="flat-section text-center space-y-9">
                    {/* Error Icon */}
                    <IconTile icon={XCircle} tone="danger" className="mx-auto"/>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className="section-heading">
                            Something went wrong
                        </h1>
                        <p className="subcopy subcopy-sm leading-relaxed max-w-md mx-auto">
                            We couldn't verify your email address. This might happen if the link has expired or was
                            already used.
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="surface-card p-6 md:p-8 space-y-4 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Envelope className="w-6 h-6 text-[color:var(--clr-danger)]"/>
                            </div>
                            <div className="space-y-2">
                                <h2 className="section-heading section-heading--sm">What you can do</h2>
                                <ul className="space-y-2 text-sm text-[color:var(--clr-sub)]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[color:var(--clr-danger)] mt-1" aria-hidden="true">•</span>
                                        <span>Check if you've already confirmed your email</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[color:var(--clr-danger)] mt-1" aria-hidden="true">•</span>
                                        <span>Try clicking the confirmation link from your email again</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[color:var(--clr-danger)] mt-1" aria-hidden="true">•</span>
                                        <span>Submit a new job search to receive a fresh confirmation email</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="panel-muted p-6 space-y-3 text-left">
                        <h3 className="text-sm font-medium tracking-wide text-[color:var(--clr-sub)] flex items-center gap-2">
                            <ArrowsClockwise className="w-4 h-4 text-[color:var(--clr-danger)]"/>
                            Common issues
                        </h3>
                        <ul className="space-y-2 text-sm text-[color:var(--clr-sub)]">
                            <li className="flex items-start gap-2">
                                <span className="text-[color:var(--clr-faint)]">→</span>
                                <span>Confirmation links expire after 24 hours for security</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[color:var(--clr-faint)]">→</span>
                                <span>Each link can only be used once</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[color:var(--clr-faint)]">→</span>
                                <span>Make sure you're clicking the full link from your email</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-6 pt-2">
                        <h2 className="micro-hint uppercase">Need help?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:your.job.finder.app@gmail.com"
                               className="link-quiet">
                                <ChatCircle className="w-5 h-5"/>
                                <span>Contact support</span>
                            </a>
                        </div>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/">
                                <Button variant="primary" className="!w-auto px-8">
                                    <ArrowsClockwise className="w-4 h-4"/>
                                    <span>Try again</span>
                                </Button>
                            </Link>
                            <Link to="/">
                                <Button variant="secondary" className="!w-auto px-6">
                                    <ArrowLeft className="w-4 h-4"/>
                                    <span>Back to home</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="pt-6 border-t border-[color:var(--clr-border)]">
                        <p className="text-xs text-[color:var(--clr-faint)]">
                            Still having trouble?{' '}
                            <Link to="/contact"
                                  className="font-medium text-[color:var(--clr-danger)] hover:text-[color:var(--clr-text)] transition-colors duration-300">Get
                            in touch with us</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

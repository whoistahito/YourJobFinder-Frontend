import React from 'react';
import {ArrowLeft, Bot, ChatCircle, Envelope, WarningCircle} from '@phosphor-icons/react';
import {Button} from '../components/ui/Button.tsx';
import {IconTile} from '../components/ui/IconTile';
import {Link} from 'react-router-dom';

export const UnsubscribeError: React.FC = () => {
    return (
        <main id="main-content" className="page-shell">
            <div className="page-container max-w-xl">
                <div className="flat-section text-center space-y-9">
                    <div className="inline-block">
                        <IconTile icon={WarningCircle} tone="danger"/>
                    </div>
                    <div className="space-y-4">
                        <h1 className="section-heading">Unsubscribe failed</h1>
                        <p className="subcopy subcopy-sm">
                            We encountered an issue while processing your request.
                        </p>
                    </div>
                    <div className="surface-card p-6 text-left space-y-5">
                        <div className="flex items-center gap-3">
                            <Envelope className="w-5 h-5 text-[color:var(--clr-danger)]"/>
                            <p className="text-sm font-medium text-[color:var(--clr-text)]">Try the following</p>
                        </div>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-[color:var(--clr-sub)]">
                            <li>Confirm you used the subscribed email address</li>
                            <li>Open the original unsubscribe link again</li>
                            <li>Reach out for manual removal</li>
                        </ol>
                    </div>
                    <div className="space-y-6 pt-2">
                        <h2 className="micro-hint uppercase">Need help?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:your.job.finder.app@gmail.com"
                               className="link-quiet">
                                <ChatCircle className="w-5 h-5"/>
                                <span>Contact support</span>
                            </a>
                        </div>
                        <div className="pt-2">
                            <Link to="/">
                                <Button variant="secondary" className="!w-auto mx-auto px-6">
                                    <ArrowLeft className="w-4 h-4"/>
                                    <span>Return</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <p className="text-xs text-[color:var(--clr-faint)] pt-4">Still stuck? Email <a
                        href="mailto:your.job.finder.app@gmail.com"
                        className="font-medium text-[color:var(--clr-danger)] hover:text-[color:var(--clr-text)] transition-colors duration-300">support</a>.</p>
                </div>
            </div>
        </main>
    );
};

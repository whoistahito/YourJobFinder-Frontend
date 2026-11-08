import React from 'react';
import {Bot, Mail, MessageCircle} from 'lucide-react';
import {Button} from '../components/ui/Button.tsx';
import {IconTile} from '../components/ui/IconTile';

export const Unsubscribe: React.FC = () => {
    return (
        <main className="page-shell">
            <div className="page-container max-w-xl">
                <div className="flat-section text-center space-y-9">
                    <div className="inline-block">
                        <IconTile icon={Bot} tone="accent"/>
                    </div>
                    <div className="space-y-4">
                        <h1 className="section-heading">Unsubscribed</h1>
                        <p className="subcopy">Your email has been removed from further
                            job alerts.</p>
                    </div>
                    <div className="surface-card p-6 space-y-2">
                        <Mail className="w-6 h-6 text-[color:var(--clr-amber)] mx-auto mb-1"/>
                        <p className="text-[color:var(--clr-sub)] text-sm">You will no longer receive monitoring emails.</p>
                    </div>
                    <div className="space-y-6 pt-2">
                        <h2 className="micro-hint uppercase">Need Help?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:your.job.finder.app@gmail.com"
                               className="link-quiet">
                                <MessageCircle className="w-5 h-5"/>
                                <span>Contact Support</span>
                            </a>
                        </div>
                        <div className="pt-2">
                            <Button variant="secondary" onClick={() => window.location.href = '/'}
                                    className="!w-auto mx-auto px-6">
                                <span>Return</span>
                            </Button>
                        </div>
                    </div>
                    <p className="micro-hint pt-4">Changed your mind? <a href="/"
                                                                                    className="link-quiet"><span>Subscribe</span><span
                        className="arrow">↗</span></a> anytime.</p>
                </div>
            </div>
        </main>
    );
};
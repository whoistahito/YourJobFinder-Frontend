import React from 'react';
import {ArrowLeft, Bot, Mail, MessageCircle} from 'lucide-react';
import {Button} from '../components/ui/Button.tsx';

export const Unsubscribe: React.FC = () => {
    return (
        <main className="page-shell">
            <div className="page-container max-w-xl">
                <div className="flat-section text-center space-y-9">
                    <div
                        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm">
                        <Bot className="w-7 h-7 text-brand-600"/>
                    </div>
                    <div className="space-y-4">
                        <h1 className="font-outfit text-3xl font-semibold tracking-tight text-gray-900">Unsubscribed</h1>
                        <p className="text-gray-600 text-base leading-relaxed">Your email has been removed from further
                            job alerts.</p>
                    </div>
                    <div className="surface-card p-6 space-y-2">
                        <Mail className="w-6 h-6 text-brand-600 mx-auto mb-1"/>
                        <p className="text-gray-600 text-sm">You will no longer receive monitoring emails.</p>
                    </div>
                    <div className="space-y-6 pt-2">
                        <h2 className="text-sm font-medium tracking-wide text-gray-500 uppercase">Need Help?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:your.job.finder.app@gmail.com"
                               className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-brand-600 transition-colors">
                                <MessageCircle className="w-5 h-5"/>
                                <span>Contact Support</span>
                            </a>
                        </div>
                        <div className="pt-2">
                            <Button variant="secondary" onClick={() => window.location.href = '/'}
                                    className="!w-auto mx-auto px-6">
                                <ArrowLeft className="w-4 h-4"/>
                                <span>Return</span>
                            </Button>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 pt-4">Changed your mind? <a href="/"
                                                                                    className="text-brand-600 hover:text-brand-700 font-medium">Subscribe
                        again</a> anytime.</p>
                </div>
            </div>
        </main>
    );
};
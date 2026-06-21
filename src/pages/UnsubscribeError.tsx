import React from 'react';
import {AlertCircle, ArrowLeft, Bot, Mail, MessageCircle} from 'lucide-react';
import {Button} from '../components/ui/Button.tsx';
import {Link} from 'react-router-dom';

export const UnsubscribeError: React.FC = () => {
    return (
        <main className="page-shell">
            <div className="page-container max-w-xl">
                <div className="flat-section text-center space-y-9">
                    <div
                        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm">
                        <Bot className="w-7 h-7 text-red-600"/>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className="h-12 w-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-600"/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="font-outfit text-3xl font-semibold tracking-tight text-gray-900">Unsubscribe
                            Failed</h1>
                        <p className="text-gray-600 text-base leading-relaxed">We encountered an issue while processing
                            your request.</p>
                    </div>
                    <div className="surface-card p-6 text-left space-y-5">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-red-600"/>
                            <p className="text-sm text-gray-700 font-medium">Try the following:</p>
                        </div>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                            <li>Confirm you used the subscribed email address</li>
                            <li>Open the original unsubscribe link again</li>
                            <li>Reach out for manual removal</li>
                        </ol>
                    </div>
                    <div className="space-y-6 pt-2">
                        <h2 className="text-sm font-medium tracking-wide text-gray-500 uppercase">Need Help?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:your.job.finder.app@gmail.com"
                               className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                <MessageCircle className="w-5 h-5"/>
                                <span>Contact Support</span>
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
                    <p className="text-xs text-gray-500 pt-4">Still stuck? Email <a
                        href="mailto:your.job.finder.app@gmail.com"
                        className="text-red-600 hover:text-red-700 font-medium">support</a>.</p>
                </div>
            </div>
        </main>
    );
};
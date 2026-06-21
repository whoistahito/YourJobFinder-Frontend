import React from 'react';
import {AlertCircle, ArrowLeft, Mail, MessageCircle, RefreshCw, XCircle} from 'lucide-react';
import {Button} from '../components/ui/Button';
import {Link} from 'react-router-dom';

export const EmailConfirmError: React.FC = () => {
    return (
        <main className="page-shell">
            <div className="page-container max-w-2xl">
                <div className="flat-section text-center space-y-9">
                    {/* Error Icon */}
                    <div className="relative inline-block">
                        <div
                            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-sm animate-scale-in">
                            <XCircle className="w-9 h-9 text-red-600"/>
                        </div>
                        <div className="absolute -top-1 -right-1">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-pulse"/>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className="font-outfit text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                            Something Went Wrong
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                            We couldn't verify your email address. This might happen if the link has expired or was
                            already used.
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="surface-card p-6 md:p-8 space-y-4 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Mail className="w-6 h-6 text-red-600"/>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-lg font-medium text-gray-900">What you can do:</h2>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Check if you've already confirmed your email</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Try clicking the confirmation link from your email again</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Submit a new job search to receive a fresh confirmation email</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="panel-muted p-6 space-y-3 text-left">
                        <h3 className="text-sm font-medium tracking-wide text-gray-700 flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-red-500"/>
                            Common Issues
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">→</span>
                                <span>Confirmation links expire after 24 hours for security</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">→</span>
                                <span>Each link can only be used once</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">→</span>
                                <span>Make sure you're clicking the full link from your email</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-6 pt-2">
                        <h2 className="text-sm font-medium tracking-wide text-gray-500 uppercase">Need Help?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:your.job.finder.app@gmail.com"
                               className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                <MessageCircle className="w-5 h-5"/>
                                <span>Contact Support</span>
                            </a>
                        </div>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/">
                                <Button variant="primary" className="!w-auto px-8">
                                    <RefreshCw className="w-4 h-4"/>
                                    <span>Try Again</span>
                                </Button>
                            </Link>
                            <Link to="/">
                                <Button variant="secondary" className="!w-auto px-6">
                                    <ArrowLeft className="w-4 h-4"/>
                                    <span>Back to Home</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="pt-6 border-t border-gray-200/60">
                        <p className="text-xs text-gray-500">
                            Still having trouble? <a href="/contact"
                                                     className="text-red-600 hover:text-red-700 font-medium">Get
                            in touch with us</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};


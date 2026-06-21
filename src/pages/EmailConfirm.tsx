import React from 'react';
import {ArrowLeft, CheckCircle2, Mail, Sparkles} from 'lucide-react';
import {Button} from '../components/ui/Button';

export const EmailConfirm: React.FC = () => {
    return (
        <main className="page-shell">
            <div className="page-container max-w-2xl">
                <div className="flat-section text-center space-y-9">
                    {/* Success Icon */}
                    <div className="relative inline-block">
                        <div
                            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm animate-scale-in">
                            <CheckCircle2 className="w-9 h-9 text-emerald-600"/>
                        </div>
                        <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-5 h-5 text-brand-500 animate-pulse"/>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className="font-outfit text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                            Email Confirmed!
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                            Your email has been successfully verified. You're all set to receive personalized job
                            alerts.
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="surface-card p-6 md:p-8 space-y-4 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Mail className="w-6 h-6 text-brand-600"/>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-lg font-medium text-gray-900">What happens next?</h2>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-500 mt-1">•</span>
                                        <span>We'll start monitoring job boards for positions matching your criteria</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-500 mt-1">•</span>
                                        <span>You'll receive email alerts when relevant opportunities are found</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-500 mt-1">•</span>
                                        <span>Each email will include direct links to apply for the positions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="panel-muted p-6 space-y-3 text-left">
                        <h3 className="text-sm font-medium tracking-wide text-gray-700 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-500"/>
                            Pro Tips
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">→</span>
                                <span>Check your spam folder if you don't see our emails</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">→</span>
                                <span>Add our email to your contacts for better deliverability</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-400">→</span>
                                <span>You can unsubscribe anytime from the links in our emails</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Section */}
                    <div className="pt-4 space-y-4">
                        <Button
                            variant="primary"
                            onClick={() => window.location.href = '/'}
                            className="!w-auto mx-auto px-8"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            <span>Back to Home</span>
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <div className="pt-6 border-t border-gray-200/60">
                        <p className="text-xs text-gray-500">
                            Need help? <a href="/contact" className="text-brand-600 hover:text-brand-700 font-medium">Contact
                            our support team</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};


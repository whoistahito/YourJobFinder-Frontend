import React from 'react';
import {ArrowLeft, Mail, Megaphone, ShieldQuestion} from 'lucide-react';
import {Button} from './ui/Button';
import {Link} from 'react-router-dom';

export const ContactUs: React.FC = () => {
    const contacts = [
        {
            icon: Mail,
            label: 'General Inquiries',
            value: 'your.job.finder.app@gmail.com',
            href: 'mailto:your.job.finder.app@gmail.com?subject=General%20Inquiry',
            desc: 'Questions about the product, suggestions or just saying hi.'
        },
        {
            icon: Megaphone,
            label: 'Partnerships / Press',
            value: 'your.job.finder.app+press@gmail.com',
            href: 'mailto:your.job.finder.app+press@gmail.com?subject=Press%20/ %20Partnership',
            desc: 'Media, collaboration or integration opportunities.'
        },
        {
            icon: ShieldQuestion,
            label: 'Privacy & Data',
            value: 'your.job.finder.app+privacy@gmail.com',
            href: 'mailto:your.job.finder.app+privacy@gmail.com?subject=Privacy%20Question',
            desc: 'Questions about how we handle, process or remove data.'
        }
    ];

    return (
        <main className="page-shell items-start">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Hero */}
                <div
                    className="hero-panel relative rounded-3xl overflow-hidden mb-16 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] ring-1 ring-gray-200/70">
                    <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span
                                className="inline-flex items-center gap-2 bg-gray-900 text-white text-[11px] font-semibold tracking-wide uppercase rounded-full px-4 py-1.5">Contact</span>
                            <span
                                className="inline-flex items-center gap-1 bg-brand-600/10 text-brand-700 ring-1 ring-brand-600/25 text-[11px] font-medium tracking-wide uppercase rounded-full px-3 py-1">Avg reply <span
                                className="font-semibold">&lt;24h</span></span>
                            <span
                                className="inline-flex items-center gap-1 bg-cyan-600/10 text-cyan-700 ring-1 ring-cyan-600/25 text-[11px] font-medium tracking-wide uppercase rounded-full px-3 py-1">Human</span>
                        </div>
                        <h1 className="display-heading gradient-text drop-shadow-sm">Get in touch</h1>
                        <p className="subcopy mt-6 max-w-3xl text-gray-700">We actually read everything. Pick the path
                            that best fits why you're reaching out— it helps us respond faster and with context.</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                    {contacts.map(({icon: Icon, label, value, desc, href}) => (
                        <a key={label} href={href}
                           className="group relative rounded-2xl border border-gray-200/70 bg-white/65 backdrop-blur-md p-5 flex flex-col focus:outline-none focus:ring-2 focus:ring-gray-900/20 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-8px_rgba(0,0,0,0.12)]">
                            <div className="flex items-center justify-between mb-2">
                                <div
                                    className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-50 via-white to-white ring-1 ring-brand-100 text-brand-600 flex items-center justify-center">
                                    <Icon className="w-5 h-5"/>
                                </div>
                                <span
                                    className="text-[11px] font-medium uppercase tracking-wide text-gray-500 group-hover:text-gray-700 transition-colors">Email</span>
                            </div>
                            <div className="space-y-1 mb-3">
                                <h2 className="text-sm font-medium tracking-wide text-gray-800 flex items-center gap-2">{label}</h2>
                                <p className="text-[13px] text-gray-600 leading-relaxed">{desc}</p>
                            </div>
                            <div className="mt-auto pt-2">
                                <span
                                    className="inline-flex select-all text-[13px] font-medium text-gray-900 group-hover:underline decoration-dotted break-all">{value}</span>
                            </div>
                            <span
                                className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-gray-300/80 transition-all"/>
                        </a>
                    ))}
                </div>

                {/* FAQ style sections */}
                <div className="mt-16 space-y-10">
                    <div className="relative group">
                        <div
                            className="absolute -inset-x-4 -inset-y-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-brand-50 via-white to-cyan-50"/>
                        <div className="relative">
                            <h2 className="text-sm font-semibold tracking-wide text-gray-800 flex items-center gap-2 mb-2">
                                <span
                                    className="inline-block h-4 w-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600"/>Response
                                Times</h2>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">Most replies land within one
                                business day. For urgent data / privacy concerns include <code
                                    className="px-1.5 py-0.5 rounded bg-gray-900 text-white text-[11px]">URGENT</code> in
                                the subject.</p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div
                            className="absolute -inset-x-4 -inset-y-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-brand-50 via-white to-cyan-50"/>
                        <div className="relative">
                            <h2 className="text-sm font-semibold tracking-wide text-gray-800 flex items-center gap-2 mb-2">
                                <span
                                    className="inline-block h-4 w-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600"/>What
                                to Include</h2>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">Bug reports are gold when
                                they contain repro steps, environment, expected vs actual, and (if safe) a screenshot.
                                Please strip sensitive info.</p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div
                            className="absolute -inset-x-4 -inset-y-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-brand-50 via-white to-cyan-50"/>
                        <div className="relative">
                            <h2 className="text-sm font-semibold tracking-wide text-gray-800 flex items-center gap-2 mb-2">
                                <span
                                    className="inline-block h-4 w-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600"/>Social
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">We keep a low profile while
                                we build. Email is the best channel for now.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-14">
                    <Link to="/">
                        <Button variant="secondary" className="!w-auto px-7">
                            <ArrowLeft className="w-4 h-4"/>
                            <span>Return Home</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

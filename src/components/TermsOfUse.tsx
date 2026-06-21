import React from 'react';
import {Link2} from 'lucide-react';
import {Button} from './ui/Button';
import {Link} from 'react-router-dom';

export const TermsOfUse: React.FC = () => {
    const updated = 'April 8, 2025';

    const sections = [
        {
            id: 'overview',
            title: 'Overview',
            body: 'Please read these Terms of Use carefully before using Your Job Finder. By accessing or using our service, you agree to be bound by these terms.'
        },
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            body: 'By accessing or using Your Job Finder you agree to be bound by these Terms of Use and all applicable laws. If you do not agree, you are prohibited from using the service.'
        },
        {
            id: 'service',
            title: '2. Service Description',
            body: 'Your Job Finder aggregates job listings to help users discover relevant opportunities. Automated tooling collects publicly available data.'
        },
        {
            id: 'data',
            title: '3. User Data',
            body: 'We collect only necessary information to provide tailored matches. We do not sell personal data. See our privacy policy for details.'
        },
        {
            id: 'accuracy',
            title: '4. Listing Accuracy',
            body: 'We strive for accuracy but cannot guarantee completeness or availability of third‑party listings or employer actions.'
        },
        {
            id: 'collection',
            title: '5. Responsible Collection',
            body: 'We respect robots.txt, apply rate limits, identify our agents, and honor removal requests from site owners.'
        },
        {
            id: 'permitted-use',
            title: '6. Permitted Use',
            body: 'A limited, personal, non‑transferable license is granted. Prohibited: unlawful use, abuse of infrastructure, automated abuse, reverse engineering.'
        },
        {
            id: 'ip',
            title: '7. Intellectual Property',
            body: 'Platform code, design and original content are owned by us. Third‑party logos and listings belong to their owners.'
        },
        {
            id: 'warranties',
            title: '8. No Warranties',
            body: 'Service is provided “as is” without warranties of any kind regarding reliability, availability or fitness.'
        },
        {
            id: 'liability',
            title: '9. Limitation of Liability',
            body: 'We are not liable for indirect, incidental, consequential or punitive damages arising from use or inability to use the service.'
        },
        {
            id: 'changes',
            title: '10. Changes',
            body: 'We may modify terms; material changes will include advance notice. Continued use after changes constitutes acceptance.'
        },
        {id: 'contact', title: 'Contact', body: 'Questions about these terms? Email your.job.finder.app@gmail.com.'}
    ];

    return (
        <main className="page-shell items-start">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Hero */}
                <div
                    className="hero-panel relative rounded-3xl overflow-hidden mb-16 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] ring-1 ring-gray-200/70">
                    <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
                        <div
                            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-1.5 rounded-full ring-1 ring-gray-200/80 text-[11px] font-medium tracking-wide uppercase text-gray-600 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"/> Legal
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 ml-2"/> Updated {updated}
                        </div>
                        <h1 className="display-heading gradient-text drop-shadow-sm">Terms of Use</h1>
                        <p className="subcopy mt-6 max-w-3xl text-gray-700">Clear, concise terms that explain how you
                            can use the platform, what we do with your data and your rights. We kept the language
                            human—no dense legal wall of text.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* TOC */}
                    <nav className="lg:w-72 flex-shrink-0 order-2 lg:order-1">
                        <div
                            className="rounded-2xl border border-gray-200/70 bg-white/65 backdrop-blur-md p-6 sticky top-6 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.08)]">
                            <p className="text-[11px] font-medium tracking-wide uppercase text-gray-500 mb-4">On this
                                page</p>
                            <ul className="space-y-2.5 text-sm">
                                {sections.map(s => (
                                    <li key={s.id}>
                                        <a href={`#${s.id}`}
                                           className="group flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-50/80 text-gray-600 hover:text-gray-900 transition-colors">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-brand-500 transition-colors"/>
                                            <span
                                                className="flex-1 leading-snug">{s.title.replace(/^[0-9]+\.\s/, '')}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-4 border-t border-gray-200/70">
                                <Link to="/">
                                    <Button variant="secondary" className="!w-full text-[13px] py-2.5">Return
                                        Home</Button>
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* Sections */}
                    <div className="flex-1 order-1 lg:order-2">
                        <div className="space-y-10">
                            {sections.map((s, idx) => (
                                <section id={s.id} key={s.id} className="relative group scroll-mt-28">
                                    <div
                                        className="absolute -inset-x-4 -inset-y-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-brand-50 via-white to-cyan-50 pointer-events-none"/>
                                    <div className="relative">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h2 className="text-sm font-semibold tracking-wide text-gray-800 flex-1 flex items-center gap-2">
                                                <span
                                                    className="inline-block h-4 w-1.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600"/>{s.title}
                                            </h2>
                                            <a href={`#${s.id}`} aria-label={`Link to ${s.title}`}
                                               className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                                                <Link2 className="w-4 h-4"/>
                                            </a>
                                        </div>
                                        <p className="text-sm leading-relaxed text-gray-700 max-w-3xl">{s.body}</p>
                                        {idx === 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-wide">
                                                <span
                                                    className="inline-flex items-center gap-1 rounded-full bg-gray-900 text-white px-3 py-1">Plain language</span>
                                                <span
                                                    className="inline-flex items-center gap-1 rounded-full bg-brand-600/10 text-brand-700 ring-1 ring-brand-600/25 px-3 py-1">Practical</span>
                                                <span
                                                    className="inline-flex items-center gap-1 rounded-full bg-cyan-600/10 text-cyan-700 ring-1 ring-cyan-600/25 px-3 py-1">Transparent</span>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            ))}
                        </div>
                        <div className="mt-16 text-[11px] text-gray-500 tracking-wide flex items-center gap-2">
                            <span>Need clarification?</span>
                            <Link to="/contact" className="link-quiet text-gray-700">Contact us <span
                                className="arrow">→</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

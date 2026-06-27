import React from 'react';
import {Mail, Megaphone, ShieldQuestion} from 'lucide-react';
import {Link} from 'react-router-dom';

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({title, children}) => (
    <section className="border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)]
                        shadow-[4px_4px_0_var(--clr-text)] p-6 md:p-7 space-y-2">
        <h2 className="section-heading" style={{fontSize: '1.35rem'}}>{title}</h2>
        <div className="subcopy space-y-2" style={{fontSize: '0.92rem'}}>{children}</div>
    </section>
);

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
            href: 'mailto:your.job.finder.app+press@gmail.com?subject=Press%20/%20Partnership',
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
        <main className="soft-ui min-h-screen">
            <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
                <header>
                    <Link to="/" className="link-quiet text-sm"><span className="arrow">←</span> Back to app</Link>
                    <h1 className="heading-xl mt-6" style={{fontSize: 'clamp(2.5rem, 8vw, 5rem)'}}>Get in touch</h1>
                    <p className="subcopy mt-3">We actually read everything. Pick the path that best fits why you're
                        reaching out — it helps us respond faster and with context. Average reply under 24 hours.</p>
                </header>

                {contacts.map(({icon: Icon, label, value, desc, href}) => (
                    <a key={label} href={href}
                       className="block border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)]
                                  shadow-[4px_4px_0_var(--clr-text)] p-6 space-y-2
                                  transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5
                                  hover:shadow-[6px_6px_0_var(--clr-text)]">
                        <div className="flex items-center justify-between">
                            <h2 className="section-heading" style={{fontSize: '1.15rem'}}>{label}</h2>
                            <Icon className="w-5 h-5 text-[color:var(--clr-amber)]"/>
                        </div>
                        <p className="subcopy" style={{fontSize: '0.92rem'}}>{desc}</p>
                        <p className="text-[13px] font-medium text-[color:var(--clr-text)]
                                   underline decoration-dotted break-all">{value}</p>
                    </a>
                ))}

                <Block title="What to include">
                    <p>Bug reports are gold when they contain repro steps, environment, expected vs actual, and (if
                        safe) a screenshot. Please strip sensitive info.</p>
                </Block>

                <Block title="Social">
                    <p>We keep a low profile while we build. Email is the best channel for now.</p>
                </Block>

                <footer className="pt-2 flex flex-wrap gap-6">
                    <Link to="/terms" className="link-quiet text-sm"><span>Terms of Use</span><span
                        className="arrow">↗</span></Link>
                    <Link to="/privacy" className="link-quiet text-sm"><span>Privacy</span><span
                        className="arrow">↗</span></Link>
                    <Link to="/imprint" className="link-quiet text-sm"><span>Imprint</span><span
                        className="arrow">↗</span></Link>
                </footer>
            </div>
        </main>
    );
};

export default ContactUs;
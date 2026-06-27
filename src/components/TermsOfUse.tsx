import React from 'react';
import {Link} from 'react-router-dom';

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({title, children}) => (
    <section className="border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)]
                        shadow-[4px_4px_0_var(--clr-text)] p-6 md:p-7 space-y-2">
        <h2 className="section-heading" style={{fontSize: '1.35rem'}}>{title}</h2>
        <div className="subcopy space-y-2" style={{fontSize: '0.92rem'}}>{children}</div>
    </section>
);

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
        <main className="soft-ui min-h-screen">
            <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
                <header>
                    <Link to="/" className="link-quiet text-sm"><span className="arrow">←</span> Back to app</Link>
                    <h1 className="heading-xl mt-6" style={{fontSize: 'clamp(2.5rem, 8vw, 5rem)'}}>Terms of Use</h1>
                    <p className="subcopy mt-3">Clear, concise terms that explain how you can use the platform, what we
                        do with your data and your rights. We kept the language human — no dense legal wall of text.
                        Updated {updated}.</p>
                </header>

                {sections.map(s => (
                    <Block key={s.id} title={s.title}>{s.body}</Block>
                ))}

                <footer className="pt-2 flex flex-wrap gap-6">
                    <Link to="/privacy" className="link-quiet text-sm"><span>Privacy</span><span
                        className="arrow">↗</span></Link>
                    <Link to="/contact" className="link-quiet text-sm"><span>Contact</span><span
                        className="arrow">↗</span></Link>
                    <Link to="/imprint" className="link-quiet text-sm"><span>Imprint</span><span
                        className="arrow">↗</span></Link>
                </footer>
            </div>
        </main>
    );
};

export default TermsOfUse;
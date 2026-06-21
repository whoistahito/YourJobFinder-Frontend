import React from 'react';
import {Link} from 'react-router-dom';
import {SEO} from '../components/SEO';

// Impressum per § 5 DDG (Digitale-Dienste-Gesetz) + standard liability / dispute blocks.
// NOTE FOR THE OPERATOR: replace every [PLACEHOLDER] with the real legal entity details
// before going live. An incomplete or missing Impressum is abmahnfähig under German law.

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({title, children}) => (
    <section className="border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)]
                        shadow-[4px_4px_0_var(--clr-text)] p-6 md:p-7 space-y-2">
        <h2 className="section-heading" style={{fontSize: '1.35rem'}}>{title}</h2>
        <div className="subcopy space-y-2" style={{fontSize: '0.92rem'}}>{children}</div>
    </section>
);

export const Imprint: React.FC = () => (
    <main className="soft-ui min-h-screen">
        <SEO title="Imprint / Impressum — Your Job Finder"
             description="Legal disclosure (Impressum) for Your Job Finder pursuant to § 5 DDG."
             url="https://yourjobfinder.website/imprint"/>
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
            <header>
                <Link to="/" className="link-quiet text-sm"><span className="arrow">←</span> Back to app</Link>
                <h1 className="heading-xl mt-6" style={{fontSize: 'clamp(2.5rem, 8vw, 5rem)'}}>Impressum</h1>
                <p className="subcopy mt-3">Legal disclosure under § 5 DDG (Digitale-Dienste-Gesetz).</p>
            </header>

            <Block title="Angaben gemäß § 5 DDG">
                <p>Seyed Taha Amirhosseini<br/>
                    Dennerstr. 2A<br/>
                    22307 Hamburg<br/>
                    Germany</p>
            </Block>

            <Block title="Kontakt">
                <p>
                    Email: <a className="underline decoration-dotted"
                              href="mailto:your.job.finder.app@gmail.com">your.job.finder.app@gmail.com</a>
                </p>
            </Block>

            <Block title="Redaktionell verantwortlich (§ 18 Abs. 2 MStV)">
                <p>Seyed Taha Amirhosseini<br/>Dennerstr. 2A, 22307 Hamburg</p>
            </Block>

            <footer className="pt-2 flex flex-wrap gap-6">
                <Link to="/terms" className="link-quiet text-sm"><span>Terms of Use</span><span
                    className="arrow">↗</span></Link>
                <Link to="/contact" className="link-quiet text-sm"><span>Contact</span><span className="arrow">↗</span></Link>
            </footer>
        </div>
    </main>
);

export default Imprint;

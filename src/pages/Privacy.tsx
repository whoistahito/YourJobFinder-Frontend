import React from 'react';
import {Link} from 'react-router-dom';
import {SEO} from '../components/SEO';

// GDPR (DSGVO) privacy policy. Maps to the real data flows in the app:
// subscription form -> matching backend, TomTom location autocomplete, Google Fonts,
// hosting/server logs. No cookies, analytics, or tracking are used.
// Remaining compliance gap: Google Fonts is loaded from Google servers (section 5).
// Self-hosting the fonts removes the US transfer and lets section 5 be deleted.

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({title, children}) => (
    <section className="border-2 border-[color:var(--clr-text)] bg-[color:var(--clr-base)]
                        shadow-[4px_4px_0_var(--clr-text)] p-6 md:p-7 space-y-2">
        <h2 className="section-heading" style={{fontSize: '1.35rem'}}>{title}</h2>
        <div className="subcopy space-y-2" style={{fontSize: '0.92rem'}}>{children}</div>
    </section>
);

export const Privacy: React.FC = () => (
    <main className="soft-ui min-h-screen">
        <SEO title="Privacy Policy / Datenschutzerklärung — Your Job Finder"
             description="How Your Job Finder processes personal data under the GDPR (DSGVO)."
             url="https://yourjobfinder.website/privacy"/>
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
            <header>
                <Link to="/" className="link-quiet text-sm"><span className="arrow">←</span> Back to app</Link>
                <h1 className="heading-xl mt-6" style={{fontSize: 'clamp(2.5rem, 8vw, 5rem)'}}>Datenschutz</h1>
                <p className="subcopy mt-3">How we handle your data under the GDPR (DSGVO). Plain version: we use your
                    details only to match you to jobs and to email you. We never sell or share them for advertising.</p>
            </header>

            <Block title="1. Controller (Verantwortlicher)">
                <p>The controller responsible for data processing on this site is the operator named in the{' '}
                    <Link to="/imprint" className="underline decoration-dotted">Imprint</Link>. Contact:{' '}
                    <a className="underline decoration-dotted"
                       href="mailto:your.job.finder.app@gmail.com">your.job.finder.app@gmail.com</a>.
                </p>
            </Block>

            <Block title="2. What we collect when you subscribe">
                <p>When you submit the subscription form we process the data you enter: job role, job type, location,
                    email address, and optionally your skills, education, and experience.</p>
                <p><strong>Purpose:</strong> to match open job postings against your profile and to send you
                    alerts.<br/>
                    <strong>Legal basis:</strong> your consent, Art. 6 (1) (a) GDPR, given when you tick the acceptance
                    box and subscribe.</p>
            </Block>

            <Block title="3. Email alerts">
                <p>We use your email address solely to send job matches, at most one message per day, and only when a
                    posting fits. We do not send advertising. Every email contains a one-click unsubscribe link;
                    using it withdraws your consent with effect for the future and stops all processing.</p>
            </Block>

            <Block title="4. Location autocomplete (TomTom)">
                <p>As you type a location, the entered text is sent to TomTom International B.V. (Netherlands) to return
                    address suggestions. This is necessary to provide the autocomplete feature.<br/>
                    <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR (our legitimate interest in a usable location
                    field) and your consent on submission, Art. 6 (1) (a) GDPR.</p>
            </Block>

            <Block title="5. Web fonts (Google Fonts)">
                <p>This site currently loads fonts from Google servers. When a page loads, your IP address is
                    transmitted to Google (Google Ireland Ltd. / Google LLC, USA) so the font can be delivered.<br/>
                    <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR. A transfer to the USA may occur.</p>
            </Block>

            <Block title="6. Hosting and server logs">
                <p>The site and its API run on infrastructure provided by Hetzner Online GmbH (Industriestr. 25,
                    91710 Gunzenhausen, Germany), self-managed by the operator using Coolify. The servers are located
                    in Germany, so no transfer to a third country takes place for hosting. When you access the
                    service, the server automatically processes technical access data (IP address, date and time,
                    requested resource, user agent) to deliver and secure the service.<br/>
                    <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR.</p>
            </Block>

            <Block title="7. No cookies, no tracking">
                <p>We do not use advertising or analytics cookies, and we run no tracking or profiling tools. There is
                    no banner because there is nothing to consent to beyond the processing described here.</p>
            </Block>

            <Block title="8. How long we keep your data">
                <p>We store your subscription data until you unsubscribe or ask us to delete it, after which it is
                    removed. Server logs are kept only for as long as needed for operation and security.</p>
            </Block>

            <Block title="9. Recipients">
                <p>Your data is processed by the providers needed to run the service: the matching backend, the hosting
                    provider, TomTom (location lookup), and Google (font delivery). We do not sell or share your data
                    with recruiters or advertisers.</p>
            </Block>

            <Block title="10. Your rights">
                <p>Under the GDPR you have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17),
                    restriction (Art. 18), data portability (Art. 20), and to object (Art. 21). You may withdraw your
                    consent at any time with effect for the future. To exercise any right, email{' '}
                    <a className="underline decoration-dotted"
                       href="mailto:your.job.finder.app@gmail.com">your.job.finder.app@gmail.com</a>.</p>
                <p>You also have the right to lodge a complaint with a data protection supervisory authority
                    (Aufsichtsbehörde) in your country of residence.</p>
            </Block>

            <footer className="pt-2 flex flex-wrap gap-6">
                <Link to="/imprint" className="link-quiet text-sm"><span>Imprint</span><span className="arrow">↗</span></Link>
                <Link to="/terms" className="link-quiet text-sm"><span>Terms of Use</span><span
                    className="arrow">↗</span></Link>
            </footer>
        </div>
    </main>
);

export default Privacy;

import React from 'react';
import {Link} from 'react-router-dom';
import {WHY_US_VARIANTS} from '../components/WhyUsVariants';

// Side-by-side preview of the "Why us" variants so the choice is visual. Route: /why-us.
// Throwaway selection surface; delete once a variant is wired into the landing page.
export const WhyUsPreview: React.FC = () => (
    <main className="soft-ui min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
            <header>
                <Link to="/" className="link-quiet text-sm"><span className="arrow">←</span> Back to app</Link>
                <h1 className="heading-xl mt-6" style={{fontSize: 'clamp(2.5rem, 8vw, 5rem)'}}>"Why us" variants</h1>
                <p className="subcopy mt-4 max-w-2xl">
                    Three privacy-led takes. Pick one and I'll wire it into the landing page.
                </p>
            </header>

            {WHY_US_VARIANTS.map(({key, name, blurb, Component}) => (
                <section key={key} className="space-y-4">
                    <div>
                        <p className="eyebrow" style={{color: 'var(--clr-amber)'}}>{name}</p>
                        <p className="subcopy mt-1" style={{fontSize: '0.9rem'}}>{blurb}</p>
                    </div>
                    <article className="stack-card stack-card--static is-active">
                        <Component/>
                    </article>
                </section>
            ))}
        </div>
    </main>
);

export default WhyUsPreview;

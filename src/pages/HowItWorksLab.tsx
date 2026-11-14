import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {cn} from '../utils/cn';
import {HOW_IT_WORKS_VARIANTS} from '../components/howitworks/variants';

// The real section shell, rendered outside the sticky stack so each direction
// can be judged in context: heading left, subcopy + graphic right.
const CardShell: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <article className="stack-card stack-card--static is-active">
        <h2>How it works</h2>
        <div className="stack-line"/>
        <div className="max-w-2xl">
            <p className="subcopy mb-8">
                You set the bar once. Every morning we read the new listings against your profile and send the one that
                clears it. The rest you never see.
            </p>
            {children}
        </div>
    </article>
);

export const HowItWorksLab: React.FC = () => {
    const {version} = useParams();
    const active = HOW_IT_WORKS_VARIANTS.find(variant => variant.key === version);
    const shown = active ? [active] : HOW_IT_WORKS_VARIANTS;

    useEffect(() => {
        document.title = active ? `How it works · ${active.name}` : 'How it works · review';
    }, [active]);

    return (
        <main id="main-content" className="min-h-screen bg-[color:var(--clr-base)] pb-24">
            {/* Review chrome — not part of the design being judged */}
            <header
                className="sticky top-0 z-30 border-b-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-raised)]">
                <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-3 px-6 py-3">
                    <Link to="/" className="link-quiet text-sm">
                        <span className="arrow">←</span> Landing
                    </Link>
                    <span
                        className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--clr-sub)] md:block">
                        How it works · design directions
                    </span>
                    <nav aria-label="Design directions" className="flex items-center gap-1.5">
                        <Link
                            to="/lab/how-it-works"
                            className={cn(
                                'border-[length:2px] border-[color:var(--clr-text)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em]',
                                !active
                                    ? 'bg-[color:var(--clr-text)] text-[color:var(--clr-base)]'
                                    : 'bg-transparent text-[color:var(--clr-text)]',
                            )}
                        >
                            All
                        </Link>
                        {HOW_IT_WORKS_VARIANTS.map(variant => (
                            <Link
                                key={variant.key}
                                to={`/lab/how-it-works/${variant.key}`}
                                aria-current={variant.key === active?.key ? 'page' : undefined}
                                className={cn(
                                    'border-[length:2px] border-[color:var(--clr-text)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em]',
                                    variant.key === active?.key
                                        ? 'bg-[color:var(--clr-text)] text-[color:var(--clr-base)]'
                                        : 'bg-transparent text-[color:var(--clr-text)]',
                                )}
                            >
                                V{variant.key}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <div className="stack-wide mx-auto space-y-14 px-6 py-12 md:py-16">
                {shown.map(variant => {
                    const Version = variant.Component;
                    const full = variant.layout === 'full';
                    return (
                        <section key={variant.key} id={`v${variant.key}`} className="space-y-4">
                            <div
                                className="flex flex-wrap items-end justify-between gap-3 border-b border-[color:var(--clr-border)] pb-3">
                                <div>
                                    <p className="eyebrow">V{variant.key} · {variant.name}</p>
                                    <p className="subcopy subcopy-sm mt-1 max-w-3xl">{variant.blurb}</p>
                                </div>
                                {!active && (
                                    <Link to={`/lab/how-it-works/${variant.key}`} className="link-quiet text-sm">
                                        Open alone <span className="arrow">→</span>
                                    </Link>
                                )}
                            </div>
                            {full ? (
                                <article className="stack-card stack-card--static is-active hiw-full-card">
                                    <Version/>
                                </article>
                            ) : (
                                <CardShell>
                                    <Version/>
                                </CardShell>
                            )}
                        </section>
                    );
                })}
            </div>
        </main>
    );
};

export default HowItWorksLab;

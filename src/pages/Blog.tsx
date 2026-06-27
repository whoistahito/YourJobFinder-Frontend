import React, {useMemo, useState} from 'react';
import {Footer} from '../components/Footer';
import SEO from '../components/SEO';

// Provide structured bilingual content (no markdown) and reuse layout
const content = {
    de: {
        heroTitle: 'Schnell einen Job finden',
        heroLead: 'Pragmatische Strategien, die deine Suche beschleunigen – gestützt durch Studien & einen smarten Hebel: Qualität, Fokus und automatisiertes Monitoring statt endlosem Scrollen.',
        articleTitle: 'Wie finde ich einen Job schnell? Tipps & Tricks',
        intro: 'Um schnell einen Job zu finden, ist eine <strong>strukturierte und proaktive Herangehensweise</strong> entscheidend. Im Schnitt dauert die Suche 3–6 Monate – mit klaren Zielen, konsequentem Tagesrhythmus und intelligenter Automatisierung lässt sich das deutlich verkürzen.',
        tipsHeading: 'Praktische Tipps und Tricks',
        tips: [
            {
                t: '1. Lebenslauf & Bewerbung optimieren',
                b: 'Halte den Lebenslauf aktuell und passe ihn für jede Stelle an. Übernimm wichtige Begriffe aus der Anzeige, konzentriere dich auf Relevantes und beginne mit einer kurzen Zeile, die dich zusammenfasst. Schreibe im Anschreiben kurz, warum du passt.',
                f: 'Tipp: Eine kurze Fokus‑Zeile oben hilft beim Einprägen.'
            },
            {
                t: '2. Netzwerken nutzen',
                b: 'Kontaktiere ehemalige Kolleg:innen, Alumni und Leute bei Zielunternehmen. Bitte um 10–15‑minütige Gespräche und sei konkret – keine langen, ungenauen Nachrichten.',
                f: 'Tipp: Kurz und präzise anfragen; sag, worum es geht.'
            },
            {
                t: '3. Ziele & Routine festlegen',
                b: 'Lege Rolle, Branche und Region fest. Verwalte Bewerbungen in einer einfachen Liste und blocke täglich Zeit zum Bewerben und Nachfassen.',
                f: 'Tipp: Lieber wenige, gute Bewerbungen pro Tag als Massenversand.'
            },
            {
                t: '4. Mehrere Kanäle parallel',
                b: 'Nutze Jobbörsen, stelle Alerts ein, versende Initiativbewerbungen und teste ähnliche Jobtitel. Alerts helfen, früh zu reagieren — oft wichtiger als perfekte Passung. Nutze auch spezialisierte Suchdienste (z. B. <a href="https://www.linkedin.com/help/linkedin/answer/a511279/job-alerts-on-linkedin?lang=de" target="_blank" rel="noopener noreferrer">Jobbenachrichtigungen auf LinkedIn</a> oder <a href="https://yourjobfinder.website" target="_blank" rel="noopener noreferrer">yourjobfinder</a>), die Ergebnisse bündeln und dir nur passende Rollen anzeigen — das spart Zeit.',
                f: 'Tipp: Probiere verwandte Jobtitel, wenn nichts exakt passt, oder nutze einen Monitor, um Rauschen zu reduzieren.'
            },
            {
                t: '5. Lernen & sichtbar bleiben',
                b: 'Mache kurze Kurse oder kleine Projekte, um Lücken zu schließen. Sichtbare Fortschritte helfen in Gesprächen und zeigen Engagement.',
                f: 'Tipp: Teile jede Woche ein kleines Ergebnis (Projekt, Post oder Notiz).'
            },
            {
                t: '6. Auf Interviews vorbereiten',
                b: 'Übe typische Fragen und bereite 4–6 kurze Erfolgsgeschichten vor (Problem → Aktion → Ergebnis). Sende nach dem Gespräch eine kurze Dankesnachricht mit einem konkreten Bezug.',
                f: 'Tipp: Nutze konkrete Beispiele und, wenn möglich, Zahlen.'
            },
            {
                t: '7. Mit Absagen umgehen',
                b: 'Zieh aus Absagen Lernpunkte: Was würdest du ändern? Bleib dran und behalte einen gleichmäßigen Rhythmus.',
                f: 'Tipp: Nutze eine kurze Feedback‑Checkliste, um schneller zu lernen.'
            },
            {
                t: '8. Energie schützen',
                b: 'Mache Outbound‑Arbeit vormittags und Lernen/Projekte nachmittags. Kurze Pausen verhindern Erschöpfung.',
                f: 'Tipp: Zwei fokussierte 45‑Minuten‑Blöcke pro Tag sind oft effektiv.'
            }
        ],
        studiesHeading: 'Was sagen die Studien?',
        studies: [
            {
                t: 'Zielorientierung & Strategien',
                d: 'Eine <strong>lernorientierte Haltung</strong> fördert fokussierte + explorative Suchstrategien → mehr Gespräche, Angebote & bessere Jobqualität. Chaotische (haphazard) Muster reduzieren Chancen. Selbstkontrolle verstärkt positive Effekte – besonders in schwierigen Märkten.'
            },
            {
                t: 'Karriereanpassungsfähigkeit',
                d: 'Hohe Adaptabilität (Planung, Selbstvertrauen) → fokussierte Strategien liefern weniger, aber passendere Angebote (höhere Zufriedenheit & Bindung). Rein explorativ ohne Fokus kann Qualität mindern.'
            },
            {
                t: 'Netzwerken als Hebel',
                d: 'Networking bleibt Top-Kanal: schnellere Einstiege, höherer Fit. Digitale Plattformen erleichtern gezielte Ansprache & erhöhen Trefferquote.'
            },
            {
                t: 'Selbstregulierung & Qualität',
                d: 'Reflexion + emotionale Regulation + klare Messgrößen führen zu besseren Outcomes (Zufriedenheit, geringere Wechselintention). Qualität &gt; Menge.'
            }
        ],
        studiesSummary: 'Zusammenfassend: <strong>Qualitativ hochwertige Bewerbungen + aktive Netzwerke + strukturiertes Monitoring</strong> beschleunigen & verbessern Ergebnisse. Passe Nuancen an Branche & Erfahrungslevel an.',
        checklistHeading: 'Sofort-Checkliste',
        checklist: [
            'Fokus-Zeile + aktualisierter CV', '5–10 qualifizierte Bewerbungen heute', '3 neue Netzwerk-Kontakte aktiviert', 'Alerts sauber konfiguriert', 'Mindestens 1 Lernmodul / Projekt-Slice', '4 Impact-Stories formuliert', 'Monitoring automatisiert'
        ],
        asideTitle: 'Putting It All Together: Automate Your Search',
        asideBody: 'Die Strategien helfen dir, deine Energie auf Aufgaben mit hoher Wirkung zu konzentrieren: deinen Lebenslauf anzupassen, Netzwerke zu aktivieren und dich auf Vorstellungsgespräche vorzubereiten. Das manuelle Verfolgen Dutzender von Jobbörsen kann jedoch diese Konzentration rauben. Der effektivste Ansatz ist es, die Technologie die schwere Arbeit machen zu lassen.',
        ctaPrimary: 'Profil aktualisieren ↗',
        asideCTA: 'Du kannst beginnen, deine Jobsuche mit einem kostenlosen semantischen Monitor zu automatisieren',
        footerNote: 'Indem du ein System einrichtest, das das Rauschen herausfiltert und nur relevante Rollen liefert, erhältst du dein Momentum für das, was wirklich zählt: den Job zu bekommen.'
    },
    en: {
        heroTitle: 'Find a Job Fast',
        heroLead: 'Pragmatic strategies backed by research – cut search time with quality, focus and automated monitoring instead of endless scrolling.',
        articleTitle: 'How to Find a Job Fast: Tips & Strategies',
        intro: 'To land a role faster you need a <strong>structured, proactive approach</strong>. Average searches take 3–6 months—clear positioning, daily rhythm and intelligent automation can compress that sharply.',
        tipsHeading: 'Practical Tips & Tactics',
        tips: [
            {
                t: '1. Optimize CV & Application',
                b: 'Keep your CV up to date and tweak it for each job. Pull a few keywords from the posting, keep only relevant experience, and add a short line at the top that sums up who you are. For applications, write a brief note that explains why you fit.',
                f: 'Tip: Start with one short positioning line at the top of your CV.'
            },
            {
                t: '2. Leverage Networking',
                b: 'Reach out to past colleagues, alumni and people at target companies. Ask for 10–15 minute info chats and be specific about what you want—don’t send long, vague messages.',
                f: 'Tip: Keep outreach short and say exactly how you can help or why you fit.'
            },
            {
                t: '3. Set Clear Goals & Routines',
                b: 'Decide which role, industry and locations you want. Track applications in a simple list and block daily time for applying and follow-ups.',
                f: 'Tip: Aim for a few high‑quality applications per day, not mass sending.'
            },
            {
                t: '4. Search on Several Channels',
                b: 'Set alerts, Apply early and test similar job titles. Alerts help you apply early—often that matters more than a perfect fit. Consider also using search engines (for example, <a href="https://www.linkedin.com/help/linkedin/answer/a511279/job-alerts-on-linkedin?lang=en" target="_blank" rel="noopener noreferrer">Job alerts on LinkedIn</a> or <a href="https://yourjobfinder.website" target="_blank" rel="noopener noreferrer">yourjobfinder</a>) that aggregate results and filter roles that match your criteria, this saves time daily.',
                f: 'Tip: Try a couple of related job titles if nothing matches exactly, or use a focused monitor to reduce noise.'
            },
            {
                t: '5. Learn & Show Activity',
                b: 'Take short courses or build a tiny project to fill gaps. Even small, visible progress helps in conversations and shows you’re learning.',
                f: 'Tip: Share one small outcome each week (project, post, or note).'
            },
            {
                t: '6. Prepare for Interviews',
                b: 'Practice common questions and prepare 4–6 short success stories (problem → action → result). After an interview, send a concise thank-you that mentions one detail from the conversation.',
                f: 'Tip: Use concrete examples with numbers or clear outcomes.'
            },
            {
                t: '7. Handle Rejection Constructively',
                b: 'Treat rejections as learning: note what you’d change and keep applying. A steady rhythm beats occasional bursts.',
                f: 'Tip: Keep a short feedback checklist to speed up learning.'
            },
            {
                t: '8. Protect Your Energy',
                b: 'Do focused outreach in the morning and learning or projects in the afternoon. Take short breaks to avoid burning out.',
                f: 'Tip: Two focused 45‑minute sessions per day work well for many people.'
            }
        ],
        studiesHeading: 'What Research Shows',
        studies: [
            {
                t: 'Goal Orientation & Strategy',
                d: 'A <strong>learning orientation</strong> encourages structured + exploratory tactics → more conversations, offers & better job quality. Chaotic “haphazard” patterns reduce odds. Self‑regulation amplifies positives—especially in tough markets.'
            },
            {
                t: 'Career Adaptability',
                d: 'High adaptability (planning, self‑efficacy) → focused strategies produce fewer but better‑fit offers (higher satisfaction & retention). Pure exploration without focus can dilute quality.'
            },
            {
                t: 'Networking Leverage',
                d: 'Networking remains top channel: faster entry, higher fit. Digital platforms enable targeted reach & raise hit rate.'
            },
            {
                t: 'Self‑Regulation & Quality',
                d: 'Reflection + emotional regulation + clear metrics drive better outcomes (satisfaction, lower turnover intent). Quality &gt; quantity.'
            }
        ],
        studiesSummary: 'In short: <strong>High‑quality tailored applications + active networks + structured monitoring</strong> accelerate and improve outcomes. Adjust nuances by industry and seniority.',
        checklistHeading: 'Instant Checklist',
        checklist: [
            'Positioning line + updated CV', '5–10 qualified applications today', '3 new network contacts activated', 'Alerts tuned & noise reduced', 'At least 1 learning module / project slice', '4 impact stories articulated', 'Monitoring automated'
        ],
        asideTitle: 'Putting It All Together: Automate Your Search',
        asideBody: 'The strategies above help you focus your energy on high-impact tasks: tailoring your CV, networking, and preparing for interviews. Manually tracking dozens of job boards, however, can drain that focus. The most effective approach is to let technology do the heavy lifting.',
        ctaPrimary: 'Update profile ↗',
        asideCTA: 'You can start automating your job search with a free semantic monitor',
        footerNote: 'By setting up a system that filters out the noise and delivers only relevant roles, you preserve your momentum for what truly matters: landing the job.'
    }
};

export const Blog: React.FC = () => {
    const autoLang = useMemo<'de' | 'en'>(() => (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en'), []);
    const [lang, setLang] = useState<'de' | 'en'>(autoLang);
    const c = content[lang];
    return (
        <main className="soft-ui min-h-screen flex flex-col" lang={lang}>
            <SEO
                title={lang === 'de' ? `${c.heroTitle} — Your Job Finder` : `${c.heroTitle} — Your Job Finder`}
                description={lang === 'de' ? c.heroLead : c.heroLead}
                url={`https://yourjobfinder.website/blog`}
                image={`https://yourjobfinder.website/src/assets/J-Puzzle-180.png`}
                keywords={`job search, job tips, job finder, career, your job finder`}
            />
            {/* Hero */}
            <section className="relative border-b border-gray-300/60 dot-grid-bg overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-24">
                    <div className="max-w-4xl animate-fade-in-up">
                        <h1 className="heading-xl text-gray-900">{c.heroTitle}</h1>
                        <p className="mt-8 subcopy max-w-2xl" dangerouslySetInnerHTML={{__html: c.heroLead}}/>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <a href="/" className="minimal-btn text-xs px-6 py-2">{c.ctaPrimary}</a>
                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-gray-500">
                                <button onClick={() => setLang('de')}
                                        className={`px-3 py-1 rounded-full border text-[11px] ${lang === 'de' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-400/60 hover:border-gray-600'}`}>DE
                                </button>
                                <button onClick={() => setLang('en')}
                                        className={`px-3 py-1 rounded-full border text-[11px] ${lang === 'en' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-400/60 hover:border-gray-600'}`}>EN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Article */}
            <div className="relative w-full -mt-16 pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    <article className="panel p-8 md:p-12 lg:p-16 space-y-16" aria-labelledby="article-title">
                        <header className="space-y-6">
                            <h2 id="article-title"
                                className="section-heading"
                                style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>{c.articleTitle}</h2>
                            <p className="subcopy"
                               dangerouslySetInnerHTML={{__html: c.intro}}/>
                        </header>

                        {/* Tips Section */}
                        <section className="space-y-10" aria-labelledby="sec-tipps">
                            <h3 id="sec-tipps"
                                className="section-heading" style={{fontSize: '2rem'}}>{c.tipsHeading}</h3>
                            <div className="space-y-8">
                                {c.tips.map(item => (
                                    <div key={item.t} className="space-y-2">
                                        <h4 className="section-heading" style={{fontSize: '1.15rem'}}>{item.t}</h4>
                                        <div className="space-y-3 subcopy">
                                            <p dangerouslySetInnerHTML={{__html: item.b}}/>
                                            <p className="border-l-2 border-[color:var(--clr-amber)] pl-4
                                                       text-sm text-[color:var(--clr-sub)]">{item.f}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Studies Section */}
                        <section className="space-y-8" aria-labelledby="sec-studies">
                            <h3 id="sec-studies"
                                className="section-heading" style={{fontSize: '2rem'}}>{c.studiesHeading}</h3>
                            <div className="space-y-6">
                                {c.studies.map(s => (
                                    <blockquote key={s.t}
                                                className="border-2 border-[color:var(--clr-text)]
                                                           bg-[color:var(--clr-base)] shadow-[4px_4px_0_var(--clr-text)]
                                                           p-6 space-y-2">
                                        <h4 className="section-heading" style={{fontSize: '1.15rem'}}>{s.t}</h4>
                                        <p className="subcopy"
                                           dangerouslySetInnerHTML={{__html: s.d}}/>
                                    </blockquote>
                                ))}
                            </div>
                            <p className="subcopy font-medium"
                               dangerouslySetInnerHTML={{__html: c.studiesSummary}}/>
                        </section>

                        {/* Checklist Section */}
                        <section className="space-y-6" aria-labelledby="sec-checklist">
                            <h3 id="sec-checklist"
                                className="section-heading" style={{fontSize: '2rem'}}>{c.checklistHeading}</h3>
                            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
                                {c.checklist.map(item => (
                                    <li key={item}
                                        className="flex items-center gap-3 subcopy px-2 py-2
                                                   hover:bg-[color:var(--clr-float)] focus:bg-[color:var(--clr-float)]"
                                        tabIndex={0}>
                                        <svg className="w-4 h-4 text-[color:var(--clr-amber)] flex-shrink-0"
                                             aria-hidden="true"
                                             focusable="false" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Promotional Aside/Conclusion */}
                        <aside className="mt-12 pt-10 border-t-2 border-[color:var(--clr-text)]"
                               aria-label="Automation note">
                            <h3 className="section-heading" style={{fontSize: '2rem'}}>{c.asideTitle}</h3>
                            <div className="mt-4 space-y-4 subcopy">
                                <p>{c.asideBody}</p>
                                <p>{c.footerNote} <a href="/"
                                                     className="underline decoration-dotted hover:text-[color:var(--clr-amber)]">{c.asideCTA}</a>.
                                </p>
                            </div>
                        </aside>
                    </article>
                </div>
            </div>
            <Footer/>
        </main>
    );
};

export default Blog;

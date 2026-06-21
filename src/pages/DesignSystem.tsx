import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft, CheckCircle2, Mail, MapPin, Search, ShieldQuestion} from 'lucide-react';
import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import {Select} from '../components/ui/Select';
import {Badge} from '../components/ui/Badge';
import {IconTile} from '../components/ui/IconTile';
import {MarkerList} from '../components/ui/MarkerList';
import {Chip} from '../components/ui/Chip';
import {SuccessPopup} from '../components/ui/SuccessPopup';
import {ErrorPopup} from '../components/ui/ErrorPopup';
import {MatchingFlow} from '../components/AiMatching';

// Living catalog of every UI element used in the project. Path: /design-system.
// Add new shared elements here so the team has one place to copy from.

// Hex map (not dynamic `bg-brand-${n}` — Tailwind JIT can't see runtime-built class names).
const BRAND: [number, string][] = [
    [50, '#eef2ff'], [100, '#e0e7ff'], [200, '#c7d2fe'], [300, '#a5b4fc'], [400, '#818cf8'],
    [500, '#6366f1'], [600, '#4f46e5'], [700, '#4338ca'], [800, '#3730a3'], [900, '#312e81'],
];
const SURFACE_VARS = ['--clr-base', '--clr-raised', '--clr-float', '--clr-border', '--clr-muted'];
const INK_VARS = ['--clr-text', '--clr-sub', '--clr-faint'];
const ACCENT_VARS = ['--clr-amber', '--clr-amber-d', '--clr-amber-l'];
const DANGER_VARS = ['--clr-danger', '--clr-danger-l'];

const Section: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({title, note, children}) => (
    <section className="space-y-5">
        <div>
            <h2 className="section-heading" style={{fontSize: '1.75rem'}}>{title}</h2>
            {note && <p className="subcopy mt-1" style={{fontSize: '0.9rem'}}>{note}</p>}
            <div className="mt-3 h-[3px] w-16 bg-[color:var(--clr-text)]"/>
        </div>
        {children}
    </section>
);

// Labeled specimen wrapper.
const Spec: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({
                                                                                              label,
                                                                                              children,
                                                                                              className
                                                                                          }) => (
    <div className="flex flex-col gap-2">
        <span className="eyebrow" style={{color: 'var(--clr-faint)'}}>{label}</span>
        <div className={'flex flex-wrap items-center gap-3 ' + (className ?? '')}>{children}</div>
    </div>
);

const Panel: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <div className="border-[length:2px] border-[color:var(--clr-text)] bg-[color:var(--clr-raised)]
                    shadow-[4px_4px_0_var(--clr-text)] p-6">{children}</div>
);

export const DesignSystem: React.FC = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    return (
        <main className="soft-ui min-h-screen">
            <SuccessPopup show={showSuccess} onClose={() => setShowSuccess(false)}/>
            <ErrorPopup show={showError} onClose={() => setShowError(false)}
                        error="This is how an error looks." onContactSupport={() => setShowError(false)}/>

            <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
                {/* Header */}
                <header>
                    <Link to="/" className="link-quiet text-sm"><span className="arrow">←</span> Back to app</Link>
                    <h1 className="heading-xl mt-6" style={{fontSize: 'clamp(3rem, 9vw, 6rem)'}}>Design System</h1>
                    <p className="subcopy mt-4 max-w-2xl">
                        Every button, field, and UI element used across Job Finder, in one place. Copy from here so the
                        product stays consistent.
                    </p>
                </header>

                {/* Principles */}
                <Section title="Principles"
                         note="Neo-brutalism with restraint. Every element follows these rules — if it doesn't, it's a bug.">
                    <div className="grid md:grid-cols-2 gap-5">
                        <Panel>
                            <p className="eyebrow mb-3" style={{color: 'var(--clr-amber)'}}>Always</p>
                            <MarkerList marker="check" items={[
                                'Zero border-radius on every interactive element',
                                'Hard offset shadows (3px cards, 4px buttons) — never blurred',
                                '2px ink borders; press-down (translate + shadow shrink) on hover/active',
                                'One accent: precision-blue. Danger red only for errors',
                                'Barlow Condensed for headings, Geist for body',
                            ]}/>
                        </Panel>
                        <div className="border-2 border-[color:var(--clr-danger)] bg-[color:var(--clr-base)]
                                        shadow-[4px_4px_0_var(--clr-danger)] p-6">
                            <p className="eyebrow mb-3" style={{color: 'var(--clr-danger)'}}>Never</p>
                            <MarkerList marker="arrow" items={[
                                'Rounded corners or pill shapes on controls',
                                'Soft / blurred drop shadows; glassmorphism (backdrop-blur)',
                                'Gradient text or decorative gradients',
                                'A second accent hue, or the legacy indigo brand-* scale',
                                'Em dashes in copy — use commas, colons, or periods',
                            ]}/>
                        </div>
                    </div>
                </Section>

                {/* Colors */}
                <Section title="Color"
                         note="Precision-blue accent on warm-tinted neutrals. The indigo brand-* scale below is legacy — do not use it for new work.">
                    <Spec label="Brand scale (legacy — being retired)">
                        {BRAND.map(([n, hex]) => (
                            <div key={n} className="flex flex-col items-center gap-1 opacity-60">
                                <div className="h-12 w-12 border-[length:2px] border-[color:var(--clr-text)]"
                                     style={{background: hex}}/>
                                <span className="text-[10px] text-gray-500">{n}</span>
                            </div>
                        ))}
                    </Spec>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
                        {[['Surface', SURFACE_VARS], ['Ink', INK_VARS], ['Accent', ACCENT_VARS], ['Danger', DANGER_VARS]].map(([group, vars]) => (
                            <Spec key={group as string} label={group as string}>
                                {(vars as string[]).map(v => (
                                    <div key={v} className="flex flex-col items-center gap-1">
                                        <div className="h-12 w-12 border-[length:2px] border-[color:var(--clr-text)]"
                                             style={{background: `var(${v})`}}/>
                                        <span className="text-[9px] text-gray-500">{v.replace('--clr-', '')}</span>
                                    </div>
                                ))}
                            </Spec>
                        ))}
                    </div>
                </Section>

                {/* Typography */}
                <Section title="Typography" note="Barlow Condensed for display/headings, Geist for body and labels.">
                    <Panel>
                        <div className="space-y-4">
                            <p className="heading-xl" style={{fontSize: '3rem'}}>Heading XL</p>
                            <p className="display-heading">Display heading</p>
                            <p className="section-heading" style={{fontSize: '1.75rem'}}>Section heading</p>
                            <p className="subcopy">Subcopy — the standard body paragraph used across the site for
                                readable supporting text.</p>
                            <p className="eyebrow">Eyebrow label</p>
                            <p className="micro-hint">Micro hint — small helper text under form fields.</p>
                        </div>
                    </Panel>
                </Section>

                {/* Buttons */}
                <Section title="Buttons"
                         note="One button system (.btn). Exactly one primary per view; everything else is secondary or a quiet link.">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Panel>
                            <p className="eyebrow mb-1" style={{color: 'var(--clr-amber)'}}>Primary</p>
                            <p className="subcopy mb-4" style={{fontSize: '0.85rem'}}>
                                Accent fill. The single most important action on the view — Subscribe, Start monitoring.
                                Use once.
                            </p>
                            <div className="w-48"><Button variant="primary">Start monitoring</Button></div>
                        </Panel>
                        <Panel>
                            <p className="eyebrow mb-1" style={{color: 'var(--clr-sub)'}}>Secondary</p>
                            <p className="subcopy mb-4" style={{fontSize: '0.85rem'}}>
                                Outline on surface. Supporting actions that sit beside the primary — Cancel, Back,
                                Contact.
                            </p>
                            <div className="w-48"><Button variant="secondary">Return home</Button></div>
                        </Panel>
                    </div>
                    <Spec label="All variants">
                        <div className="w-40"><Button variant="primary">Primary</Button></div>
                        <div className="w-40"><Button variant="secondary">Secondary</Button></div>
                        <div className="w-40"><Button variant="dark">Dark</Button></div>
                        <div className="w-40"><Button variant="danger">Danger</Button></div>
                    </Spec>
                    <Spec label="States">
                        <div className="w-40"><Button isLoading>Loading</Button></div>
                        <div className="w-40"><Button disabled>Disabled</Button></div>
                    </Spec>
                    <Spec label="Inline / link CTAs (CSS classes)">
                        <button className="minimal-btn"><span className="text-xs">↗</span> minimal-btn</button>
                        <button className="stack-cta-primary">stack-cta-primary ↗</button>
                        <a href="#" className="link-quiet"><span>link-quiet</span><span className="arrow">↗</span></a>
                    </Spec>
                </Section>

                {/* Form fields */}
                <Section title="Form fields">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Spec label="Input — default" className="!block">
                            <Input label="Email" icon={Mail} placeholder="you@domain.com"/>
                        </Spec>
                        <Spec label="Input — minimal" className="!block">
                            <Input label="Role" variant="minimal" placeholder="Frontend Developer"/>
                        </Spec>
                        <Spec label="Input — error" className="!block">
                            <Input label="Email" icon={Mail} placeholder="you@domain.com" error="Enter a valid email."/>
                        </Spec>
                        <Spec label="Input with icon" className="!block">
                            <Input label="Search" icon={Search} placeholder="Search…"/>
                        </Spec>
                        <Spec label="Select — default" className="!block">
                            <Select label="Job Type" options={[{value: '', label: 'Select job type'}, {
                                value: 'ft',
                                label: 'Full Time'
                            }, {value: 'pt', label: 'Part Time'}]}/>
                        </Spec>
                        <Spec label="Select — minimal" className="!block">
                            <Select label="Job Type" variant="minimal"
                                    options={[{value: '', label: 'Select job type'}, {
                                        value: 'ft',
                                        label: 'Full Time'
                                    }]}/>
                        </Spec>
                        <Spec label="Location input (icon)" className="!block">
                            <Input label="Location" icon={MapPin} placeholder="e.g. Berlin, Germany"/>
                        </Spec>
                    </div>
                    <Spec label="Token field (skills) — Chip components">
                        <div className="token-field w-full max-w-lg">
                            <Chip onRemove={() => {
                            }}>React</Chip>
                            <Chip onRemove={() => {
                            }}>TypeScript</Chip>
                            <Chip onRemove={() => {
                            }}>PostgreSQL</Chip>
                            <input className="tag-input" placeholder="Add another skill" readOnly/>
                        </div>
                    </Spec>
                    <Spec label="Quick-add chips (example variant)">
                        <Chip variant="example">Python</Chip>
                        <Chip variant="example">Project Management</Chip>
                        <Chip variant="example" disabled>Already added</Chip>
                    </Spec>
                </Section>

                {/* Badges */}
                <Section title="Badges"
                         note="Squared, ink-bordered. Extracted from the pill spans that were scattered across Contact / Terms.">
                    <Spec label="Badge tones">
                        <Badge tone="accent">Match</Badge>
                        <Badge tone="ink">Contact</Badge>
                        <Badge tone="outline">Outline</Badge>
                        <Badge tone="danger">Expired</Badge>
                    </Spec>
                </Section>

                {/* Icon tiles */}
                <Section title="Icon tiles"
                         note="Squared, ink-bordered, hard shadow. Accent for positive/brand, danger for errors only.">
                    <Spec label="Tones (md)">
                        <IconTile icon={CheckCircle2} tone="accent"/>
                        <IconTile icon={ShieldQuestion} tone="danger"/>
                        <IconTile icon={Mail} tone="ink"/>
                        <IconTile icon={MapPin} tone="surface"/>
                    </Spec>
                    <Spec label="Sizes">
                        <IconTile icon={Mail} size="sm"/>
                        <IconTile icon={Mail} size="md"/>
                        <IconTile icon={Mail} size="lg"/>
                    </Spec>
                </Section>

                {/* Marker lists */}
                <Section title="Marker lists"
                         note="Extracted from the bullet/arrow/check list items in confirm pages and the blog.">
                    <div className="grid sm:grid-cols-3 gap-6">
                        <Spec label="bullet" className="!block">
                            <MarkerList marker="bullet"
                                        items={['Set your criteria once', 'We scan continuously', 'You get one email']}/>
                        </Spec>
                        <Spec label="arrow" className="!block">
                            <MarkerList marker="arrow"
                                        items={['Check your spam folder', 'Add us to contacts', 'Unsubscribe anytime']}/>
                        </Spec>
                        <Spec label="check" className="!block">
                            <MarkerList marker="check" items={['Privacy first', 'Zero spam', 'One-click unsubscribe']}/>
                        </Spec>
                    </div>
                </Section>

                {/* Surfaces */}
                <Section title="Surfaces & cards">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="panel p-5"><p className="text-sm font-semibold">panel</p><p
                            className="text-xs text-gray-500 mt-1">Default raised surface.</p></div>
                        <div className="surface-card p-5"><p className="text-sm font-semibold">surface-card</p><p
                            className="text-xs text-gray-500 mt-1">Soft card with border.</p></div>
                        <div className="panel-muted p-5"><p className="text-sm font-semibold">panel-muted</p><p
                            className="text-xs text-gray-500 mt-1">Muted background.</p></div>
                        <Panel><p className="text-sm font-semibold">brutalist card</p><p
                            className="text-xs text-gray-500 mt-1">2px border + hard shadow.</p></Panel>
                    </div>
                </Section>

                {/* Feedback */}
                <Section title="Feedback / overlays" note="Modal popups for success and error states.">
                    <Spec label="Trigger popups">
                        <button className="minimal-btn" onClick={() => setShowSuccess(true)}>Show success popup</button>
                        <button className="stack-cta-primary" onClick={() => setShowError(true)}>Show error popup
                        </button>
                    </Spec>
                </Section>

                {/* System diagram */}
                <Section title="System diagram" note="The matching flow shown on the landing page.">
                    <Panel><MatchingFlow/></Panel>
                </Section>

                <footer className="pt-10 border-t-[length:2px] border-[color:var(--clr-text)]">
                    <Link to="/"><Button variant="secondary" className="!w-auto px-7"><ArrowLeft
                        className="w-4 h-4"/><span>Return to app</span></Button></Link>
                </footer>
            </div>
        </main>
    );
};

export default DesignSystem;

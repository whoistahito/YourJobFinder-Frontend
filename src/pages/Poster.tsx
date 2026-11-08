import {useMemo, useRef, useState} from 'react';
import {toPng} from 'html-to-image';
import {QRCodeSVG} from 'qrcode.react';

/**
 * Poster / Flyer preview and export page
 * - Uses the site's soft UI and dot grid aesthetic to stay on brand
 * - Shows a fixed-ratio artboard (portrait) you can export as PNG in common sizes
 */
const SIZES = [
    {key: 'social', label: 'Social Portrait (1080×1350)', w: 1080, h: 1350},
    {key: 'letter150', label: 'A5-ish Web (1240×1754)', w: 1240, h: 1754},
    {key: 'a4print', label: 'A4 Print (2480×3508)', w: 2480, h: 3508},
] as const;

export default function Poster() {
    const [sizeKey, setSizeKey] = useState<typeof SIZES[number]['key']>('social');
    const selected = useMemo(() => SIZES.find(s => s.key === sizeKey)!, [sizeKey]);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [imgReady, setImgReady] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);

    const exportPng = async () => {
        if (!nodeRef.current) return;
        if (!imgReady) {
            setNotice('The image is still loading. Wait a moment, then try the export again.');
            return;
        }
        setNotice(null);
        setIsExporting(true);
        try {
            const dataUrl = await toPng(nodeRef.current, {
                cacheBust: true,
                pixelRatio: 1,
                width: selected.w,
                height: selected.h,
                backgroundColor: '#ffffff',
                skipFonts: true,
                style: {width: `${selected.w}px`, height: `${selected.h}px`, backgroundColor: '#ffffff'},
                onClone: (cloned: Document) => {
                    const doc = cloned;
                    if (!doc) return;
                    const style = doc.createElement('style');
                    style.textContent = `*{font-family: system-ui, -apple-system, \"Segoe UI\", Roboto, Arial, sans-serif !important;}`;
                    doc.head.appendChild(style);
                    // Remove cross-origin font links if any leaked into the clone
                    doc.querySelectorAll('link[rel="stylesheet"]').forEach((lnk) => {
                        const link = lnk as HTMLLinkElement;
                        if (link.href.includes('fonts.googleapis.com')) link.parentElement?.removeChild(link);
                    });
                },
            } as any);
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `jobfinder-poster-${selected.w}x${selected.h}.png`;
            a.click();
        } catch (e) {
            console.error('html-to-image export error:', e);
            setNotice('Export failed. Try the Social size first and make sure all images have loaded.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <main id="main-content" className="min-h-screen soft-ui px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between gap-6 flex-wrap">
                    <div>
                        <h1 className="text-3xl md:text-4xl section-heading">Poster
                            / Flyer</h1>
                        <p className="text-sm text-[color:var(--clr-sub)] mt-2">Live preview on the left. Choose a size and export as
                            PNG.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="text-xs uppercase tracking-wide text-[color:var(--clr-faint)]"
                               htmlFor="poster-size">Size</label>
                        <select
                            id="poster-size"
                            className="border-2 border-[color:var(--clr-text)] rounded-none px-4 py-2 text-sm
                                       bg-[color:var(--clr-base)] text-[color:var(--clr-text)] focus:outline-none
                                       focus:shadow-[3px_3px_0_var(--clr-amber)]"
                            value={sizeKey}
                            onChange={(e) => setSizeKey(e.target.value as any)}
                        >
                            {SIZES.map(s => (
                                <option key={s.key} value={s.key}>{s.label}</option>
                            ))}
                        </select>
                        <button onClick={exportPng} disabled={isExporting || !imgReady}
                                className="rounded-none bg-[color:var(--clr-text)] text-[color:var(--clr-base)]
                                           border-2 border-[color:var(--clr-text)] shadow-[3px_3px_0_var(--clr-amber)]
                                           text-sm font-bold px-5 py-2.5 transition-all duration-200
                                           hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--clr-amber)]
                                           disabled:opacity-60 disabled:cursor-not-allowed">
                            {isExporting ? 'Exporting…' : (!imgReady ? 'Loading image…' : 'Export PNG')}
                        </button>
                    </div>
                </div>
                {notice && (
                    <p className="notice notice--danger mt-4" role="alert">{notice}</p>
                )}

                <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
                    {/* Artboard preview */}
                    <div className="w-full overflow-auto rounded-none border-2 border-[color:var(--clr-text)]
                                    bg-[color:var(--clr-base)] p-4
                                    shadow-[4px_4px_0_var(--clr-text)]">
                        <div
                            ref={nodeRef}
                            style={{
                                width: selected.w,
                                height: selected.h,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
                            }}
                            className="relative mx-auto rounded-[28px] overflow-hidden"
                        >
                            {/* Background layers (safe for html-to-image): flat base + dot texture */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: [
                                        // subtle dot pattern (no masking)
                                        'radial-gradient(rgba(169,166,181,0.35) 0.8px, transparent 0.8px)',
                                        // flat base
                                        '#ffffff'
                                    ].join(', '),
                                    backgroundSize: '14px 14px, auto',
                                }}
                            />

                            {/* Content */}
                            <div className="relative h-full p-[clamp(28px,4vw,48px)] flex flex-col">
                                {/* Header Row */}
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-12 w-12 rounded-2xl bg-white/70 ring-1 ring-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center">
                                            <span className="text-xl font-bold text-gray-900">J</span>
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Your Job
                                                Finder</p>
                                            <p className="text-xs text-gray-700 font-medium">Job Search on Autopilot</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero */}
                                <div className="mt-[clamp(20px,3vw,32px)] flex-1 flex flex-col justify-between">
                                    <div className="space-y-[clamp(18px,2.5vw,32px)]">
                                        <h2 className="font-semibold tracking-[-0.02em] leading-[1.05] text-gray-900"
                                            style={{fontSize: 'clamp(42px,5.5vw,88px)'}}>
                                            Job Search<br/>
                                            on Autopilot
                                        </h2>
                                        <p className="text-gray-700 text-[clamp(15px,1.4vw,20px)] leading-relaxed max-w-[42ch]">
                                            Tell us what you want—skills, role, location. We'll spare your inbox and
                                            only send a single, relevant email when a job actually fits.
                                        </p>

                                        {/* Minimalist feature list */}
                                        <div className="space-y-3 max-w-lg">
                                            {[
                                                {num: "01", text: "Define your ideal role & criteria"},
                                                {num: "02", text: "We monitor job boards 24/7"},
                                                {num: "03", text: "Get notified of perfect matches"},
                                                {num: "04", text: "No spam. Ever."}
                                            ].map((item) => (
                                                <div key={item.num} className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-full bg-white/75 ring-1 ring-gray-300/70 flex items-center justify-center flex-shrink-0">
                                                        <span
                                                            className="text-[10px] font-medium text-gray-700">{item.num}</span>
                                                    </div>
                                                    <span
                                                        className="text-[clamp(12px,1.1vw,15px)] text-gray-700">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* QR Code Section - Glassmorphic card */}
                                    <div className="mt-[clamp(24px,3vw,40px)]">
                                        <div
                                            className="relative rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-300/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-[clamp(20px,2.5vw,32px)]"
                                            ref={(el) => {
                                                if (el && !imgReady) setImgReady(true);
                                            }}
                                        >
                                            <div className="flex items-center justify-between gap-6">
                                                <div className="flex-1">
                                                    <h3 className="text-[clamp(16px,1.6vw,24px)] font-semibold text-gray-900 mb-2">
                                                        Start monitoring jobs today
                                                    </h3>
                                                    <p className="text-[clamp(12px,1.1vw,15px)] text-gray-600 mb-3">
                                                        Scan the QR code to get started
                                                    </p>
                                                    <div
                                                        className="text-[clamp(13px,1.2vw,17px)] font-medium text-gray-900">
                                                        www.yourjobfinder.website
                                                    </div>
                                                    <div
                                                        className="mt-4 flex flex-wrap gap-2 text-[10px] text-gray-600">
                                                        <span className="inline-flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>
                                                            Privacy first
                                                        </span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>
                                                            Zero spam
                                                        </span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>
                                                            One-click unsubscribe
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div
                                                        className="relative bg-white p-3 rounded-xl shadow-sm ring-1 ring-gray-200">
                                                        <QRCodeSVG
                                                            value="https://www.yourjobfinder.website"
                                                            size={selected.key === 'social' ? 140 : selected.key === 'letter150' ? 180 : 240}
                                                            level="H"
                                                            style={{display: 'block'}}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer strip */}
                                <div className="mt-[clamp(14px,2vw,20px)]">
                                    <div
                                        className="h-px w-full bg-[color:var(--clr-border)]"/>
                                    <div className="pt-3 flex items-center justify-between text-[10px] text-gray-500">
                                        <span>© 2025 Your Job Finder</span>
                                        <span>Educational project</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes / tips */}
                    <div className="space-y-4">
                        <div className="panel p-5">
                            <h3 className="text-sm font-medium text-[color:var(--clr-text)]">Tips</h3>
                            <ul className="mt-2 list-disc pl-5 text-sm text-[color:var(--clr-sub)] space-y-1">
                                <li>Use Social Portrait for Instagram; A4 for printing (export may take a few
                                    seconds).
                                </li>
                                <li>You can tweak heading, copy, and badges directly in this file later.</li>
                                <li>Profile photo comes from src/assets/profile-pic.png.</li>
                            </ul>
                        </div>
                        <div className="text-xs text-[color:var(--clr-faint)]">© 2025 Your Job Finder – Educational project</div>
                    </div>
                </div>
            </div>
        </main>
    );
}

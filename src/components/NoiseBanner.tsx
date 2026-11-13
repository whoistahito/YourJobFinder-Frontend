import React, {useEffect, useRef, useState} from 'react';

// Sits between the hero and the trust sections. Replaced a scrolling marquee,
// then a dark statement band. Now: junk every job seeker recognises, struck out
// line by line. The strike carries the message, so it draws once when the
// section scrolls in (static under reduced motion).
const noise = [
    {q: '"I came across your profile."', tag: 'Recruiter spam'},
    {q: '"10 jobs you might like."', tag: 'Feed noise'},
    {q: '"Urgently hiring. Since 2023."', tag: 'Ghost posts'},
];

export const NoiseBanner: React.FC = () => {
    const ref = useRef<HTMLElement | null>(null);
    const [struck, setStruck] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setStruck(true);
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                setStruck(true);
                io.disconnect();
            });
        }, {threshold: 0.35});
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section ref={ref} className={"noise-statement" + (struck ? " noise-struck" : "")}>
            <div className="wrap">
                <p className="eyebrow">What you will not get</p>
                <ul className="noise-list">
                    {noise.map((n, i) => (
                        <li key={n.q} className="noise-line" style={{'--i': i} as React.CSSProperties}>
                            <span className="noise-quote">{n.q}</span>
                            <span className="noise-tag">{n.tag}</span>
                        </li>
                    ))}
                </ul>
                <p className="noise-verdict">Only the one that fits.</p>
            </div>
        </section>
    );
};

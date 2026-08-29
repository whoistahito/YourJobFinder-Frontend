import React from 'react';

// Sits between the hero and the trust sections. Replaced a scrolling marquee of
// the same copy — a static statement reads as a stance, a ticker reads as filler.
export const NoiseBanner: React.FC = () => (
    <section className="noise-statement">
        <p className="eyebrow">What you will not get</p>
        <p><span>No ads.</span><span>No recruiter spam.</span><span>No "10 jobs you might like".</span></p>
    </section>
);

import type React from 'react';
import {StepsVersion} from './StepsVersion';

export interface HowItWorksVariant {
    key: string;
    name: string;
    blurb: string;
    Component: React.FC;
}

// The direction kept from the “How it works” review lab. Route: /lab/how-it-works/3.
export const HOW_IT_WORKS_VARIANTS: HowItWorksVariant[] = [
    {
        key: '3',
        name: 'The numbered process',
        blurb: 'Typography-led steps: scan, check, send. The closest to a classic "how it works" section.',
        Component: StepsVersion,
    },
];

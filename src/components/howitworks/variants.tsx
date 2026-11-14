import type React from 'react';
import {InboxVersion} from './InboxVersion';
import {ReportVersion} from './ReportVersion';
import {StepsVersion} from './StepsVersion';

export interface HowItWorksVariant {
    key: string;
    name: string;
    blurb: string;
    Component: React.FC;
}

// Review lab directions for the "How it works" graphic. Route: /lab/how-it-works.
// Delete this module and the lab page once a direction is wired in.
export const HOW_IT_WORKS_VARIANTS: HowItWorksVariant[] = [
    {
        key: '1',
        name: 'The inbox',
        blurb: 'Output-first: the actual email leads and the pipeline becomes a caption. Fastest to understand, most persuasive.',
        Component: InboxVersion,
    },
    {
        key: '2',
        name: 'The match report',
        blurb: 'The mechanism as a worksheet: what the posting asks next to what you bring, then one verdict. Explains why a match is a match.',
        Component: ReportVersion,
    },
    {
        key: '3',
        name: 'The numbered process',
        blurb: 'Typography-led steps: scan, check, send. The calmest of the three and the closest to a classic "how it works" section.',
        Component: StepsVersion,
    },
];

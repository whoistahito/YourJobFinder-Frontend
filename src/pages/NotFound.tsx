import React from 'react';
import {Compass} from '@phosphor-icons/react';
import {Link} from 'react-router-dom';
import {Button} from '../components/ui/Button';
import {IconTile} from '../components/ui/IconTile';
import {SEO} from '../components/SEO';

// Branded 404. Utility page: marked noindex by the SEO helper.
export const NotFound: React.FC = () => (
    <main id="main-content" className="page-shell">
        <SEO noindex
             title="Page not found — Your Job Finder"
             description="This page does not exist on Your Job Finder."/>
        <div className="page-container max-w-xl">
            <div className="flat-section text-center space-y-8">
                <div className="inline-block">
                    <IconTile icon={Compass} tone="ink"/>
                </div>
                <div className="space-y-3">
                    <h1 className="display-heading">404</h1>
                    <p className="subcopy subcopy-sm max-w-sm mx-auto">
                        This page doesn't exist. The link may be old, mistyped, or the job you were looking at has
                        been taken down.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/">
                        <Button variant="primary" className="!w-auto px-6">
                            <span>Back to job alerts</span>
                        </Button>
                    </Link>
                </div>
                <p className="micro-hint">
                    Looking for something?{' '}
                    <Link to="/blog" className="link-quiet"><span>Read the blog</span><span
                    className="arrow">↗</span></Link>{' '}or{' '}
                    <Link to="/contact" className="link-quiet"><span>contact us</span><span
                    className="arrow">↗</span></Link>.
                </p>
            </div>
        </div>
    </main>
);

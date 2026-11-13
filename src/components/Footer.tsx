import React from 'react';
import {Link} from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 mt-12 bg-[color:var(--clr-raised)] border-t border-[color:var(--clr-border)]">
            <div className="wrap py-10">
                <div
                    className="flex flex-col md:flex-row md:items-center gap-6 md:gap-6 justify-between">
                    <div>
                        <p className="text-sm font-bold text-[color:var(--clr-text)]">Your Job Finder</p>
                        <p className="mt-1 text-xs text-[color:var(--clr-sub)]">One email a day, only when
                            something fits.</p>
                    </div>
                    <nav className="footer-nav flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-[color:var(--clr-sub)]">
                        <Link to="/blog"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Blog</Link>
                        <Link to="/terms"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Terms
                            & Conditions</Link>
                        <Link to="/privacy"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Privacy</Link>
                        <Link to="/imprint"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Imprint</Link>
                        <Link to="/contact"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Contact</Link>
                    </nav>
                </div>
                <p className="mt-6 pt-4 border-t border-[color:var(--clr-border)] text-xs text-[color:var(--clr-sub)]">
                    {new Date().getFullYear()} © Your Job Finder
                </p>
            </div>
        </footer>
    );
};

export default Footer;

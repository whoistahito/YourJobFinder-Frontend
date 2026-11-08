import React from 'react';
import {Link} from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 mt-32 bg-[color:var(--clr-raised)] border-t border-[color:var(--clr-border)]">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-between text-xs text-[color:var(--clr-sub)]">
                    <p className="order-2 md:order-1">{new Date().getFullYear()} © Your Job Finder</p>
                    <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 order-1 md:order-2">
                        <Link to="/blog"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Blog</Link>
                        <Link to="/terms"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Terms & Conditions</Link>
                        <Link to="/privacy"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Privacy</Link>
                        <Link to="/imprint"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Imprint</Link>
                        <Link to="/contact"
                              className="hover:text-[color:var(--clr-text)] transition-colors duration-300">Contact</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

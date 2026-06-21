import React from 'react';
import {Link} from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 mt-32 bg-[#f5f4f8] border-t border-gray-300/80">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-between text-[13px] text-gray-700">
                    <p className="order-2 md:order-1">{new Date().getFullYear()} © Your Job Finder</p>
                    <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 order-1 md:order-2">
                        <Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
                        <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms & Conditions</Link>
                        <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
                        <Link to="/imprint" className="hover:text-gray-900 transition-colors">Imprint</Link>
                        <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

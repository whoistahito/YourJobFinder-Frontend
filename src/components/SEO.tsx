import React, {useEffect} from 'react';

type SEOProps = {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    keywords?: string;
    type?: string;
    locale?: string;
    /** Keep utility/error/404 pages out of search indexes. */
    noindex?: boolean;
};

// Lightweight runtime SEO helper for SPA pages (updates document head)
export const SEO: React.FC<SEOProps> = ({
                                            title,
                                            description,
                                            url,
                                            image,
                                            keywords,
                                            type = 'website',
                                            locale = 'en_US',
                                            noindex = false
                                        }) => {
    useEffect(() => {
        const prevTitle = document.title;
        if (title) document.title = title;

        const setMeta = (name: string, value: string | undefined, attr = 'name') => {
            if (!value) return;
            let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.content = value;
        };

        setMeta('description', noindex ? undefined : description);
        setMeta('keywords', noindex ? undefined : keywords);
        setMeta('robots', noindex ? 'noindex, nofollow' : undefined);
        setMeta('og:title', title, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:type', type, 'property');
        setMeta('og:url', url, 'property');
        setMeta('og:image', image, 'property');
        setMeta('og:locale', locale, 'property');
        setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
        setMeta('twitter:title', title);
        setMeta('twitter:description', description);
        setMeta('twitter:image', image);

        return () => {
            // restore previous title on unmount
            document.title = prevTitle;
        };
    }, [title, description, url, image, keywords, type, locale, noindex]);

    return null;
};

export default SEO;


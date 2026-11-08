/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Geist', 'system-ui', 'sans-serif']
            },
            keyframes: {
                'fade-in-up': {
                    '0%': {opacity: '0', transform: 'translateY(8px)'},
                    '100%': {opacity: '1', transform: 'translateY(0)'}
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up .6s cubic-bezier(0.22,1,0.36,1)'
            }
        },
    },
    plugins: [],
};

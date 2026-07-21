import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'SF Pro Display', 'Manrope', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Quicky brand colors
                quicky: {
                    yellow: '#F5B800',
                    'yellow-dark': '#D4A000',
                    'yellow-light': '#FDD835',
                    black: '#1A1A1A',
                    gray: '#F7F7F7',
                },
            },
            backdropBlur: {
                'xs': '2px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glow': '0 0 20px rgba(245, 184, 0, 0.3)',
                'card': '0 4px 20px 0 rgba(0, 0, 0, 0.06)',
                'card-hover': '0 8px 30px 0 rgba(0, 0, 0, 0.12)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(245, 184, 0, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(245, 184, 0, 0.6)' },
                }
            },
            spacing: {
                '18': '4.5rem',
            }
        },
    },

    plugins: [
        forms,
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                },
            });
        },
    ],
};

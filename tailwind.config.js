/** @type {import('tailwindcss').Config} */
// eslint-disable max-classes-per-file

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            maxWidth: {
                primary: '1150px',
            },
            width: {
                primary: '1150px',
            },
            boxShadow: {
                default: '0px 3px 25px 0px rgba(31,38,67,0.1)',
            },
            screens: {
                xs: '480px',
                xss: '380px',
            },
        },
        colors: {
            primary: '#65b597',
            secondary: '#F9C20E',
            black: '#000',
            dark: '#343a40',
            gray: '#dcdcdc',
            white: '#fff',
            red: '#e31934',
            orange: '#ed763c',
            'gray-dark': '#41454fe6',
            'white-gray': '#f5f5f5',
            blue: '#2f80ed',
            transparent: '#fff0',
            ...colors,
        },
    },
    plugins: [
        plugin(function ({ addBase, addComponents, addUtilities, theme }) {
            addBase({});
            addComponents({
                '.card': {
                    backgroundColor: theme('colors.white'),
                    borderRadius: theme('borderRadius.lg'),
                    padding: theme('spacing.6'),
                    boxShadow: theme('boxShadow.xl'),
                },
            });
            addUtilities({
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '.margin-center': {
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
            });
        }),
    ],
};

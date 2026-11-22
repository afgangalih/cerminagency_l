import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],

    theme: {
        extend: {
            fontFamily: {
                // Primary: Plus Jakarta Sans for all default typography (Headings, Body, Nav, Buttons)
                sans: ['"Plus Jakarta Sans"', 'Inter', ...defaultTheme.fontFamily.sans],
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
                // Secondary: Inter for high-density UI, numbers, data tables, labels
                inter: ['Inter', ...defaultTheme.fontFamily.sans],
                // Eliminate Consolas/Courier: map mono directly to Inter for clean tabular data
                mono: ['Inter', '"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};

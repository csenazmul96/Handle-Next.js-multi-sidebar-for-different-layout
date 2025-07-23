module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                borderColor: '#E5E7EB',
                commonBorderColor: '#E5E5EA',
                secondaryBgColor: '#F6F8FA',
                textSubColor: '#A0A0A3',
                textColor: '#222222',
                placeholderColor: '#C0C0C0',
            },
        },
        fontFamily: {
            sans: ['Pretendard GOV Variable', 'Pretendard GOV', 'sans-serif'],
        },
    },
    plugins: [
        // Enable line-clamp, scrollbar, etc., if you need for utilities
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar'),
    ],
}
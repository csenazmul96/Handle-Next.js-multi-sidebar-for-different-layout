import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {

        extend: {
            colors: {
                bodyBgColor: "#F9F9F9",
                secondaryBgColor: "#F8F8F8",
                themeColor: "#3058FF",
                borderColor: "#D8D8D8",
                tableBorderColor: "#E4E4E4",
                commonBorderColor: "#E4E4E4",
                textColor: "#1D1D1D",
                textSubColor: "#717171",
                inputColor: "#8E8E8E",
                placeholderColor: "#8E8E8E",
                subColor: "#64748B",
                leftMenuHoverColor: "#E6EEFF",
                primaryLightColor: "#F4F9FF",
                secondaryColor: "#555555",
                secondaryLightColor: "#F0F0F0",
                warningBgColor: "#FFF8E9",
                warningColor: "#98690A",
                dangerColor: "#FF0000",
                dangerDeppColor: "#D50136",
                dangerLightColor: "#FEECF0",
                tableHeadColor: "#d",
            },
            fontSize: {
                sm: '12px',
                '13': '13px',
                '14': '14px',
                base: '15px',
                baseNormal: '17px',
                medium: '19px',
                '25': '1.5625rem',
            },
            backgroundImage: {
                'login-img': "url('/images/logo-bg.png')",
            },
            boxShadow: {
                'card-shadow': '0px 0px 1px 0px rgba(0, 0, 0, 0.6)',
                'modalShadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
                'dashboardShadow': '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
                'notificatoindShadow': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            },
            lineHeight: {
                '40': '40px',
                '32': '32px',
                '24': '24px',
                '19': '19.5px',
                '15': '15px',

            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            screens: {
                'lg': '1025px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'), // for form styling
        plugin(function ({ addComponents, addUtilities }) {
            // optional: move your scrollbar or line-clamp definitions here if needed
        })
    ],
    darkMode: 'false',
};

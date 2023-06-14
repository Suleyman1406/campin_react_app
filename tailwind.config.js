module.exports = {
    purge: {
        content: ['./src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
    },
    theme: {
        extend: {
            boxShadow: {
                input: '0px 0px 0px 4px rgba(255, 119, 87, 0.54)',
            },
            colors: {
                'primary-1': '#617143',
                'primary-2': '#FFF8DE',
                'secondary-1': '#331811',
                'secondary-2': '#884A39',
            },
            screens: {
                '3xl': '1792px',
                '4xl': '2080px',
            },

            backgroundImage: {
                'landing-bg': "url('./src/images/landing_bg.jpeg')",
            },
            fontFamily: {
                'play-fair': ['Playfair Display', 'serif'],
            },
            screens: {
                sm: '320px',
                md: '768px',
                lg: '1152px',
                xl: '1440px',
            },
        },
    },
    important: true,
};

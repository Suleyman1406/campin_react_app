module.exports = {
    purge: {
        content: ['./src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
    },
    theme: {
        extend: {
            colors: {
                'primary-1': '#FF7757',
                'primary-2': '#FFD2C7',
                'secondary-1': '#331811',
                'secondary-2': '#61291C',
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
        },
    },
    important: true,
};

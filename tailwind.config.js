module.exports = {
    purge: {
        content: ['./src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
    },
    theme: {
        extend: {
            colors: {
                'gray-01': '#F4F4F4',
                'gray-02': '#E0E0E0',
                'gray-02-1': '#D1D1D1',
                'gray-03': '#C6C6C6',
                'gray-04': '#A8A8A8',
                'gray-05': '#8D8D8D',
                'gray-06': '#6F6F6F',
                'gray-07': '#525252',
                'gray-08': '#393939',
                'gray-09': '#474747',
                'gray-1': '#161616',
                'black-1': '#000000',
            },
            screens: {
                '3xl': '1792px',
                '4xl': '2080px',
            },
        },
    },
    important: true,
};

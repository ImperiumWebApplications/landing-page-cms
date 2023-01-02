module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Overpass', 'sans-serif'],
      system: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
    },
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      tertiary: 'var(--color-tertiary)',
      gray: 'var(--color-gray)',
    },
    extend: {
      borderRadius: {
        blob: '40% 60% 70% 30% / 40% 40% 60% 50%',
      },
    },
  },
  safelist: ['shimmer'],
};

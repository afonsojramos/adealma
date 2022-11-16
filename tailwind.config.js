/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '6rem',
      '8xl': '7rem',
      '9xl': '8rem',
      '10xl': '8.25rem',
      '11xl': '10rem',
      '12xl': '12.5rem',
      '13xl': '16rem',
    },
    extend: {
      colors: {
        primary: {
          100: '#ffffff',
          200: '#EBEBEB',
          300: '#DADADA',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#1a202c',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Favorit', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [
    ({ addVariant }) => {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};

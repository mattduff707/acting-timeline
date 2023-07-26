/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        header: `0px 0.1px 0.1px hsl(218deg 49% 7% / 0.34),
    0px 0.6px 0.7px -0.4px hsl(218deg 49% 7% / 0.34),
    0px 1.1px 1.2px -0.7px hsl(218deg 49% 7% / 0.34),
    0px 1.8px 2px -1.1px hsl(218deg 49% 7% / 0.34),
    0px 2.8px 3.1px -1.4px hsl(218deg 49% 7% / 0.34),
    0px 4.4px 5px -1.8px hsl(218deg 49% 7% / 0.34),
    -0.1px 6.7px 7.5px -2.1px hsl(218deg 49% 7% / 0.34),
    -0.1px 9.9px 11.1px -2.5px hsl(218deg 49% 7% / 0.34);`,
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const tailwindcssforms = require('@tailwindcss/forms');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        borderDeemphasis: '#C7CADC',
        borderMain: '#BCBFD1',
        darkBorderMain: '#33354E',
        darkBorderDeemphasis: '#22232F',
        surfacePrimary: '#D8DAE9',
        darkSurfacePrimary: '#191A22',
        surfaceSecondary: '#E1E3EF',
        darkSurfaceSecondary: '#1F2029',
        surfaceTertiary: '',
        darkSurfaceTertiary: '#20212D',
        textEmphasis: '#1E1F27',
        darkTextEmphasis: '#FFFFFF',
        textDeemphasis: '',
        darkTextDeemphasis: '#858697',
        textMain: '#2C2E39',
        darkTextMain: '#D2D3E0',
        textPlaceholder: '#8F93AE',
        darkTextPlaceholder: '#63657E',
        buttonPrimaryText: '#FFFFFF',
        buttonSecondaryText: '#545671',
        darkButtonSecondaryText: '#D2D3E0',
        buttonPrimaryBackground: '#4F46E5',
        buttonPrimaryBackgroundHover: '#6366F1',
        buttonSecondaryBackground: '#CFD0E1',
        darkButtonSecondaryBackground: '#272939',
        buttonSecondaryBackgroundHover: '#2E3143',
        inputBackground: '#F1F3F9',
        darkInputBackground: '#13141A',
      },
    },
  },
  plugins: [tailwindcssforms],
};

export default config;

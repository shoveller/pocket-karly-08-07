/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        secondary: '#bd76ff',
        white: '#ffffff',
        primary: '#5f0080',
        content: '#333333',
        gray: {
          50: '#f9f9f9',
          100: '#e1e1e1',
          200: '#c4c4c4',
          300: '#a6a6a6',
          400: '#898989',
          500: '#6b6b6b',
          600: '#565656',
          700: '#404040',
          800: '#2b2b2b',
          900: '#151515',
          divider: '#d9d9d9',
        },
        accent: { yellow: '#fa622f' },
        blue: {
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        Info: { Error: '#f03f40' },
      },
      fontSize: {
        sm: '12px',
        base: '16px',
        lg: '21.3px',
        xl: '28.4px',
        '2xl': '37.9px',
        '3xl': '50.5px',
        // Heading
        'h-base': ['16px', { lineHeight: '140%', fontWeight: '700' }],
        'h-lg': ['21.3px', { lineHeight: '140%', fontWeight: '700' }],
        'h-xl': ['28.4px', { lineHeight: '140%', fontWeight: '700' }],
        'h-2xl': ['37.9px', { lineHeight: '140%', fontWeight: '700' }],
        'h-3xl': ['50.5px', { lineHeight: '140%', fontWeight: '700' }],
        // Label
        'l-sm': ['12px', { lineHeight: '150%', fontWeight: '600' }],
        'l-base': ['16px', { lineHeight: '150%', fontWeight: '600' }],
        'l-lg': ['21.3px', { lineHeight: '150%', fontWeight: '600' }],
        'l-xl': ['28.4px', { lineHeight: '150%', fontWeight: '600' }],
        'l-2xl': ['37.9px', { lineHeight: '150%', fontWeight: '600' }],
        // Paragraph
        'p-xsm': ['10px', { lineHeight: '160%', fontWeight: '400' }],
        'p-sm': ['12px', { lineHeight: '160%', fontWeight: '400' }],
        'p-wsm': ['12px', { lineHeight: '150%', fontWeight: '400' }],
        'p-base': ['16px', { lineHeight: '160%', fontWeight: '400' }],
        'p-lg': ['21.3px', { lineHeight: '160%', fontWeight: '400' }],
        'p-xl': ['28.4px', { lineHeight: '160%', fontWeight: '400' }],
      },
      fontFamily: { sans: 'Pretendard-Regular' },
      boxShadow: {
        text: 'inset 1px 1px 0px 0px rgba(0,0,0,1)',
        'Above/High': '0px -16px 48px 0px rgba(0,0,0,0.3)',
        'Above/Medium': '0px -8px 36px 0px rgba(0,0,0,0.2)',
        'Above/Low': '0px -4px 24px 0px rgba(0,0,0,0.1)',
        'Below/High': '0px 16px 48px 0px rgba(0,0,0,0.3)',
        'Below/Medium': '0px 8px 36px 0px rgba(0,0,0,0.2)',
        'Below/Low': '0px 4px 24px 0px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        xs: '1px',
        sm: '2px',
        lg: '5px',
        xl: '8px',
        '2xl': '12px',
        '3xl': '16px',
        '4xl': '17px',
      },
      width: {
        innerWrapper: '1050px',
        'productBox-width': '249px',
        100: '400px',
        61.75: '247px',
        48.5: '194px',
        7.5: '30px',
        75: '300px',
        78.75: '315px',
        85: '340px',
        140: '560px',
        262.5: '1050px',
      },
      height: {
        'productBox-height': '538px',
        3.25: '13px',
        7.5: '30px',
        13: '52px',
        13.5: '54px',
        18: '72px',
        167.5: '670px',
      },
      inset: {
        'productBox-cart-top': '258px',
        'productBox-cart-left': '189px',
        18: '72px',
      },
      spacing: {
        3.25: '13px',
        5.25: '21px',
        7.25: '29px',
        13.5: '54px',
      },
      backgroundImage: {
        input__button: "url('/src/assets/svg/input-button.svg')",
      },
      backgroundPosition: {
        'radio--no': 'left top',
        'radio--yes': 'left bottom',
        'check--no': 'right top',
        'check--yes': 'right bottom',
      },
    },
    animation: {
      fadeIn: 'fadeIn 3s',
    },

    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '30%': { opacity: 1 },
        '80%': { opacity: 1 },
        '100%': { opacity: 0 },
      },
    },
  },
  plugins: [],
};

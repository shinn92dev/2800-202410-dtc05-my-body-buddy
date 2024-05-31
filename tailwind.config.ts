import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        beige: "#FFF6F4",
        orange: "#FFA41B",
        "logo-pumpkin": "#F86F03",
        "dark-blue": "#525FE1",
      },
      keyframes: {
        flash: {
          '0%, 100%': { color: 'black' },
          '50%': { color: 'gold' },
        },
      },
      animation: {
        flash: 'flash 0.5s ease-in-out 3',
        'spin-fast': 'spin 0.1s linear 10',
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'], // 12px, line-height 16px
        'sm': ['0.875rem', '1.25rem'], // 14px, line-height 20px
        'md': ['1rem', '1.5rem'], // 16px, line-height 24px
        'lg': ['1.125rem', '1.75rem'], // 18px, line-height 28px
        'xl': ['1.25rem', '1.75rem'], // 20px, line-height 28px
        '2xl': ['1.5rem', '2rem'], // 24px, line-height 32px
        '3xl': ['1.875rem', '2.25rem'], // 30px, line-height 36px
        '4xl': ['2.25rem', '2.5rem'], // 36px, line-height 40px
        '5xl': ['3rem', '1'], // 48px, line-height 1
        '6xl': ['3.75rem', '1'], // 60px, line-height 1
        '7xl': ['4.5rem', '1'], // 72px, line-height 1
        '8xl': ['6rem', '1'], // 96px, line-height 1
        '9xl': ['8rem', '1'], // 128px, line-height 1
      },
    },
  },
  plugins: [],
};

export default config;

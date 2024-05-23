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
    },
  },
  plugins: [],
};

export default config;

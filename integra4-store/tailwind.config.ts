import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        integra: {
          dark: "#2D1B4E",    // Roxo profundo
          medium: "#5B3C85",
          light: "#E6E1EB",   // Lilás claro
          green: "#4A6C48",   // Verde Sálvia
          gold: "#D4AF37",    // Dourado
        },
        stone: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          800: "#292524",
          900: "#1C1917",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
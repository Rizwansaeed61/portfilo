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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#00a896",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          dark: "#0b2326",
        },
        slate: {
          850: "#141923",
          900: "#0f172a",
          950: "#060c1a",
        },
        warm: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          teal: "#00a896",
          "teal-hover": "#028090",
          "teal-light": "#e6fffa",
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        sans: ["var(--font-poppins)", "Poppins", "var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
      },
      maxWidth: {
        "7xl": "80rem", // 1280px
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#f6f4ef",
        ink: "#14222d",
        accent: "#15384a",
        accentWarm: "#8f5a2f",
        line: "#d8d2c7"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(20, 34, 45, 0.08)",
        card: "0 8px 22px rgba(21, 56, 74, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

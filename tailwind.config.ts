import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        rocket: "#2563EB",
        cyan: "#06B6D4",
      },
      boxShadow: {
        card: "0 20px 60px -32px rgba(15, 23, 42, 0.25)",
        glow: "0 12px 35px -12px rgba(37, 99, 235, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
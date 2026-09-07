import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
        },
        cyber: {
          neon: "#00f2fe",
          purple: "#7928ca",
          pink: "#ff0080",
          dark: "#0b0f19",
          card: "#111827",
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(0, 242, 254, 0.6))" },
          "50%": { opacity: "0.7", filter: "drop-shadow(0 0 5px rgba(0, 242, 254, 0.2))" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gadgetai: {
          primary: "#00f2fe",
          secondary: "#7928ca",
          accent: "#ff0080",
          neutral: "#1f2937",
          "base-100": "#0b0f19",
          "base-200": "#111827",
          "base-300": "#1f2937",
          info: "#38bdf8",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
      "dark",
      "dim",
    ],
    darkTheme: "gadgetai",
    base: true,
    styled: true,
    utils: true,
  },
};

export default config;

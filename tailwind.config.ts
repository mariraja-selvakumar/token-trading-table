import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ffffff",
        card: "#1a1a1a",
        "card-foreground": "#ffffff",
        primary: "#8b5cf6",
        "primary-foreground": "#ffffff",
        secondary: "#27272a",
        "secondary-foreground": "#ffffff",
        muted: "#27272a",
        "muted-foreground": "#71717a",
        accent: "#27272a",
        "accent-foreground": "#ffffff",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        border: "#27272a",
        input: "#27272a",
        ring: "#8b5cf6",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "price-flash": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "price-flash": "price-flash 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;

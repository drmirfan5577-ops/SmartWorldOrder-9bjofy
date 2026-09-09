import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        emerald: {
          glow: "#00c97a",
          deep: "#007a4a",
          glass: "rgba(0,201,122,0.12)",
        },
        crimson: {
          glow: "#e8003d",
          deep: "#9b0028",
          glass: "rgba(232,0,61,0.10)",
        },
        gold: {
          glow: "#ffd700",
          deep: "#b8860b",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
        arabic: ["Noto Naskh Arabic", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { textShadow: "0 0 10px #00c97a, 0 0 20px #00c97a, 0 0 40px #00c97a" },
          "50%": { textShadow: "0 0 20px #00c97a, 0 0 40px #00c97a, 0 0 80px #00c97a" },
        },
        "glow-crimson": {
          "0%, 100%": { textShadow: "0 0 10px #e8003d, 0 0 20px #e8003d, 0 0 40px #e8003d" },
          "50%": { textShadow: "0 0 20px #e8003d, 0 0 40px #e8003d, 0 0 80px #e8003d" },
        },
        "glow-gold": {
          "0%, 100%": { textShadow: "0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 40px #ffd700" },
          "50%": { textShadow: "0 0 20px #ffd700, 0 0 40px #ffd700, 0 0 80px #ffd700" },
        },
        "marquee": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "tube-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
        "star-pulse": {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 4px #ffd700)" },
          "50%": { transform: "scale(1.2)", filter: "drop-shadow(0 0 12px #ffd700) drop-shadow(0 0 24px #ffd700)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "#00c97a", boxShadow: "0 0 8px #00c97a" },
          "50%": { borderColor: "#e8003d", boxShadow: "0 0 16px #e8003d" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "glow-crimson": "glow-crimson 2s ease-in-out infinite",
        "glow-gold": "glow-gold 2s ease-in-out infinite",
        "marquee": "marquee 20s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "tube-flicker": "tube-flicker 4s linear infinite",
        "star-pulse": "star-pulse 2s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

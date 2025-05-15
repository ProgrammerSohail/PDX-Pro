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
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        accent: "rgb(var(--accent))",
        neutral: "rgb(var(--neutral))",
      },
    },
  },
};

export default config; 
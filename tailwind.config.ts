import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "BlinkMacSystemFont",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: "#ffffff",
        "primary-content": "#1D1D1B",
        secondary: "#1D1D1B",
        "secondary-content": "#FFFFFF",
        accent: "#ea4c4b",
        "accent-content": "#FFFFFF",
        neutral: "#8c8c8c",
        "neutral-content": "#071441",
        "base-100": "#8c8c8c",
        "base-200": "#F8F7F7",
        "base-300": "#3D4090",
        "base-content": "#303263",
        info: "#EFE7D2",
        "info-content": "#C7A663",
        success: "#FFE0C5",
        "success-content": "#F2994A",
        warning: "#E6E0F4",
        "warning-content": "#A284CE",
        error: "#CCCCCC",
        "error-content": "#828282",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          "2xl": "5rem",
        },
      },
      fontSize: {
        xs: ["10px", "12px"],
        sm: ["12px", "14px"],
        base: ["16px", "26px"],
        md: ["18px", "25px"],
        lg: ["22px", "26px"],
        xl: ["38px", "46px"],
        "2xl": ["50px", "56px"],
        "3xl": ["67px", "75px"],
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
};
export default config;

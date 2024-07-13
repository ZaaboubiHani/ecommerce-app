module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "double-struck": [
        "Roboto Mono",
        "Noto Sans Math",
        "Cambria Math",
        "monospace",
      ],
      primary: ["Roboto", "sans-serif"],
      title: "Charm",
      sedan: ["sedan"],
      script: ['"Times New Roman"', 'serif'],
    },
    container: {
      padding: {
        DEFAULT: "30px",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#F5E6E0",
      },
      backgroundImage: {
        hero1: "url('./img/bg_hero1.jpg')",
        hero: "url('./img/bg_hero.jpg')",
        proDetails: "url('./img/bg.jfif')",
      },
    },
  },
  plugins: [],
};

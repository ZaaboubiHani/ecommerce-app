module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'double-struck': [
        'Roboto Mono',
        'Noto Sans Math',
        'Cambria Math',
        'monospace',
      ],
      primary: ['"Montserrat"', 'sans-serif'],
      title: ['"Great Vibes"', 'cursive'],
      sedan: ['sedan'],
      script: ['"Times New Roman"', 'serif'],
      lora: ['"Lora"', 'serif'],
      arinttika: ['"Arinttika Signature"', 'cursive'],
      edu: ['"Edu AU VIC WA NT Guides"', 'cursive'],
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
      backgroundImage: {
        hero1: "url('./img/bg_hero1.jpg')",
        hero: "url('./img/bg_hero.jpg')",
        proDetails: "url('./img/bg.jfif')",
        winter: 'url("./img/winter.webp")',
        winter2: 'url("./img/winter2.jpg")',
        winter3: 'url("./img/winter3.jpg")',
        winter4: 'url("./img/winter4.jpg")',
        winter5: 'url("./img/winter-5.jpg")',
        winter6: 'url("./img/winter6.jpg")',
        hero10: 'url("./img/hero.png")',
      },
    },
  },
  plugins: [],
}

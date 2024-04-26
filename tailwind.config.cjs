/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        'merriweather': ['Merriweather']
      }
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "lemonade", "wireframe", "dracula", "cmyk", "corporate", "business",
      {
        newtheme: {

          "primary": "#22c55e",

          "secondary": "#34d399",

          "accent": "#2dd4bf",

          "neutral": "#d1d5db",

          // "base-100": "#f5f5f4",

          "base-100": "#1c1917",

          "info": "#67e8f9",

          "success": "#00ff00",

          "warning": "#f59e0b",

          "error": "#f87171",
        },
      },],
  },
};

module.exports = config;

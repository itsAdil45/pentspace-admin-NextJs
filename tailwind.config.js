/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors :{
        black :{
          primary:'#262E3C'
        },
        blue : {
          primary :"#4CA0E5",
        },
        green :{
          primary : "hsl(var(--yellow-primary))"
        },
        red:{
          primary:"#FF0000"
        },
        grey : {
          primary :"#909090"
        },
        
      }
    },
  },
  plugins: [],
};

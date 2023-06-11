/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gradientLeft: "#110563",
        gradientRight: "#08092B",
        bl: "#24E9A7",
        br: "#07ADEB",
        ebl: "#D52BDE",
        score: "#5D62D9"
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      backgroundImage: {
        'backGround': "url('../src/assets/images/bgFinal.png')",
        'interface' : "url(../src/assets/images/interface.jpg)",
        'landingBg' : "url(../src/assets/images/landingBg2.png)",
        'playground': "url(../src/assets/images/pg.png)",
      },
      fontFamily: {
        prism: ['Tilt Prism'],
        Orbitron: ['Orbitron']
      },
    },
  },
  plugins: [],
}


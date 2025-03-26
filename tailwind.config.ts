import type {Config} from "tailwindcss";
const {
    default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");
const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                primary: {
                    "100": "#FFE8F0",
                    DEFAULT: "#EE2B69",
                    color1:'#FFB400',
                    hover:'#d99b37',
                    color2:'#000000',
                    color3:'#FFFFFF',
                },
                darkMod:{
                  DEFAULT: "#343535",
                  100: "#2a2a2aff",
                  200: "#1f2020",
                  300: "#1f1f1f",
                  400: "#393939",
                  500: "#161818",
                  600: "#303030",
                  700: "#131314",
                },
                secondary: "#FBE843",
                black: {
                    "100": "#333333",
                    "200": "#141413",
                    "300": "#7D8087",
                    DEFAULT: "#000000",
                },
                white: {
                    "100": "#F7F7F7",
                    DEFAULT: "#FFFFFF",
                },
            },
            fontFamily: {
                "work-sans": ["var(--font-work-sans)"],
                poppins: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(238, 43, 105)",
            },
            animation: {
                'bounce-x' : 'bouncex 1s infinite',
                scroll:
                "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      
              },
              keyframes: {
                bouncex: {
                  '0%, 100%': { 
                    transform: 'translateX(-25%)',
                    animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
                   },
                   '50%': {
                    transform: 'translateY(0)',
                    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
                  },
                },
                scroll: {
                    to: {
                      transform: "translate(calc(-50% - 0.5rem))",
                    },
                  },
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), ],
};

export default config;

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );
   
    addBase({
      ":root": newVars,
    });
  }
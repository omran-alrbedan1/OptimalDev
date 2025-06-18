import type { Config } from "tailwindcss";
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
  			xs: '475px'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			primary: {
  				'100': '#e6f4fc',
  				DEFAULT: '#22ace3',
  				color1: '#22ace3',
  				hover: '#1e9bcc',
  				color2: '#e0e0e0',
  				color3: '#ffffff'
  			},
  			darkMod: {
  				'100': '#2a2a2aff',
  				'200': '#1f2020',
  				'300': '#1f1f1f',
  				'400': '#393939',
  				'500': '#161818',
  				'600': '#303030',
  				'700': '#131314',
  				DEFAULT: '#343535'
  			},
  			tertiary: '#151030',
  			secondary: '#FBE843',
  			black: {
  				'100': '#333333',
  				'200': '#141413',
  				'300': '#7D8087',
  				DEFAULT: '#000000'
  			},
  			white: {
  				'100': '#F7F7F7',
  				DEFAULT: '#FFFFFF'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
  			}
  		},
  		fontFamily: {
  			zain: [
  				'var(--font-zain)'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'100': '2px 2px 0px 0px rgb(0, 0, 0)',
  			'200': '2px 2px 0px 2px rgb(0, 0, 0)',
  			'300': '2px 2px 0px 2px rgb(238, 43, 105)'
  		},
  		animation: {
  			'bounce-x': 'bouncex 1s infinite',
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
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
  				}
  			},
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;

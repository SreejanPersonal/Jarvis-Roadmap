
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Neumorphic specific colors
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					foreground: 'hsl(var(--surface-foreground))',
					accent: 'hsl(var(--surface-accent))',
					border: 'hsl(var(--surface-border))',
					highlight: 'hsl(var(--surface-highlight))',
					shadow: 'hsl(var(--surface-shadow))'
				},
				active: 'hsl(var(--active))',
				timeline: 'hsl(var(--timeline))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				ripple: {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				float: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'float-slow': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
					'100%': { transform: 'translateY(0)' }
				},
				appear: {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				disappear: {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.9)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'width-expand': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'pulse-shadow': {
					'0%': { 
						boxShadow: '0 0 10px hsla(var(--surface-accent), 0.2), 8px 8px 16px hsl(var(--surface-shadow)), -8px -8px 16px hsl(var(--surface-highlight))' 
					},
					'50%': { 
						boxShadow: '0 0 20px hsla(var(--surface-accent), 0.4), 8px 8px 16px hsl(var(--surface-shadow)), -8px -8px 16px hsl(var(--surface-highlight))' 
					},
					'100%': { 
						boxShadow: '0 0 10px hsla(var(--surface-accent), 0.2), 8px 8px 16px hsl(var(--surface-shadow)), -8px -8px 16px hsl(var(--surface-highlight))' 
					}
				},
				'pulse-shadow-premium': {
					'0%': { 
						boxShadow: '0 0 10px hsla(var(--checkpoint-current), 0.3), 8px 8px 16px hsl(var(--surface-shadow)), -8px -8px 16px hsl(var(--surface-highlight))' 
					},
					'50%': { 
						boxShadow: '0 0 20px hsla(var(--checkpoint-current), 0.5), 8px 8px 16px hsl(var(--surface-shadow)), -8px -8px 16px hsl(var(--surface-highlight))' 
					},
					'100%': { 
						boxShadow: '0 0 10px hsla(var(--checkpoint-current), 0.3), 8px 8px 16px hsl(var(--surface-shadow)), -8px -8px 16px hsl(var(--surface-highlight))' 
					}
				},
				heartbeat: {
					'0%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.3)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.3)' },
					'70%': { transform: 'scale(1)' },
				},
				'card-selected': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				ripple: 'ripple 0.7s ease-out',
				shimmer: 'shimmer 2s linear infinite',
				float: 'float 3s ease-in-out infinite',
				'float-slow': 'float-slow 4s ease-in-out infinite',
				appear: 'appear 0.3s ease-out forwards',
				disappear: 'disappear 0.3s ease-in forwards',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'width-expand': 'width-expand 0.4s ease-out',
				'pulse-shadow': 'pulse-shadow 2s infinite',
				'pulse-shadow-premium': 'pulse-shadow-premium 2s infinite',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
				'card-selected': 'card-selected 1s ease-out'
			},
			scale: {
				'98': '0.98',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

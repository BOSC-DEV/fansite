
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
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Georgia', 'Times New Roman', 'serif'],
				mono: ['SF Mono', 'monospace'],
				impact: ['Impact', 'Haettenschweiler', 'sans-serif'],
				western: ['"Playfair Display"', 'serif'],
				wanted: ['"Rye"', 'cursive'],
				matrix: ['"Courier New"', 'monospace'],
				hacker: ['"VT323"', 'monospace'],
			},
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
				navy: {
					DEFAULT: '#101C3D',
					light: '#1A2952',
					dark: '#071128',
				},
				alert: '#E63946',
				bosc: '#FF6B00',
				meme: {
					red: '#FF3C69',
					blue: '#00DBDE',
					green: '#4ADE80',
					yellow: '#FEF08A',
					purple: '#C084FC',
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
				matrix: {
					bg: '#000000',
					text: '#00FF41',
					accent: '#0CFF0C',
					dark: '#002800',
					light: '#39FF14',
					code: '#00FF00',
					highlight: '#32CD32',
					muted: '#003B00',
					border: '#008F11',
					hover: '#00FF41',
				},
				hacker: {
					bg: '#0D0D0D',
					card: '#1A1A1A',
					text: '#33FF33',
					accent: '#0CFF0C',
					highlight: '#00FF41',
					muted: '#264426',
					border: '#33FF33',
					dark: '#002200',
					error: '#FF0000',
					warning: '#FFFF00',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'bounce-slight': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(1000%)' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'glitch': {
					'0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75%, 80%, 85%, 90%, 95%, 100%': {
						transform: 'translate(0)',
						filter: 'blur(0)'
					},
					'2.5%, 22.5%, 42.5%, 62.5%, 82.5%': {
						transform: 'translate(-2px, 0)',
						filter: 'blur(1px)'
					},
					'7.5%, 27.5%, 47.5%, 67.5%, 87.5%': {
						transform: 'translate(2px, 0)',
						filter: 'blur(1px)'
					},
					'12.5%, 32.5%, 52.5%, 72.5%, 92.5%': {
						transform: 'translate(0, -2px)',
						filter: 'blur(1px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'pulse-subtle': 'pulse-subtle 2s infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'spin-slow': 'spin-slow 3s linear infinite',
				'bounce-slight': 'bounce-slight 2s infinite',
				'matrix-rain': 'matrix-rain 10s linear infinite',
				'blink': 'blink 1s step-end infinite',
				'glitch': 'glitch 3s infinite',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

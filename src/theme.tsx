import { createTheme } from '@mui/material/styles';

export const colors = {
	// Backgrounds
	spaceBg: '#050A18',
	glass: 'rgba(255, 255, 255, 0.04)',
	glassBorder: 'rgba(255, 255, 255, 0.10)',

	// Text
	white: '#FFFFFF',
	starlight: '#8FA3C0',

	// Accent — warm comet gold
	gold: '#F5CF6E',
	goldGlowSoft: 'rgba(245, 207, 110, 0.3)',
	goldGlowMid: 'rgba(245, 207, 110, 0.6)',
	goldGlowFull: 'rgba(245, 207, 110, 1.0)',

	// White glows
	whiteGlowMid: 'rgba(255, 255, 255, 0.5)',
	whiteGlowBright: 'rgba(255, 255, 255, 0.6)',
	whiteGlowDot: 'rgba(255, 255, 255, 0.8)',

	// Three.js / Canvas (can't use theme tokens in R3F materials)
	comet: '#FFFACD',
} as const;

export const glows = {
	white: `0 0 10px ${colors.whiteGlowBright}`,
	goldHover: `0 0 16px ${colors.goldGlowFull}`,
	goldText: `0 0 6px ${colors.goldGlowSoft}, 0 0 12px ${colors.goldGlowMid}`,
	goldTextStrong: `0 0 10px ${colors.goldGlowMid}, 0 0 22px ${colors.goldGlowFull}`,
} as const;

export const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: colors.spaceBg,
		},
		primary: {
			main: colors.gold,
		},
		text: {
			primary: colors.white,
			secondary: colors.starlight,
		},
	},
	typography: {
		fontFamily: '"Schibsted Grotesk Variable", sans-serif',
		allVariants: {
			letterSpacing: '-0.03em',
		},
	},
});

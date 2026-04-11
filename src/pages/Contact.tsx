import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import { Typography, Link, IconButton, Stack, Box } from '@mui/material';
import { colors, glows } from '../theme';

const iconButtonSx = {
	width: '64px',
	height: '64px',
	borderRadius: '50%',
	border: `1px solid ${colors.glassBorder}`,
	backdropFilter: 'blur(4px)',
	backgroundColor: colors.glass,
	color: 'text.primary',
	boxShadow: glows.white,
	transition: 'all 0.3s ease',
	'&:hover': {
		boxShadow: glows.goldHover,
		borderColor: colors.goldGlowMid,
		color: colors.gold,
		transform: 'translateY(-2px)',
	},
} as const;

export const Contact = () => (
	<Stack textAlign="center" spacing={4}>
		<Box>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize={{ xs: '1.75rem', sm: '2rem' }}
				fontWeight={700}
				color="text.primary"
			>
				Find me on.
			</Typography>
		</Box>
		<Stack direction="row" spacing={3} justifyContent="center">
			<Link
				href="mailto:hello@yunuchoi.me"
				underline="none"
				sx={{
					...iconButtonSx,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Email sx={{ fontSize: 28, color: colors.white }} />
			</Link>
			<IconButton
				component="a"
				href="https://www.linkedin.com/in/yunuchoi"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				sx={iconButtonSx}
			>
				<LinkedIn sx={{ fontSize: 28 }} />
			</IconButton>
			<IconButton
				component="a"
				href="https://www.github.com/yunuchoi"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
				sx={iconButtonSx}
			>
				<GitHub sx={{ fontSize: 28 }} />
			</IconButton>
		</Stack>
	</Stack>
);

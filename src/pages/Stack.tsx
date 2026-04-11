import { Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { colors, glows } from '../theme';

const techStack = ['AI', 'TypeScript', 'React', 'Express', 'Python'];

interface StackProps {
	isVisible: boolean;
}

export const Stack = ({ isVisible }: StackProps) => {
	const fadeInUp = keyframes`
		from { opacity: 0; transform: translateY(14px); }
		to   { opacity: 1; transform: translateY(0);    }
	`;

	const chipSx = {
		fontSize: '0.95rem',
		fontWeight: 500,
		color: 'text.primary',
		px: 2,
		py: 0.75,
		border: `1px solid ${colors.glassBorder}`,
		borderRadius: '100px',
		backdropFilter: 'blur(4px)',
		backgroundColor: colors.glass,
		boxShadow: glows.white,
		transition: 'box-shadow 0.3s ease, border-color 0.3s ease, color 0.3s ease',
		cursor: 'default',
		letterSpacing: '0.01em',
		'&:hover': {
			boxShadow: glows.goldHover,
			borderColor: colors.goldGlowMid,
			color: colors.gold,
		},
	};

	return (
		<Box textAlign="center" px={2}>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize={{ xs: '1.75rem', sm: '2rem' }}
				fontWeight={600}
				color="text.primary"
				mb={3}
			>
				I make{' '}
				<Typography
					component="span"
					sx={{
						fontFamily: 'inherit',
						fontSize: 'inherit',
						fontWeight: 'inherit',
						color: colors.gold,
						display: 'inline-block',
						animation: 'magic-glow 5s infinite alternate',
						'@keyframes magic-glow': {
							'0%, 100%': { textShadow: glows.goldText },
							'50%': { textShadow: glows.goldTextStrong },
						},
					}}
				>
					magical
				</Typography>{' '}
				things happen with
			</Typography>
			<Box display="flex" justifyContent="center" flexWrap="wrap" gap={1.5}>
				{techStack.map((tech, i) => (
					<Typography
						key={`${tech}-${isVisible}`}
						component="span"
						sx={{
							...chipSx,
							opacity: isVisible ? 1 : 0,
							animation: isVisible
								? `${fadeInUp} 0.45s ease-out ${i * 0.08}s both`
								: 'none',
						}}
					>
						{tech}
					</Typography>
				))}
			</Box>
		</Box>
	);
};

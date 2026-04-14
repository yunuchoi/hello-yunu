import { Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { colors, glows } from '../theme';

const techStack = ['AI', 'TypeScript', 'React', 'Express', 'Python'];

// How long the comet takes to cross the container
const COMET_DURATION = 1.2; // seconds
// Each item reveals as the comet passes — evenly spaced across the duration
const itemDelay = (i: number) => (i / techStack.length) * COMET_DURATION;

interface StackProps {
	isVisible: boolean;
}

export const Stack = ({ isVisible }: StackProps) => {
	const cometFly = keyframes`
		from { left: -8%; opacity: 0; }
		5%   { opacity: 1; }
		90%  { opacity: 1; }
		to   { left: 108%; opacity: 0; }
	`;

	const fadeIn = keyframes`
		from { opacity: 0; }
		to   { opacity: 1; }
	`;

	const twinkle = keyframes`
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.3; transform: scale(0.7); }
	`;

	return (
		<Box textAlign="center" px={2}>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize={{ xs: '1.75rem', sm: '2rem' }}
				fontWeight={600}
				color="text.primary"
				mb={1}
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

			{/* Comet + stack items container */}
			<Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>

				{/* DOM comet streak */}
				{isVisible && (
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-50%)',
							width: 80,
							height: 2,
							borderRadius: '100px',
							// Bright head on the right, fading tail to the left
							background: `linear-gradient(90deg, transparent 0%, ${colors.goldGlowSoft} 40%, ${colors.comet} 100%)`,
							boxShadow: `0 0 6px 2px ${colors.goldGlowMid}, 0 0 16px 4px ${colors.goldGlowSoft}`,
							animation: `${cometFly} ${COMET_DURATION}s ease-in forwards`,
							pointerEvents: 'none',
							zIndex: 10,
						}}
					/>
				)}

				{/* Stack items */}
				<Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
					{techStack.map((tech, i) => (
						<Box
							key={`${tech}-${isVisible}`}
							display="flex"
							alignItems="center"
							gap={1}
							sx={{
								cursor: 'default',
								opacity: 0,
								animation: isVisible
									? `${fadeIn} 0.4s ease-out ${itemDelay(i)}s forwards`
									: 'none',
								'&:hover .star': {
									color: colors.gold,
									textShadow: glows.goldText,
								},
								'&:hover .label': {
									color: colors.gold,
								},
							}}
						>
							<Typography
								className="star"
								component="span"
								sx={{
									fontSize: '0.9rem',
									color: colors.gold,
									textShadow: glows.goldText,
									lineHeight: 1,
									animation: isVisible
										? `${twinkle} ${4 + i * 0.8}s ease-in-out ${i * 0.6}s infinite`
										: 'none',
									transition: 'color 0.3s, text-shadow 0.3s',
								}}
							>
								✦
							</Typography>
							<Typography
								className="label"
								component="span"
								sx={{
									fontFamily: 'Bricolage Grotesque Variable',
									fontSize: { xs: '1.25rem', sm: '1.4rem' },
									fontWeight: 600,
									color: colors.white,
									letterSpacing: '-0.01em',
									transition: 'color 0.3s',
								}}
							>
								{tech}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

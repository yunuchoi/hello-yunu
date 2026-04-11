import { Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

export const Greeting = () => {
	const fadeInUp = keyframes`
		from { opacity: 0; transform: translateY(20px); }
		to   { opacity: 1; transform: translateY(0);    }
	`;

	const breathe = keyframes`
		0%, 100% { opacity: 0.88; }
		50%       { opacity: 1;    }
	`;

	const text = 'Hello there!';
	const charDelay = 0.055;
	const entranceDone = text.length * charDelay + 0.5;

	return (
		<Box textAlign="center" px={2}>
			<Typography
				fontFamily="Bricolage Grotesque Variable"
				fontSize={{ xs: '2rem', sm: '3rem' }}
				fontWeight={700}
				color="text.primary"
				lineHeight={1.05}
				sx={{
					letterSpacing: '-0.04em',
					animation: `${breathe} 4s ease-in-out ${entranceDone}s infinite`,
				}}
			>
				{text.split('').map((char, i) => (
					<Box
						key={i}
						component="span"
						sx={{
							display: 'inline-block',
							animation: `${fadeInUp} 0.5s ease-out ${i * charDelay}s both`,
						}}
					>
						{char === ' ' ? '\u00A0' : char}
					</Box>
				))}
			</Typography>
		</Box>
	);
};

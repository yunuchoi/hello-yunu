import { Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

export const Scene1 = () => {
	const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;
	return (
		<Typography
			fontFamily="Bricolage Grotesque Variable"
			fontSize="2.5rem"
			fontWeight={700}
			color="#fff"
			textAlign="center"
			sx={{ animation: `${pulse} 2s infinite ease-in-out` }}
		>
			✨ Hello there!
		</Typography>
	);
};

import { Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
interface ScrollArrowProps {
	opacity: number;
}

export const ScrollArrow = ({ opacity }: ScrollArrowProps) => {
	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 32,
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 2,
				animation: 'bounce 2s infinite',
				color: 'rgba(255, 255, 255, 0.7)',
				pointerEvents: 'none',
				opacity,
				transition: 'opacity 0.3s ease',
				'@keyframes bounce': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
			}}
		>
			<KeyboardArrowDown sx={{ fontSize: 40 }} />
		</Box>
	);
};

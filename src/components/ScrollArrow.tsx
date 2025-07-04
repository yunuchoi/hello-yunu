import { Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
interface ScrollArrowProps {
	onClick: () => void;
	opacity: number;
}

export const ScrollArrow = ({ onClick, opacity }: ScrollArrowProps) => {
	return (
		<Box
			onClick={onClick}
			sx={{
				position: 'fixed',
				bottom: 32,
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 2,
				animation: 'bounce 2s infinite',
				color: 'rgba(255, 255, 255, 0.7)',
				pointerEvents: 'auto',
				cursor: 'pointer',
				opacity: opacity,
			}}
		>
			<KeyboardArrowDown sx={{ fontSize: 40 }} />
		</Box>
	);
};

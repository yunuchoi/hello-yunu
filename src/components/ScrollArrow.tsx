import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

interface ScrollArrowProps {
	onClick: () => void;
	opacity: number;
	sx?: SxProps<Theme>;
}

export const ScrollArrow = ({ onClick, opacity, sx }: ScrollArrowProps) => {
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
				pointerEvents: opacity > 0 ? 'auto' : 'none',
				cursor: opacity > 0 ? 'pointer' : 'default',
				opacity: opacity,
				...sx,
			}}
		>
			<KeyboardArrowDown sx={{ fontSize: 40 }} />
			<style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
		</Box>
	);
};

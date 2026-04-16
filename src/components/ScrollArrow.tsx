import { useSpring, animated } from "@react-spring/web";
import { colors } from "../theme";

interface ScrollArrowProps {
	onClick: () => void;
	opacity: number;
}

export const ScrollArrow = ({ onClick, opacity }: ScrollArrowProps) => {
	const spring = useSpring({
		opacity,
		y: opacity > 0 ? 0 : 12,
		config: { tension: 120, friction: 22 },
	});

	return (
		<animated.div
			onClick={onClick}
			style={{
				position: "fixed",
				bottom: "2rem",
				left: "50%",
				zIndex: 2,
				opacity: spring.opacity,
				transform: spring.y.to(
					(y) => `translateX(-50%) translateY(${y}px)`
				),
				pointerEvents: opacity > 0 ? "auto" : "none",
				cursor: opacity > 0 ? "pointer" : "default",
			}}
		>
			<svg
				width="32"
				height="24"
				viewBox="0 0 32 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polyline
					points="6,4 16,16 26,4"
					stroke={colors.whiteGlowDot}
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				>
					<animateTransform
						attributeName="transform"
						type="translate"
						values="0 0; 0 5; 0 0"
						dur="2.4s"
						repeatCount="indefinite"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
					/>
					<animate
						attributeName="opacity"
						values="0.5; 1; 0.5"
						dur="2.4s"
						repeatCount="indefinite"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
					/>
				</polyline>
			</svg>
		</animated.div>
	);
};

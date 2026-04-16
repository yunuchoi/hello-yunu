import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { colors } from "../theme";

export const CursorGlow = () => {
	const [spring, api] = useSpring(() => ({
		x: 0,
		y: 0,
		opacity: 0,
		config: { tension: 140, friction: 28 },
	}));

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			api.start({ x: e.clientX - 200, y: e.clientY - 200, opacity: 1 });
		};
		window.addEventListener("mousemove", onMouseMove);
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, [api]);

	return (
		<animated.div
			style={{
				...spring,
				position: "fixed",
				top: 0,
				left: 0,
				width: 400,
				height: 400,
				borderRadius: "50%",
				background: `radial-gradient(circle, ${colors.goldGlowSoft} 0%, transparent 70%)`,
				pointerEvents: "none",
				zIndex: 5,
				mixBlendMode: "screen",
			}}
		/>
	);
};

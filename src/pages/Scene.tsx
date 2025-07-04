import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/web';
import { Typography } from '@mui/material';
import { Stars } from '../components/Stars';
import { Profile } from '../components/Profile';
import { ScrollArrow } from '../components/ScrollArrow';

export const Scene = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const onScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const nameSpring = useSpring({
		opacity: 1 - Math.min(scrollY / (window.innerHeight * 0.7), 1),
		transform: `translateY(${scrollY * 0.2}px)`,
		config: { mass: 1, tension: 120, friction: 30 },
	});

	const aboutSpring = useSpring({
		opacity: Math.max(
			0,
			(scrollY - window.innerHeight * 0.5) / (window.innerHeight * 0.4)
		),
		config: { mass: 1, tension: 120, friction: 30 },
	});

	const arrowOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.5));

	return (
		<div
			style={{
				height: '200vh',
				backgroundColor: '#000010',
				overflowX: 'hidden',
				position: 'relative',
			}}
		>
			<Canvas
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					pointerEvents: 'none',
					zIndex: 0,
				}}
				camera={{ position: [0, -1.5, 7], fov: 60 }}
			>
				<Stars scrollY={scrollY} />
			</Canvas>

			<ScrollArrow opacity={arrowOpacity} />

			<animated.div
				style={{
					...nameSpring,
					position: 'sticky',
					top: 0,
					width: '100vw',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'none',
					userSelect: 'none',
					zIndex: 1,
				}}
			>
				<animated.div
					style={{
						backgroundColor: 'rgba(0,0,0,0.2)',
						backdropFilter: 'blur(6px)',
						borderRadius: '12px',
						padding: '1rem 2rem',
						color: '#fff',
						fontSize: '2.5rem',
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					<Typography
						fontFamily="Bricolage Grotesque Variable"
						fontSize="2.25rem"
						fontWeight={700}
					>
						✨ Hello there!{' '}
					</Typography>
				</animated.div>
			</animated.div>

			<animated.div
				style={{
					...aboutSpring,
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '2rem',
					color: '#fff',
					fontSize: '2rem',
					textAlign: 'center',
					position: 'relative',
					zIndex: 1,
					borderRadius: '12px',
					margin: '0 1rem',
					backgroundColor: 'transparent',
				}}
			>
				<Profile />
			</animated.div>
		</div>
	);
};

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/web';
import { Stars } from '../components/Stars';
import { ScrollArrow } from '../components/ScrollArrow';
import { Scene1 } from '../scenes/Scene1';
import { Scene2 } from '../scenes/Scene2';
import { Scene3 } from '../scenes/Scene3';
import { Scene4 } from '../scenes/Scene4';
import { Comets } from '../components/Comets';

export const Scene = () => {
	const [scrollY, setScrollY] = useState<number>(0);
	const [vh, setVh] = useState<number>(window.innerHeight);

	useEffect(() => {
		const onResize = () => setVh(window.innerHeight);
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		let ticking = false;
		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setScrollY(window.scrollY);
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const handleArrowClick = () => {
		const vhPx = window.innerHeight;
		const startY = window.scrollY;
		const nextPage = Math.floor(startY / vhPx) + 1;
		const targetY = nextPage * vhPx;

		const duration = 800;
		let startTime: number | null = null;

		const easeInOutCubic = (t: number) =>
			t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const ease = easeInOutCubic(progress);
			window.scrollTo(0, startY + (targetY - startY) * ease);

			if (elapsed < duration) {
				window.requestAnimationFrame(step);
			}
		};

		window.requestAnimationFrame(step);
	};

	const clamp = (num: number, min: number, max: number): number =>
		Math.min(Math.max(num, min), max);

	const sceneHeight = vh * 1;
	const transitionZone = vh * 0.15;

	const getSceneOpacity = (sceneIndex: number): number => {
		const startScroll = sceneIndex * sceneHeight;
		const endScroll = (sceneIndex + 1) * sceneHeight;

		const fadeInStart = startScroll - transitionZone;
		const fadeInEnd = startScroll;

		const fadeOutStart = endScroll - transitionZone;
		const fadeOutEnd = endScroll;

		let opacity = 0;

		if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
			opacity = clamp((scrollY - fadeInStart) / transitionZone, 0, 1);
		} else if (scrollY >= fadeInEnd && scrollY < fadeOutStart) {
			opacity = 1;
		} else if (scrollY >= fadeOutStart && scrollY < fadeOutEnd) {
			opacity = clamp(
				1 - (scrollY - fadeOutStart) / transitionZone,
				0,

				1
			);
		}

		return opacity;
	};

	const getSceneTransform = (sceneIndex: number): string => {
		const startScroll = sceneIndex * sceneHeight;
		const parallaxStrength = 0.1;

		if (scrollY >= startScroll && scrollY < startScroll + sceneHeight) {
			return `translateY(${
				-(scrollY - startScroll) * parallaxStrength
			}px)`;
		}
		return `translateY(0px)`;
	};

	const scene1Spring = useSpring({
		opacity: getSceneOpacity(0),
		transform: getSceneTransform(0),
		config: { mass: 1, tension: 120, friction: 30 },
	});

	const scene2Spring = useSpring({
		opacity: getSceneOpacity(1),
		transform: getSceneTransform(1),
		config: { mass: 1, tension: 120, friction: 30 },
	});

	const scene3Spring = useSpring({
		opacity: getSceneOpacity(2),
		transform: getSceneTransform(2),
		config: { mass: 1, tension: 120, friction: 30 },
	});

	const scene4Spring = useSpring({
		opacity: getSceneOpacity(3),
		transform: getSceneTransform(3),
		config: { mass: 1, tension: 120, friction: 30 },
	});

	const totalScenes = 4;
	const totalHeight = totalScenes * vh;

	const currentSceneIndex = Math.floor(scrollY / vh);
	const scrollWithinCurrentScene = scrollY % vh;
	const fadeOutStartInScene = vh * 0.8;
	const fadeOutEndInScene = vh;

	let arrowOpacity = 0;

	if (currentSceneIndex < totalScenes - 1) {
		if (scrollWithinCurrentScene < fadeOutStartInScene) {
			arrowOpacity = 1;
		} else {
			arrowOpacity = clamp(
				1 -
					(scrollWithinCurrentScene - fadeOutStartInScene) /
						(fadeOutEndInScene - fadeOutStartInScene),
				0,
				1
			);
		}
	} else {
		arrowOpacity = 0;
	}

	return (
		<div
			style={{
				height: `${totalHeight}px`,
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
				<Comets />
			</Canvas>

			<ScrollArrow
				onClick={handleArrowClick}
				opacity={arrowOpacity}
				sx={{
					position: 'fixed',
					bottom: '2rem',
					left: '50%',
					transform: 'translateX(-50%)',
					zIndex: 10,
				}}
			/>

			{[scene1Spring, scene2Spring, scene3Spring, scene4Spring].map(
				(springProps, index) => (
					<animated.div
						key={index}
						style={{
							...springProps,
							position: 'sticky',
							top: 0,
							height: '100vh',
							width: '100vw',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 1,
							overflow: 'hidden',
						}}
					>
						{index === 0 && <Scene1 />}
						{index === 1 && <Scene2 />}
						{index === 2 && <Scene3 />}
						{index === 3 && <Scene4 />}
					</animated.div>
				)
			)}
		</div>
	);
};

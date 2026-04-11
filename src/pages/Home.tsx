import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/web';
import { Stars } from '../components/Stars';
import { ScrollArrow } from '../components/ScrollArrow';
import { Greeting } from './Greeting';
import { About } from './About';
import { Stack } from './Stack';
import { Contact } from './Contact';
import { Comets } from '../components/Comets';
import { Twinkle } from '../components/Twinkle';
import { colors } from '../theme';

export const Home = () => {
	const [scrollY, setScrollY] = useState<number>(0);
	const [vh, _] = useState<number>(window.innerHeight);
	const isScrolling = useRef(false);
	const totalScenes = 4;

	const setVhVar = () => {
		document.documentElement.style.setProperty(
			'--vh',
			`${window.innerHeight}px`
		);
	};

	useEffect(() => {
		setVhVar();
		window.addEventListener('resize', setVhVar);
		window.addEventListener('orientationchange', setVhVar);
		return () => {
			window.removeEventListener('resize', setVhVar);
			window.removeEventListener('orientationchange', setVhVar);
		};
	}, []);

	const goToScene = (index: number) => {
		const clamped = Math.max(0, Math.min(totalScenes - 1, index));
		window.scrollTo({ top: clamped * window.innerHeight, behavior: 'smooth' });
		isScrolling.current = true;
		setTimeout(() => { isScrolling.current = false; }, 900);
	};

	useEffect(() => {
		const onScroll = () => setScrollY(window.scrollY);

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			if (isScrolling.current) return;
			const current = Math.round(window.scrollY / window.innerHeight);
			goToScene(current + (e.deltaY > 0 ? 1 : -1));
		};

		let touchStartY = 0;
		const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
		const onTouchMove = (e: TouchEvent) => { e.preventDefault(); };
		const onTouchEnd = (e: TouchEvent) => {
			if (isScrolling.current) return;
			const diff = touchStartY - e.changedTouches[0].clientY;
			if (Math.abs(diff) < 30) return;
			const current = Math.round(window.scrollY / window.innerHeight);
			goToScene(current + (diff > 0 ? 1 : -1));
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });
		window.addEventListener('touchend', onTouchEnd, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
		};
	}, []);

	const handleArrowClick = () => {
		const current = Math.round(window.scrollY / window.innerHeight);
		goToScene(current + 1);
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
			opacity = clamp(1 - (scrollY - fadeOutStart) / transitionZone, 0, 1);
		}
		return opacity;
	};

	const getSceneTransform = (sceneIndex: number): string => {
		const startScroll = sceneIndex * sceneHeight;
		const parallaxStrength = 0.1;
		if (scrollY >= startScroll && scrollY < startScroll + sceneHeight) {
			return `translateY(${-(scrollY - startScroll) * parallaxStrength}px)`;
		}
		return `translateY(0px)`;
	};

	const getSceneFilter = (sceneIndex: number): string => {
		const blur = (1 - getSceneOpacity(sceneIndex)) * 4;
		return `blur(${blur.toFixed(1)}px)`;
	};

	const springConfig = { mass: 1, tension: 120, friction: 30 };

	const scene1Spring = useSpring({ opacity: getSceneOpacity(0), transform: getSceneTransform(0), filter: getSceneFilter(0), config: springConfig });
	const scene2Spring = useSpring({ opacity: getSceneOpacity(1), transform: getSceneTransform(1), filter: getSceneFilter(1), config: springConfig });
	const scene3Spring = useSpring({ opacity: getSceneOpacity(2), transform: getSceneTransform(2), filter: getSceneFilter(2), config: springConfig });
	const scene4Spring = useSpring({ opacity: getSceneOpacity(3), transform: getSceneTransform(3), filter: getSceneFilter(3), config: springConfig });

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
				1 - (scrollWithinCurrentScene - fadeOutStartInScene) / (fadeOutEndInScene - fadeOutStartInScene),
				0,
				1
			);
		}
	}

	const stackVisible = getSceneOpacity(2) > 0.9;

	return (
		<div
			style={{
				height: `calc(var(--vh, 100vh) * ${totalScenes})`,
				backgroundColor: colors.spaceBg,
				overflowX: 'hidden',
				position: 'relative',
			}}
		>
			{/* Stars + comets */}
			<Canvas
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: 'var(--vh, 100vh)',
					pointerEvents: 'none',
					zIndex: 0,
				}}
				camera={{ position: [0, -1.5, 7], fov: 60 }}
			>
				<Stars scrollY={scrollY} />
				<Twinkle />
				<Comets />
				<Comets initialDelay={3500} />
			</Canvas>


			<ScrollArrow onClick={handleArrowClick} opacity={arrowOpacity} />

			{[scene1Spring, scene2Spring, scene3Spring, scene4Spring].map(
				(springProps, index) => (
					<animated.div
						key={index}
						style={{
							...springProps,
							position: 'sticky',
							top: 0,
							height: 'var(--vh, 100vh)',
							width: '90vw',
							marginLeft: 'auto',
							marginRight: 'auto',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 1,
							overflow: 'hidden',
						}}
					>
						{index === 0 && <Greeting />}
						{index === 1 && <About />}
						{index === 2 && <Stack isVisible={stackVisible} />}
						{index === 3 && <Contact />}
					</animated.div>
				)
			)}
		</div>
	);
};

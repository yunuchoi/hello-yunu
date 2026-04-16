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

export const Home = () => {
	const [scrollY, setScrollY] = useState<number>(0);
	const [vh, setVh] = useState<number>(window.innerHeight);
	const containerRef = useRef<HTMLDivElement>(null);
	const currentScene = useRef(0);
	const totalScenes = 4;

	useEffect(() => {
		const update = () => {
			const h = window.innerHeight;
			setVh(h);
			document.documentElement.style.setProperty('--vh', `${h}px`);
		};
		update();
		window.addEventListener('resize', update);
		window.addEventListener('orientationchange', update);
		return () => {
			window.removeEventListener('resize', update);
			window.removeEventListener('orientationchange', update);
		};
	}, []);

	// Read scrollTop from the scroll container — no JS scroll interception at all
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const onScroll = () => {
			const y = el.scrollTop;
			setScrollY(y);
			currentScene.current = Math.round(y / window.innerHeight);
		};
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => el.removeEventListener('scroll', onScroll);
	}, []);

	const handleArrowClick = () => {
		const el = containerRef.current;
		if (!el) return;
		const next = Math.min(currentScene.current + 1, totalScenes - 1);
		el.scrollTo({ top: next * window.innerHeight, behavior: 'smooth' });
	};

	const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);

	const transitionZone = vh * 0.15;

	const getSceneOpacity = (i: number): number => {
		const start = i * vh;
		const end = (i + 1) * vh;
		const fadeInStart = start - transitionZone;
		const fadeOutStart = end - transitionZone;

		if (scrollY >= fadeInStart && scrollY < start)
			return clamp((scrollY - fadeInStart) / transitionZone, 0, 1);
		if (scrollY >= start && scrollY < fadeOutStart)
			return 1;
		if (scrollY >= fadeOutStart && scrollY < end)
			return clamp(1 - (scrollY - fadeOutStart) / transitionZone, 0, 1);
		return 0;
	};

	const getSceneFilter = (i: number) =>
		`blur(${((1 - getSceneOpacity(i)) * 4).toFixed(1)}px)`;

	const sc = { mass: 1, tension: 120, friction: 30 };
	const s1 = useSpring({ opacity: getSceneOpacity(0), filter: getSceneFilter(0), config: sc });
	const s2 = useSpring({ opacity: getSceneOpacity(1), filter: getSceneFilter(1), config: sc });
	const s3 = useSpring({ opacity: getSceneOpacity(2), filter: getSceneFilter(2), config: sc });
	const s4 = useSpring({ opacity: getSceneOpacity(3), filter: getSceneFilter(3), config: sc });
	const springs = [s1, s2, s3, s4];

	const within = scrollY % vh;
	const fadeStart = vh * 0.8;
	const sceneIdx = Math.floor(scrollY / vh);
	const arrowOpacity = sceneIdx < totalScenes - 1
		? within < fadeStart ? 1 : clamp(1 - (within - fadeStart) / (vh - fadeStart), 0, 1)
		: 0;

	const stackVisible = getSceneOpacity(2) > 0.9;

	return (
		<>
			{/* Fixed starfield — always behind everything */}
			<Canvas
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: 'var(--vh, 100vh)',
					pointerEvents: 'none',
					zIndex: 0,
					background: 'linear-gradient(to bottom, #130826 0%, #0C051C 25%, #070318 50%, #050A18 100%)',
				}}
				camera={{ position: [0, -1.5, 7], fov: 60 }}
			>
				<Stars scrollY={scrollY} />
				<Twinkle />
				<Comets />
				<Comets initialDelay={3500} />
			</Canvas>

			{/*
			 * Scroll container — position:fixed so it sits above the canvas but
			 * background:transparent so the canvas shows through. Each child is a
			 * full-viewport snap section in normal flow (not fixed/sticky), so the
			 * browser's native scroll engine handles wheel, touch, and momentum
			 * with zero JS interception.
			 */}
			<div
				ref={containerRef}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: 'var(--vh, 100vh)',
					overflowY: 'scroll',
					overflowX: 'clip',
					scrollSnapType: 'y mandatory',
					background: 'transparent',
					zIndex: 1,
					scrollbarWidth: 'none',
				}}
			>
				{/* Webkit scrollbar hide */}
				<style>{`div::-webkit-scrollbar { display: none; }`}</style>

				{springs.map((spring, index) => (
					// Static div owns all layout/snap properties so react-spring
					// never interferes with height or flex centering
					<div
						key={index}
						style={{
							height: 'var(--vh, 100vh)',
							width: '100%',
							scrollSnapAlign: 'start',
							scrollSnapStop: 'always',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
						}}
					>
						{/* Animated wrapper only carries opacity + filter */}
						<animated.div
							style={{
								...spring,
								width: '90%',
								maxWidth: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{index === 0 && <Greeting />}
							{index === 1 && <About />}
							{index === 2 && <Stack isVisible={stackVisible} />}
							{index === 3 && <Contact />}
						</animated.div>
					</div>
				))}
			</div>

			<ScrollArrow onClick={handleArrowClick} opacity={arrowOpacity} />
		</>
	);
};

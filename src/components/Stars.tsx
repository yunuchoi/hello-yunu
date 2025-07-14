import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars as StarsProp } from '@react-three/drei';
import * as THREE from 'three';

interface MovingStarsProps {
	scrollY: number;
}

export const Stars = ({ scrollY }: MovingStarsProps) => {
	const starsRef = useRef<any>(null);
	const targetY = useRef(0);

	useFrame(() => {
		if (starsRef.current) {
			starsRef.current.rotation.y += 0.000001;
			starsRef.current.rotation.x += 0.000001;

			const desiredY = scrollY * 0.0125;
			targetY.current = THREE.MathUtils.lerp(
				targetY.current,
				desiredY,
				0.05
			);
			starsRef.current.position.y = targetY.current;
		}
	});

	return (
		<StarsProp
			ref={starsRef}
			radius={100}
			depth={50}
			count={5000}
			factor={4}
			saturation={0}
			fade
			speed={0.000001}
		/>
	);
};

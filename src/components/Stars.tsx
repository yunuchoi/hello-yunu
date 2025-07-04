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
			// 아주 느린 회전
			starsRef.current.rotation.y += 0.0000009;
			starsRef.current.rotation.x += 0.0000009;

			// 부드러운 스크롤 따라가기 (lerp 적용)
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

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars as StarsProp } from '@react-three/drei';

interface MovingStarsProps {
	scrollY: number;
}

export const Stars = ({ scrollY }: MovingStarsProps) => {
	const starsRef = useRef<any>(null);

	useFrame(() => {
		if (starsRef.current) {
			starsRef.current.rotation.y += 0.000005;
			starsRef.current.rotation.x += 0.000003;
			starsRef.current.position.y = scrollY * 0.0125;
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
			speed={0.0001}
		/>
	);
};

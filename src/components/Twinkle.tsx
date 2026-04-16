import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "../theme";

const StarLayer = ({
	count,
	speed,
	phase,
}: {
	count: number;
	speed: number;
	phase: number;
}) => {
	const ref = useRef<THREE.Points>(null);

	const geometry = useMemo(() => {
		const geo = new THREE.BufferGeometry();
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 20 + Math.random() * 60;
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);
		}
		geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		return geo;
	}, [count]);

	useFrame(({ clock }) => {
		if (ref.current) {
			const t = clock.getElapsedTime();
			(ref.current.material as THREE.PointsMaterial).opacity =
				0.2 + 0.8 * Math.abs(Math.sin(t * speed + phase));
		}
	});

	return (
		<points ref={ref} geometry={geometry}>
			<pointsMaterial
				size={0.04}
				color={colors.white}
				transparent
				opacity={0.5}
				depthWrite={false}
				sizeAttenuation
			/>
		</points>
	);
};

export const Twinkle = () => (
	<>
		<StarLayer count={60} speed={0.6} phase={0} />
		<StarLayer count={60} speed={0.4} phase={2.1} />
		<StarLayer count={60} speed={0.8} phase={4.2} />
		<StarLayer count={60} speed={0.5} phase={1.1} />
	</>
);

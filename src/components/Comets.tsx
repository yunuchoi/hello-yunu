import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

function randomDirection(): THREE.Vector3 {
	const angle = Math.random() * Math.PI * 2;
	return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize();
}

export const Comets = () => {
	const cometRef = useRef<THREE.Mesh>(null);
	const tailRef = useRef<THREE.Mesh>(null);

	const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(-5, 0, 0));
	const directionRef = useRef<THREE.Vector3>(randomDirection());

	const [isWaiting, setIsWaiting] = useState(false);

	const tailLength = 1.5;
	const cometRadius = 0.01;

	const resetComet = () => {
		const startX = Math.random() < 0.5 ? -6 : 6;
		const startY = (Math.random() - 0.5) * 8;
		const newPos = new THREE.Vector3(startX, startY, 0);
		const newDir = randomDirection();

		positionRef.current.copy(newPos);
		directionRef.current.copy(newDir);

		if (cometRef.current) cometRef.current.position.copy(newPos);
		if (tailRef.current) tailRef.current.position.set(1000, 1000, 1000);

		console.log('!!!');
	};

	useEffect(() => {
		resetComet();
	}, []);

	useEffect(() => {
		let timeoutId: number | null = null;
		if (isWaiting) {
			timeoutId = setTimeout(() => {
				resetComet();
				setIsWaiting(false);
			}, 2000 + Math.random() * 3000);
		}
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isWaiting]);

	useFrame((_, delta) => {
		if (isWaiting) return;

		const speed = 3 + Math.random() * 2;
		const newPos = positionRef.current
			.clone()
			.add(directionRef.current.clone().multiplyScalar(speed * delta));
		positionRef.current.copy(newPos);

		if (cometRef.current) cometRef.current.position.copy(newPos);

		if (tailRef.current) {
			const tailDir = directionRef.current.clone().normalize();
			const offset = tailDir
				.clone()
				.multiplyScalar(-(tailLength / 2 + cometRadius));
			const tailPos = newPos.clone().add(offset);

			tailRef.current.position.copy(tailPos);

			const angle = Math.atan2(tailDir.y, tailDir.x);
			tailRef.current.rotation.set(0, 0, angle - Math.PI / 2 - Math.PI);
		}

		if (Math.abs(newPos.x) > 6 || Math.abs(newPos.y) > 6) {
			setIsWaiting(true);
			if (cometRef.current)
				cometRef.current.position.set(1000, 1000, 1000);
			if (tailRef.current) tailRef.current.position.set(1000, 1000, 1000);
		}
	});

	return (
		<>
			<Sphere ref={cometRef} args={[cometRadius, 16, 16]}>
				<meshBasicMaterial color="#fffacd" />
			</Sphere>
			<Cone
				ref={tailRef}
				args={[0.005, tailLength, 8]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshBasicMaterial color="#fffacd" transparent opacity={0.6} />
			</Cone>
		</>
	);
};

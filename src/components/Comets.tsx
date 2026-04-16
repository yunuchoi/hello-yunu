import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Cone } from "@react-three/drei";
import * as THREE from "three";
import { colors } from "../theme";

interface CometProps {
	initialDelay?: number;
}

export const Comets = ({ initialDelay = 0 }: CometProps) => {
	const cometRef = useRef<THREE.Mesh>(null);
	const tailRef = useRef<THREE.Mesh>(null);

	const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(-8, 3, 0));
	const directionRef = useRef<THREE.Vector3>(
		new THREE.Vector3(1, -0.8, 0).normalize()
	);
	const started = useRef(false);

	const [isWaiting, setIsWaiting] = useState(false);
	const [fade, setFade] = useState(0);
	const [fadingIn, setFadingIn] = useState(false);
	const [fadingOut, setFadingOut] = useState(false);

	const tailLength = 1.5;
	const cometRadius = 0.01;

	const FADE_IN_SPEED = 0.95;
	const FADE_OUT_SPEED = 0.95;

	const resetComet = () => {
		const fromLeft = Math.random() < 0.5;
		const startX = fromLeft ? -8 : 8;
		const startY = 1 + Math.random() * 3;
		const newPos = new THREE.Vector3(startX, startY, 0);

		// Always travel diagonally downward like a shooting star
		const xDir = fromLeft ? 1 : -1;
		const yDir = -(0.5 + Math.random() * 0.5);
		const newDir = new THREE.Vector3(xDir, yDir, 0).normalize();

		positionRef.current.copy(newPos);
		directionRef.current.copy(newDir);

		if (cometRef.current) cometRef.current.position.copy(newPos);
		if (tailRef.current) tailRef.current.position.set(1000, 1000, 1000);

		setFade(0);
		setFadingIn(true);
		setFadingOut(false);
		started.current = true;
	};

	useEffect(() => {
		const timer = window.setTimeout(resetComet, initialDelay);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		let timeoutId: number | null = null;
		if (isWaiting) {
			timeoutId = window.setTimeout(
				() => {
					resetComet();
					setIsWaiting(false);
				},
				2000 + Math.random() * 3000
			);
		}
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isWaiting]);

	useFrame((_, delta) => {
		if (!started.current || isWaiting) return;

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

		if (fadingIn && fade < 1) {
			setFade((f) => Math.min(f + delta * FADE_IN_SPEED, 1));
			if (fade >= 0.99) setFadingIn(false);
		}

		if (fadingOut && fade > 0) {
			setFade((f) => Math.max(f - delta * FADE_OUT_SPEED, 0));
		}

		if (Math.abs(newPos.x) > 9 || Math.abs(newPos.y) > 7) {
			if (!fadingOut) setFadingOut(true);
			if (fade <= 0.01) {
				setIsWaiting(true);
				if (cometRef.current)
					cometRef.current.position.set(1000, 1000, 1000);
				if (tailRef.current)
					tailRef.current.position.set(1000, 1000, 1000);
			}
		}
	});

	return (
		<>
			<Sphere ref={cometRef} args={[cometRadius, 16, 16]}>
				<meshBasicMaterial
					color={colors.comet}
					transparent
					opacity={fade}
				/>
			</Sphere>
			<Cone
				ref={tailRef}
				args={[0.005, tailLength, 8]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshBasicMaterial
					color={colors.comet}
					transparent
					opacity={fade * 0.6}
				/>
			</Cone>
		</>
	);
};

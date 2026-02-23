"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ASH_CHARS = ["•", "·", "⚹", "⁕", "⸰", "⸎", "⸪", "⌁", "⌇", "↭", "↯", "⇋", "⇌", "⇎", "⇏", "⇕", "⇖", "⇗", "⇘", "⇙", "⇚", "⇛", "⇜", "⇝", "⇞", "⇟", "⇠", "⇡", "⇢", "⇣", "⇤", "⇥", "⇦", "⇧", "⇨", "⇩", "⇪", "⇫", "⇬", "⇭", "⇮", "⇯", "⇰", "⇱", "⇲", "⇳", "⌀", "⌁", "⌂", "⌃", "⌄", "⌅", "⌆", "⌇"];
const ASH_COLORS = ["#8b0000", "#5c0000", "#330000", "#1a1a1a", "#2a2a2a", "#000000", "#4a1c1c"];

interface Particle {
	id: number;
	char: string;
	color: string;
	x: number;
	drift: number;
	size: number;
	duration: number;
	delay: number;
	rotation: number;
	blur: number;
}

export function FireAshEffect({ enabled }: { enabled: boolean }) {
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		if (!enabled) {
			setParticles([]);
			return;
		}

		const generateParticle = (id: number): Particle => {
			// Randomly decide if this particle drifts left or right
			const direction = Math.random() > 0.5 ? 1 : -1;
			
			return {
				id,
				char: ASH_CHARS[Math.floor(Math.random() * ASH_CHARS.length)],
				color: ASH_COLORS[Math.floor(Math.random() * ASH_COLORS.length)],
				x: Math.random() * 140 - 20, // start wider (-20vw to 120vw) to cover edges
				drift: (Math.random() * 40 + 20) * direction, // drift 20vw to 60vw left OR right
				size: Math.random() * 1.2 + 0.3, // rem
				duration: Math.random() * 8 + 8, // 8-16s
				delay: Math.random() * 5, // 0-5s
				rotation: Math.random() * 360,
				blur: Math.random() * 2, // 0px to 3px blur
			};
		};

		// Initial batch
		const initialParticles = Array.from({ length: 80 }, (_, i) => generateParticle(i));
		setParticles(initialParticles);

		// Continuously add new particles to replace old ones
		const interval = setInterval(() => {
			setParticles((current) => {
				const newId = Date.now() + Math.random();
				return [...current.slice(1), generateParticle(newId)];
			});
		}, 200);

		return () => clearInterval(interval);
	}, [enabled]);

	if (!enabled) return null;

	return (
		<div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
			{particles.map((p) => (
				<motion.div
					key={p.id}
					initial={{
						x: `${p.x}vw`,
						y: "-10vh",
						rotate: 0,
						opacity: 0,
					}}
					animate={{
						y: "110vh",
						x: `${p.x + p.drift}vw`, // drift heavily to the right
						rotate: p.rotation + 360,
						opacity: [0, 1, 1, 0],
					}}
					transition={{
						duration: p.duration,
						delay: p.delay,
						ease: "linear",
						repeat: Infinity,
					}}
					style={{
						position: "absolute",
						color: p.color,
						fontSize: `${p.size}rem`,
						textShadow: p.color !== "#000000" && p.color !== "#1a1a1a" ? `0 0 4px ${p.color}` : "none",
						opacity: 0.8,
						filter: `blur(${p.blur}px)`,
					}}
				>
					{p.char}
				</motion.div>
			))}
		</div>
	);
}

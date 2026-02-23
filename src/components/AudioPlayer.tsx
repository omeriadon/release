"use client";

import { useAudioPlayer } from "react-use-audio-player";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeOff, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerAudioPlayer, stopAllExcept } from "@/lib/audioRegistry";
import { FireAshEffect } from "./FireAshEffect";

export function AudioPlayer() {
	const pathname = usePathname();
	const isDrivePage = pathname === "/docs/the-drive";
	const src = isDrivePage ? "/sound/car.mp3" : "/sound/general.mp3";

	const { load, play, stop, togglePlayPause, isPlaying, isReady, isLoading } =
		useAudioPlayer();

	const stopRef = useRef<() => void>(stop);
	useEffect(() => {
		stopRef.current = stop;
	});

	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
	const [isAshEnabled, setIsAshEnabled] = useState(true);

	// Register this player in the global registry.
	useEffect(() => {
		const stableFn = () => stopRef.current();
		const unregister = registerAudioPlayer(stableFn);
		return () => {
			unregister();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Load audio on first mount and when track needs to change
	useEffect(() => {
		if (loadedSrc !== src) {
			load(src, {
				initialVolume: 1,
				loop: true,
				autoplay: isPlaying, // keep playing if already playing
			});
			setLoadedSrc(src);
		}
	}, [src]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleToggle = () => {
		if (!isPlaying) {
			stopAllExcept(stopRef.current);
		}
		togglePlayPause();
	};

	return (
		<>
			<FireAshEffect enabled={isAshEnabled} />
			<div
				style={{
					position: "fixed",
					bottom: "1.25rem",
					right: "1.25rem",
					zIndex: 50,
					display: "flex",
					alignItems: "center",
					gap: "0.7rem",
					border: "1px solid var(--color-fd-border)",
					borderRadius: "9999px",
					padding: "0.4rem 0.4rem 0.4rem 0.7rem",
					boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
					backgroundColor: "var(--color-fd-card)",
					background: "color-mix(in srgb, var(--color-fd-card) 50%, transparent)",
					backdropFilter: "blur(8px)",
				}}
			>
				<button
					onClick={() => setIsAshEnabled(!isAshEnabled)}
					aria-label="Toggle Fire Ash Effect"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "1.75rem",
						height: "1.75rem",
						borderRadius: "9999px",
						backgroundColor: isAshEnabled
							? "color-mix(in srgb, var(--color-fd-primary) 20%, transparent)"
							: "transparent",
						color: isAshEnabled ? "var(--color-fd-primary)" : "var(--color-fd-muted-primary)",
						border: "none",
						cursor: "pointer",
						flexShrink: 0,
						transition: "all 0.15s ease",
					}}
				>
					<Flame size={16} />
				</button>

				<div style={{ width: "1px", height: "1.2rem", backgroundColor: "var(--color-fd-border)" }} />

				<AnimatePresence mode="wait">
					{isPlaying ? (
					<motion.div
						key="volume-on"
						initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
						transition={{ duration: 0.2 }}
					>
						<Volume2
							size={20}
							style={{ color: "var(--color-fd-primary)", flexShrink: 0 }}
						/>
					</motion.div>
				) : (
					<motion.div
						key="volume-off"
						initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
						transition={{ duration: 0.2 }}
					>
						<VolumeOff
							size={20}
							style={{ color: "var(--color-fd-primary)", flexShrink: 0 }}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<button
				onClick={handleToggle}
				disabled={!isReady && !isLoading}
				aria-label={isPlaying ? "Pause" : "Play"}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "1.75rem",
					height: "1.75rem",
					borderRadius: "9999px",
					backgroundColor: isPlaying
						? "color-mix(in srgb, var(--color-fd-primary) 50%, transparent)"
						: "color-mix(in srgb, var(--color-fd-muted) 50%, transparent)",
					color: isPlaying ? "#fff" : "var(--color-fd-muted-primary)",
					border: "none",
					cursor: "pointer",
					flexShrink: 0,
					transition: "all 0.15s ease",
				}}
			>
				{isPlaying ? (
					<Pause
						size={12}
						fill="white"
						stroke="white"
					/>
				) : (
					<Play
						size={12}
						fill="var(--color-fd-primary)"
						stroke="var(--color-fd-primary)"
					/>
				)}
			</button>
			</div>
		</>
	);
}

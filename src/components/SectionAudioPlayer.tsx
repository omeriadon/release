"use client";

import { useAudioPlayer } from "react-use-audio-player";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Play, Pause, Volume2, VolumeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerAudioPlayer, stopAllExcept } from "@/lib/audioRegistry";

export interface AudioPlayerHandle {
	stop: () => void;
}

// ---------------------------------------------------------------------------
// SectionAudioPlayer
// ---------------------------------------------------------------------------
export const SectionAudioPlayer = forwardRef<AudioPlayerHandle, { src: string }>(
function SectionAudioPlayer({ src }, ref) {
	const { load, play, stop, isPlaying, isReady, isLoading } =
		useAudioPlayer();

	// Keep a stable ref to the stop function so registry entry never stales.
	const stopRef = useRef<() => void>(stop);
	useEffect(() => {
		stopRef.current = stop;
	});

	useEffect(() => {
		load(src, { initialVolume: 0.8 });
		const stableFn = () => stopRef.current();
		const unregister = registerAudioPlayer(stableFn);
		return () => {
			unregister();
			stopRef.current();
		};
	}, [src]); // eslint-disable-line react-hooks/exhaustive-deps

	useImperativeHandle(ref, () => ({ stop: () => stopRef.current() }));

	const handleClick = () => {
		if (!isPlaying) {
			stopAllExcept(stopRef.current);
			play();
		} else {
			stop();
		}
	};

	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: "0.7rem",
				border: "1px solid var(--color-fd-border)",
				borderRadius: "9999px",
				padding: "0.4rem 0.4rem 0.4rem 0.7rem",
				boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
				backgroundColor: "var(--color-fd-card)",
				background:
					"color-mix(in srgb, var(--color-fd-card) 50%, transparent)",
				backdropFilter: "blur(8px)",
				flexShrink: 0,
			}}
		>
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
				onClick={handleClick}
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
					<Pause size={12} fill="white" stroke="white" />
				) : (
					<Play
						size={12}
						fill="var(--color-fd-primary)"
						stroke="var(--color-fd-primary)"
					/>
				)}
			</button>
		</div>
	);
});

SectionAudioPlayer.displayName = "SectionAudioPlayer";

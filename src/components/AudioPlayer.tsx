"use client";

import { useAudioPlayer } from "react-use-audio-player";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export function AudioPlayer() {
	const pathname = usePathname();
	const isDrivePage = pathname === "/docs/the-drive";
	const src = isDrivePage ? "/sound/car.mp3" : "/sound/general.mp3";

	const { load, togglePlayPause, isPlaying, isReady, isLoading } =
		useAudioPlayer();

	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

	// Load audio on first mount and when track needs to change
	useEffect(() => {
		if (loadedSrc !== src) {
			load(src, {
				initialVolume: 0.6,
				loop: true,
				autoplay: isPlaying, // keep playing if already playing
			});
			setLoadedSrc(src);
		}
	}, [src]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
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
			<Volume2
				size={20}
				style={{ color: "var(--color-fd-primary)", flexShrink: 0 }}
			/>
			<button
				onClick={togglePlayPause}
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
}

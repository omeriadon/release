"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { SectionAudioPlayer, type AudioPlayerHandle } from "@/components/SectionAudioPlayer";
import { motion, AnimatePresence } from "framer-motion";

const RELEASES = [
	{
		title: "Release from Tension",
		description: `A man returning from imprisonment would be the first impression of the reader.
        Bull had served “chapters” in detention in the past, so it is the implied
        “release” that happened before the story’s beginning.

        The word “guest” in quotation marks is ironic when paired with imprisonment.`,
	},
	{
		title: "Release from Prison",
		description: `The next phase is the spiritual release for Bull and Danny, where Bull’s remains are scattered back into Wakka Wakka land.  The country welcomes back Bull with warmth that a cold system couldn’t match.
        
		"Finally at rest in playful communion with the country."`,
	},
	{
		title: "Release from Life",
		description: `At first, the central fact of Bull’s passing is hidden, until suspicions are revealed after Danny talks to Bull’s ashes. The reader’s release from uncertainty is cathartic. 

        "He let the ash sift before him into the night."`,
	},
];

const ReleaseCard = ({
	title,
	description,
	hovered,
	onEnter,
	onLeave,
}: (typeof RELEASES)[0] & {
	hovered: boolean;
	onEnter: () => void;
	onLeave: () => void;
}) => (
	<div
		onMouseEnter={onEnter}
		onMouseLeave={onLeave}
		className={cn(
			"flex-1 basis-55 rounded-[20px] p-5 border cursor-default transition-colors duration-180",
			hovered
				? "bg-fd-popover border-fd-accent"
				: "bg-fd-card border-fd-border",
		)}
	>
		<h3 className="text-fd-foreground text-[0.95rem] font-semibold m-0 mt-0 mb-[0.6rem]">
			{title}
		</h3>
		<p className="text-fd-muted-foreground text-[0.82rem] leading-[1.65] m-0">
			{description}
		</p>
	</div>
);

export const Title = (props: {
	className?: string;
}) => {
	const [open, setOpen] = useState(false);
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);
	const audioRef = useRef<AudioPlayerHandle>(null);

	const handleClose = () => {
		audioRef.current?.stop();
		setOpen(false);
	};

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};
		if (open) {
			document.addEventListener("keydown", onKey);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [open]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{/* Clickable title */}
			<span
				className={cn(
					"border-[1.7px] border-fd-primary/60 text-fd-primary",
					"hover:border-transparent hover:bg-fd-primary/60 hover:text-white",
					"py-2 px-[0.6rem] rounded-[20px] cursor-pointer text-5xl font-bold inline-block",
					"transition-all duration-200 select-none",
					props.className,
				)}
				onClick={() => setOpen(true)}
			>
				Release
			</span>

			<AnimatePresence>
				{open && (
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						onClick={handleClose}
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 9998,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							padding: "1.5rem",
							gap: "0.75rem",
							backgroundColor: "rgba(0,0,0,0.45)",
							backdropFilter: "blur(10px)",
						}}
					>
						{/* Floating audio button – detached above modal, aligned right */}
						<div
							className="max-w-225 w-full flex justify-end"
							onClick={(e) => e.stopPropagation()}
						>
							<SectionAudioPlayer
								ref={audioRef}
								src="/sound/diobett/three%20meanings.m4a"
							/>
						</div>

						{/* Modal panel */}
						<motion.div
							key="panel"
							initial={{ scale: 0.96, opacity: 0, filter: "blur(10px)" }}
							animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
							exit={{ scale: 0.96, opacity: 0, filter: "blur(6px)" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							onClick={(e) => e.stopPropagation()}
							className="bg-fd-popover border border-fd-border rounded-[40px] p-6 max-w-225 w-full z-9999 shadow-[0_24px_50px_rgba(0,0,0,0.22)]"
						>
							{/* Header */}
							<div className="mb-4">
								<div className="flex items-start gap-2">
									<h2
										className="text-fd-foreground text-[3rem] font-bold m-0 new-york"
										style={{ lineHeight: 1 }}
									>
										"Release"
									</h2>
									<button
										onClick={handleClose}
										className="ml-auto shrink-0 bg-transparent border-none text-fd-muted-foreground hover:text-fd-primary cursor-pointer text-[1.6rem] leading-none rounded-[10px] transition-all duration-150 hover:scale-110"
									>
										✕
									</button>
								</div>
								<p className="text-fd-muted-foreground text-[0.78rem] mt-1 mb-0 mx-0">
									Polysemic - multiple meanings distinguished by context
								</p>
							</div>

							{/* Three cards */}
							<div className="flex gap-3 flex-wrap">
								{RELEASES.map((r, i) => (
									<ReleaseCard
										key={r.title}
										{...r}
										hovered={hoveredCard === i}
										onEnter={() => setHoveredCard(i)}
										onLeave={() => setHoveredCard(null)}
									/>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

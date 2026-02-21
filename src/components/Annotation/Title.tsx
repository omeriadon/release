"use client";
import { useState, useEffect } from "react";

const RELEASES = [
	{
		title: "Release from Tension",
		description:
			"The work serves as an emotional catharsis — an unburdening of grief, guilt, and the weight of a life half-lived. Watson channels sorrow into prose, allowing the reader to exhale alongside Danny as he scatters the last evidence of his cousin into the night.",
	},
	{
		title: "Release from Prison",
		description: `Bull's literal release from prison frames the entire journey home. Yet freedom proves hollow — the prisons of addiction, poverty, and systemic racism followed him beyond the bars, leaving him with nothing but a beige paper bag stamped "PERSONAL PROPERTY."`,
	},
	{
		title: "Release from Life",
		description:
			"The final, most devastating meaning: Bull's release from life itself. His ashes scattered on ancestral Wakka Wakka country represent the ultimate homecoming — a return to the land that the living world systematically denied him.",
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
		style={{
			flex: "1 1 220px",
			background: hovered ? "var(--color-fd-accent)" : "var(--color-fd-card)",
			border: `1px solid ${hovered ? "var(--color-fd-ring)" : "var(--color-fd-border)"}`,
			borderRadius: "12px",
			padding: "1.25rem",
			transition: "background 0.18s, border-color 0.18s",
			cursor: "default",
		}}
	>
		<h3
			style={{
				color: "var(--color-fd-foreground)",
				fontSize: "0.95rem",
				fontWeight: 600,
				margin: "0 0 0.6rem 0",
			}}
		>
			{title}
		</h3>
		<p
			style={{
				color: "var(--color-fd-muted-foreground)",
				fontSize: "0.82rem",
				lineHeight: 1.65,
				margin: 0,
			}}
		>
			{description}
		</p>
	</div>
);

export const Title = (props: {
	className?: string;
	title: string;
	annotation: string;
}) => {
	const [open, setOpen] = useState(false);
	const [titleHovered, setTitleHovered] = useState(false);
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
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
	}, [open]);

	return (
		<>
			{/* Clickable title */}
			<span
				className={props.className ?? ""}
				onClick={() => setOpen(true)}
				onMouseEnter={() => setTitleHovered(true)}
				onMouseLeave={() => setTitleHovered(false)}
				style={{
					border: `1.7px solid ${titleHovered ? "transparent" : "rgba(16, 179, 171, 0.6)"}`,
					backgroundColor: titleHovered ? "rgba(16, 179, 171, 0.6)" : "transparent",
					color: titleHovered ? "white" : "var(--color-fd-primary)",
					padding: "0.8rem 0.6rem",
					borderRadius: "15px",
					cursor: "pointer",
					fontSize: "3rem",
					fontWeight: "bold",
					display: "inline-block",
					transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
					userSelect: "none",
				}}
			>
				{props.title}
			</span>

			{/* Backdrop */}
			<div
				onClick={() => setOpen(false)}
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 9998,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "1.5rem",
					backgroundColor: "rgba(0,0,0,0.45)",
					backdropFilter: open ? "blur(10px)" : "blur(0px)",
					WebkitBackdropFilter: open ? "blur(10px)" : "blur(0px)",
					opacity: open ? 1 : 0,
					pointerEvents: open ? "auto" : "none",
					transition: "opacity 0.28s ease, backdrop-filter 0.28s ease",
				}}
			>
				{/* Modal panel */}
				<div
					onClick={(e) => e.stopPropagation()}
					style={{
						background: "var(--color-fd-popover)",
						border: "1px solid var(--color-fd-border)",
						borderRadius: "16px",
						padding: "1.75rem",
						maxWidth: "900px",
						width: "100%",
						boxShadow: "0 24px 50px rgba(0,0,0,0.22)",
						transform: open ? "scale(1)" : "scale(0.96)",
						opacity: open ? 1 : 0,
						filter: open ? "blur(0px)" : "blur(6px)",
						transition: "transform 0.28s ease, opacity 0.28s ease, filter 0.28s ease",
						zIndex: 9999,
					}}
				>
					{/* Header */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "1.25rem",
						}}
					>
						<div>
							<h2
								style={{
									color: "var(--color-fd-foreground)",
									fontSize: "1.35rem",
									fontWeight: 700,
									margin: 0,
									fontFamily: "NewYork",
								}}
							>
								Release
							</h2>
							<p
								style={{
									color: "var(--color-fd-muted-foreground)",
									fontSize: "0.78rem",
									margin: "0.25rem 0 0 0",
								}}
							>
								Polysemic — multiple meanings distinguished by context
							</p>
						</div>
						<button
							onClick={() => setOpen(false)}
							onMouseEnter={(e) => {
								(e.currentTarget as HTMLButtonElement).style.color =
									"var(--color-fd-foreground)";
							}}
							onMouseLeave={(e) => {
								(e.currentTarget as HTMLButtonElement).style.color =
									"var(--color-fd-muted-foreground)";
							}}
							style={{
								background: "transparent",
								border: "none",
								color: "var(--color-fd-muted-foreground)",
								cursor: "pointer",
								fontSize: "1.1rem",
								padding: "0.2rem 0.4rem",
								lineHeight: 1,
								borderRadius: "6px",
								transition: "color 0.15s",
							}}
						>
							✕
						</button>
					</div>

					{/* Three cards */}
					<div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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
				</div>
			</div>
		</>
	);
};

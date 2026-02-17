"use client";

export const Annotation = (
	props: React.PropsWithChildren<{ className?: string; annotation: string }>,
) => (
	<span
		{...props}
		style={{
			border: "1.7px solid rgba(16, 179, 171, 0.6)",
			padding: "0.1rem 0.2rem",
			borderRadius: "5px",
			position: "relative",
			cursor: "help",
			transition: "background-color 0.2s",
		}}
		onMouseEnter={(e) => {
			const tooltip = e.currentTarget.querySelector(".tooltip") as HTMLElement;
			if (tooltip) tooltip.style.opacity = "1";
			e.currentTarget.style.border = "1.7px solid transparent";
			e.currentTarget.style.backgroundColor = "rgba(16, 179, 171, 0.6)";
		}}
		onMouseLeave={(e) => {
			const tooltip = e.currentTarget.querySelector(".tooltip") as HTMLElement;
			if (tooltip) tooltip.style.opacity = "0";
			e.currentTarget.style.backgroundColor = "transparent";
			e.currentTarget.style.border = "1.7px solid rgba(16, 179, 171, 0.6)";
		}}
	>
		{props.children}
		<span
			className="tooltip"
			style={{
				position: "absolute",
				bottom: "calc(100% + 8px)",
				left: "50%",
				transform: "translateX(-50%)",
				backgroundColor: "rgba(0, 0, 0, 0.2)",
				backdropFilter: "blur(20px)",
				color: "white",
				padding: "0.3rem 0.75rem 0.2rem 0.75rem",
				borderRadius: "10px",
				fontSize: "0.875rem",
				whiteSpace: "pre-wrap",
				maxWidth: "min(300px, 90vw)",
				width: "max-content",
				opacity: 0,
				pointerEvents: "none",
				transition: "opacity 0.2s",
				zIndex: 1000,
			}}
		>
			{props.annotation}
		</span>
	</span>
);

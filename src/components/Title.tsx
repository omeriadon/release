"use client";

export const Title = (props: {
	className?: string;
	title: string;
	annotation: string;
}) => (
	<span
		className={`${props.className} text-fd-primary`}
		style={{
			border: "1.7px solid rgba(16, 179, 171, 0.6)",
			padding: "0.8rem 0.6rem",
			borderRadius: "15px",
			position: "relative",
			cursor: "help",
			transition: "background-color 0.2s, color 0.2s",
			fontSize: "3rem",
			fontWeight: "bold",
			display: "inline-block",
		}}
		onMouseEnter={(e) => {
			const tooltip = e.currentTarget.querySelector(".tooltip") as HTMLElement;
			if (tooltip) {
				const rect = e.currentTarget.getBoundingClientRect();
				const isTopHalf = rect.top < window.innerHeight / 2;

				if (isTopHalf) {
					tooltip.style.bottom = "auto";
					tooltip.style.top = "calc(100% + 8px)";
				} else {
					tooltip.style.top = "auto";
					tooltip.style.bottom = "calc(100% + 8px)";
				}

				tooltip.style.opacity = "1";
			}
			e.currentTarget.style.border = "1.7px solid transparent";
			e.currentTarget.style.backgroundColor = "rgba(16, 179, 171, 0.6)";
			e.currentTarget.style.color = "white";
		}}
		onMouseLeave={(e) => {
			const tooltip = e.currentTarget.querySelector(".tooltip") as HTMLElement;
			if (tooltip) tooltip.style.opacity = "0";
			e.currentTarget.style.backgroundColor = "transparent";
			e.currentTarget.style.border = "1.7px solid rgba(16, 179, 171, 0.6)";
			e.currentTarget.style.color = "";
		}}
	>
		{props.title}
		<span
			className="tooltip text-fd-foreground bg-fd-background/20"
			style={{
				position: "absolute",
				bottom: "calc(100% + 8px)",
				left: "50%",
				transform: "translateX(-50%)",
				backdropFilter: "blur(20px)",
				padding: "0.3rem 0.75rem 0.2rem 0.75rem",
				borderRadius: "10px",
				fontSize: "0.875rem",
				whiteSpace: "pre-wrap",
				width: "400px",
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

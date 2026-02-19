"use client";

export const Annotation = (
	props: React.PropsWithChildren<{
		className?: string;
		annotation: string;
		author?: boolean;
	}>,
) => (
	<span
		{...props}
		style={{
			border: "1.7px solid rgba(16, 179, 171, 0.6)",
			padding: "0.1rem 0.2rem",
			borderRadius: props.author ? "10px" : "5px",
			position: "relative",
			cursor: "help",
			transition: "background-color 0.2s",
			...(props.author && {
				marginTop: "0.75rem",
				paddingInline: "0.5rem",
				display: "inline-block",
			}),
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

				const isLeftHalf = rect.right < window.innerWidth / 2;
				tooltip.style.left = "20%";
				tooltip.style.transform = isLeftHalf
					? "translateX(0%)"
					: "translateX(-65%)";

				tooltip.style.opacity = "1";
			}
			e.currentTarget.style.border = "1.7px solid transparent";
			e.currentTarget.style.backgroundColor = "rgba(16, 179, 171, 0.6)";
			if (props.author) e.currentTarget.style.color = "white";
		}}
		onMouseLeave={(e) => {
			const tooltip = e.currentTarget.querySelector(".tooltip") as HTMLElement;
			if (tooltip) {
				tooltip.style.opacity = "0";
				tooltip.style.transform = "translateX(-65%)";
			}
			e.currentTarget.style.backgroundColor = "transparent";
			e.currentTarget.style.border = "1.7px solid rgba(16, 179, 171, 0.6)";
			if (props.author) e.currentTarget.style.color = "";
		}}
	>
		<span className={props.author ? "text-fd-foreground" : undefined}>
			{props.children}
		</span>
		<span
			className="tooltip text-fd-foreground bg-fd-muted"
			style={{
				position: "absolute",
				bottom: "calc(100% + 8px)",
				left: "20%",
				transform: "translateX(-65%)",
				backdropFilter: "blur(15px)",
				padding: "0.3rem 0.75rem 0.2rem 0.75rem",
				borderRadius: "10px",
				whiteSpace: "pre-wrap",
				minWidth: "50px",
				width: "max-content",
				maxWidth: "400px",
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

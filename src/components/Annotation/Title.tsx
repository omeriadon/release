"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

const RELEASES = [
	{
		title: "Release from Tension",
		description:
			"Esse qui id minim quis voluptate id cillum. Duis esse deserunt ipsum sit ex. Enim deserunt eu irure ipsum nostrud laborum est ullamco voluptate. Aliqua tempor ea anim ullamco commodo occaecat do. Non elit magna esse eiusmod sunt. Labore adipisicing mollit incididunt magna labore ullamco enim proident. Deserunt cupidatat esse officia enim amet adipisicing esse mollit quis in.",
	},
	{
		title: "Release from Prison",
		description: `Tempor cupidatat velit commodo labore veniam pariatur fugiat. Pariatur reprehenderit velit ipsum qui culpa enim ad nisi magna. Duis sint magna ea nisi aliqua aute esse veniam tempor nisi est magna velit. Dolor aute deserunt id enim cillum duis Lorem proident anim ipsum nulla aliquip. Anim elit deserunt pariatur minim officia enim incididunt cillum. Irure consequat duis ea anim occaecat do nostrud eiusmod nisi labore. Non aliquip sit cillum deserunt adipisicing adipisicing sunt.`,
	},
	{
		title: "Release from Life",
		description:
			"Officia officia ullamco nulla officia adipisicing deserunt labore laborum adipisicing. Adipisicing qui mollit officia consectetur laboris amet fugiat laborum ea duis incididunt. Id do consequat nostrud mollit qui dolor ut Lorem in quis sit nostrud tempor do. Cupidatat amet officia ullamco. Nisi labore fugiat reprehenderit et laborum ullamco dolor pariatur aliquip aliquip voluptate velit.",
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
		<h3 className="text-fd-foreground text-[0.95rem] font-semibold m-0 mb-[0.6rem]">
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
				className={cn(
					"border-[1.7px] border-fd-primary/60 text-fd-primary",
					"hover:border-transparent hover:bg-fd-primary/60 hover:text-white",
					"py-[0.8rem] px-[0.6rem] rounded-[15px] cursor-pointer text-5xl font-bold inline-block",
					"transition-all duration-200 select-none",
					props.className,
				)}
				onClick={() => setOpen(true)}
			>
				Release
			</span>

			{/* Backdrop */}
			<div
				onClick={() => setOpen(false)}
				className={cn(
				"fixed inset-0 z-9998 flex items-center justify-center p-6",
				"bg-black/45 transition-[opacity,backdrop-filter] duration-280 ease-in-out",
					open
						? "opacity-100 pointer-events-auto backdrop-blur-[10px]"
						: "opacity-0 pointer-events-none backdrop-blur-none",
				)}
			>
				{/* Modal panel */}
				<div
					onClick={(e) => e.stopPropagation()}
					className={cn(
						"bg-fd-popover border border-fd-border rounded-[40px] p-7 max-w-225 w-full z-9999",
						"shadow-[0_24px_50px_rgba(0,0,0,0.22)]",
						"transition-[transform,opacity,filter] duration-280 ease-in-out",
						open
							? "scale-100 opacity-100 blur-none"
							: "scale-[0.96] opacity-0 blur-[6px]",
					)}
				>
					{/* Header */}
					<div className="flex justify-between items-start mb-5">
						<div>
							<h2 className="text-fd-foreground text-[1.35rem] font-bold m-0 new-york">
								"Release"
							</h2>
							<p className="text-fd-muted-foreground text-[0.78rem] mt-1 mb-0 mx-0">
								Polysemic - multiple meanings distinguished by context
							</p>
						</div>
						<button
							onClick={() => setOpen(false)}
							className="bg-transparent border-none text-fd-muted-foreground hover:text-fd-foreground cursor-pointer text-[1.1rem] py-[0.2rem] px-[0.4rem] leading-none rounded-[10px] transition-all duration-150 hover:scale-110"
						>
							✕
						</button>
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
				</div>
			</div>
		</>
	);
};

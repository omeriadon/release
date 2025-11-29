import Link, { type LinkProps } from "next/link";
import { Baby, Power, PersonStanding, Replace } from "lucide-react";

export default function DocsPage() {
	return (
		<main className="flex flex-col justify-center items-center px-4 py-16 text-center z-2">
			<h1 className="mb-8 text-3xl font-semibold md:text-4xl text-fd-primary">
				Getting Started
			</h1>
			<p className="text-fd-muted-foreground mb-8">
				The different sections of the immune system.
				<br />
				If you don't know where to start, begin at{" "}
				<Link
					href="/docs/introduction"
					className="text-fd-primary underline underline-offset-2 decoration-2 hover:text-fd-primary/70 transition"
				>
					Introduction
				</Link>
				.
			</p>

			<div className="mt-8 grid gap-6 text-start w-full md:w-[90vh]">
				{[
					{
						name: "Introduction",
						description: "About, structure, how to navigate",
						icon: <Power className="size-full" />,
						href: "/docs/introduction",
					},
					{
						name: "Adaptive Immunity",
						description: "B cells, T cells, antibodies, antigen presentation.",
						icon: <Replace className="size-full" />,
						href: "/docs/adaptive-immunity",
					},
					{
						name: "Innate Immunity",
						description: "Barriers, phagocytes, NK cells, complement system.",
						icon: <Baby className="size-full" />,
						href: "/docs/innate-immunity",
					},
					{
						name: "Immune Organs & Tissues",
						description: "Bone marrow, thymus, spleen, lymph nodes.",
						icon: <PersonStanding className="size-full" />,
						href: "/docs/immune-organs-tissues",
					},
				].map((item) => {
					return (
						<Item key={item.name} href={item.href}>
							<div className={`flex gap-3 items-center mb-1`}>
								<Icon href={item.href}>{item.icon}</Icon>
								<h2 className="mb-2 font-medium text-xl">{item.name}</h2>
							</div>
							<p className="text-sm text-fd-muted-foreground">
								{item.description}
							</p>
						</Item>
					);
				})}
			</div>
		</main>
	);
}

function Icon({ href, children }: { href: string; children: React.ReactNode }) {
	const lastSlug = href.split("/").filter(Boolean).pop();
	const colorVar = `--${lastSlug}-color`;
	const color = `var(${colorVar})`;
	return (
		<div
			className="mb-2 size-8 [&_svg]:size-full rounded-lg text-tab-color bg-(--tab-color)/10 border p-1"
			style={
				{
					"--tab-color": color,
				} as object
			}
		>
			{children}
		</div>
	);
}

interface ItemProps extends LinkProps {
	href: string;
	children: React.ReactNode;
}

function Item({ href, children, ...rest }: ItemProps) {
	const lastSlug = href.split("/").filter(Boolean).pop();
	const color = `var(--${lastSlug}-color, var(--color-fd-foreground))`;

	return (
		<Link
			href={href}
			{...rest}
			className={`bg-fd-card rounded-3xl border p-4 shadow-lg hover:bg-fd-popover transition-all`}
			style={{ color }}
		>
			{children}
		</Link>
	);
}

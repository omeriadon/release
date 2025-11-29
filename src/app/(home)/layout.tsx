import { HomeLayout } from "fumadocs-ui/layouts/home";
import { BaseLayoutProps } from "fumadocs-ui/layouts/links";
import { createElement } from "react";
import { icons, ShieldPlus } from "lucide-react";

const bookIcon = createElement(icons["Book"]);

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<>
					<ShieldPlus
						className="size-9 stroke-[2.5] text-fd-background"
						fill="var(--color-fd-primary)"
					/>
					<span className="font-bold text-2xl text-fd-primary">Immune</span>
				</>
			),
		},
	};
}

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<HomeLayout
			{...baseOptions()}
			links={[
				{
					text: "Docs",
					icon: bookIcon,
					url: "/docs",
				},
			]}
		>
			{children}
		</HomeLayout>
	);
}

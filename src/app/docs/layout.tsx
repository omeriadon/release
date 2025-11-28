import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { createElement } from "react";
import { icons, ShieldPlus } from "lucide-react";
import { source } from "@/lib/source";


const reportIcon = createElement(icons["MessageCircle"]);

export default function Layout({ children }: LayoutProps<"/docs">) {
	const base = baseOptions();

	return (
		<DocsLayout
			tree={source.pageTree}
			{...base}
			githubUrl="https://github.com/omeriadon/immune"
			links={[
				{
					type: "icon",
					text: "Report Issue",
					icon: reportIcon,
					url: "https://github.com/omeriadon/immune/issues/new",
				},
			]}
			nav={{
				...base.nav,
				enabled: true,
				transparentMode: "always",
				title: (
					<>
						<ShieldPlus className="size-9 text-fd-background stroke-[2.5] fill-fd-primary" />
						<span className="font-medium text-2xl text-fd-primary">Immune</span>
					</>
				),
				
			}}
			sidebar={{
				tabs: {
					transform(option, node) {
						const meta = source.getNodeMeta(node);
						if (!meta || !node.icon) return option;

						const color = `var(--${meta.path.split("/")[0]}-color, var(--color-fd-foreground))`;

						return {
							...option,
							icon: (
								<div
									className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
									style={
										{
											"--tab-color": color,
										} as object
									}
								>
									{node.icon}
								</div>
							),
						};
					},
				},
			}}
		>
			{children}
		</DocsLayout>
	);
}

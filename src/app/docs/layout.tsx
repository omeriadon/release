import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { createElement } from "react";
import { icons, ShieldPlus } from "lucide-react";
import { source } from "@/lib/source";

const reportIcon = createElement(icons["MessageCircle"]);
const powerIcon = createElement(icons["Power"]);

export default function Layout({ children }: LayoutProps<"/docs">) {
	const base = baseOptions();

	return (
		<DocsLayout
			tree={source.pageTree}
			{...base}		
				tabMode="auto"
				nav={{
					...base.nav,
					enabled: true,
					title: (
						<>
							<ShieldPlus
								className="size-9 stroke-[2.5] text-fd-background"
								fill="var(--color-fd-primary)"
							/>
							<span className="font-bold text-2xl text-fd-primary">Immune</span>
						</>
					),
				}}
			sidebar={{
				tabs: {
					transform(option, node) {
						const meta = source.getNodeMeta(node);
						if (!meta || !node.icon) return option;

						return {
							...option,
							icon: (
								<div className="[&_svg]:size-full rounded-lg size-full text-fd-primary max-md:bg-fd-primary/10 max-md:border max-md:p-1.5">
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

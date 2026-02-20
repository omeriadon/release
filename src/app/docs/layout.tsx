import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { BookText } from "lucide-react";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
	const base = baseOptions();

	return (
		<DocsLayout
			tree={source.getPageTree()}
			{...base}
			nav={{
				...base.nav,
				enabled: true,
				title: (
					<>
						<BookText
							className="size-9 stroke-[2.5]"
							// fill="var(--color-fd-primary)"
							stroke="var(--color-fd-primary)"
						/>
						<span className="font-bold text-2xl text-fd-primary">Release</span>
					</>
				),
			}}
		>
			{children}
		</DocsLayout>
	);
}

import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { createElement } from 'react';
import { icons } from 'lucide-react';

const reportIcon = createElement(icons['MessageCircle']);

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
					url: "https://github.com/omeriadon/immune/issues/new"
				}
			]}
			nav={{
				...base.nav,
				enabled: true,
				transparentMode: "always",
				title: "Immune",
			}}
		>
			{children}
		</DocsLayout>
	);
}

export const dynamic = "force-dynamic";
import { source } from "@/lib/source";
import { getLLMText } from "@/lib/get-llm-text";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ChevronRight } from "lucide-react";


function getFolderName(slugSegment: string | number): string {
	const tree = source.pageTree;

	const segment = String(slugSegment);

	for (const node of tree.children) {
		if (node.type === "folder") {
			const hasMatchingChild = node.children.some((child) => {
				if (child.type === "page") {
					return child.url.includes(segment);
				}
				return false;
			});
			if (hasMatchingChild && typeof node.name === "string") {
				return node.name;
			}
		}
	}
	return segment.replace(/-/g, " ");
}

export default async function Page(props: PageProps<"/docs/[...slug]">) {
	const { slug } = await props.params;

	const page = slug?.length ? source.getPage(slug) : source.getPage([""]);

	if (!page) notFound();

	const markdownContent = await getLLMText(page);

	const MDX = page.data.body;

	const breadcrumbArray: Array<{
		type: "text" | "separator";
		value: string;
		slugIndex: number;
	}> = [{ type: "text", value: "Docs", slugIndex: -1 }];

	if (slug?.length) {
		slug.forEach((segment, i) => {
			breadcrumbArray.push({
				type: "separator",
				value: "$slash",
				slugIndex: -1,
			});
			const folderTitle = getFolderName(segment);
			breadcrumbArray.push({ type: "text", value: folderTitle, slugIndex: i });
		});
	}

	return (
		<DocsPage
			toc={page.data.toc}
			tableOfContent={{
				single: false,
				style: "clerk",
			}}
			
		>
			<DocsTitle className="text-fd-primary">{page.data.title}</DocsTitle>


			<DocsDescription>{page.data.description}</DocsDescription>

			<DocsBody>
				<MDX
					components={getMDXComponents({
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateMetadata(
	props: PageProps<"/docs/[...slug]">,
): Promise<Metadata> {
	const { slug } = await props.params;

	// try direct page
	let page = slug?.length ? source.getPage(slug) : source.getPage(["index"]);

	// if this is a folder and not a page, look for its index.md(x)
	if (!page && slug?.length) {
		const withIndex = [...slug, "index"];
		page = source.getPage(withIndex);
	}

	if (!page) notFound();

	const title = page.data.title ?? "Inidex";

	return {
		title: `${title} → Immune`,
		description: page.data.description ?? "",
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon.ico",
			apple: "/favicon.ico",
		},
	};
}

export async function generateStaticParams() {
	return source.generateParams();
}

export const dynamic = "force-dynamic";
import { source } from "@/lib/source";
import { getLLMText } from "@/lib/get-llm-text";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
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
import { getGithubLastEdit } from "fumadocs-core/content/github";
import { CalendarClock, ChevronRight } from "lucide-react";

export async function getLastModifiedTime(path: string): Promise<string> {
	if (process.env.NODE_ENV === "development") {
		return "Updated: Dev placeholder"; // <- must return
	}

	const time = await getGithubLastEdit({
		owner: "omeriadon",
		repo: "immune",
		path: `content/docs/${path}`,
		token: process.env.GIT_TOKEN,
	});

	if (!time) return "Unknown";
	return time instanceof Date
		? "Updated: " + time.toLocaleDateString("en-GB", { dateStyle: "long" })
		: String("Updated: " + time);
}

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
				single: true,
				style: "normal",
			}}
			breadcrumb={{
				enabled: true,
				component: (
					<nav className="flex items-center gap-2">
						{breadcrumbArray.map((item, index) => {
							if (item.type === "separator") {
								return (
									<ChevronRight
										key={`separator-${index}`}
										className="size-4 text-fd-muted-foreground"
									/>
								);
							}

							const isLast = index === breadcrumbArray.length - 1;
							const href =
								item.slugIndex === -1
									? "/docs"
									: `/docs/${slug.slice(0, item.slugIndex + 1).join("/")}`;

							return (
								<a
									key={`${item.value}-${index}`}
									href={href}
									className={
										isLast
											? "text-sm font-medium text-fd-primary capitalize"
											: "text-sm text-fd-muted-foreground hover:text-fd-foreground capitalize"
									}
								>
									{item.value}
								</a>
							);
						})}
					</nav>
				),
			}}
		>
			<DocsTitle className="text-fd-primary">{page.data.title}</DocsTitle>

			<div className="flex gap-3 items-center">
				<div className="flex gap-3 items-center">
					<LLMCopyButton markdownUrl={`${page.url}.mdx`} />

					<ViewOptions
						markdownUrl={`${page.url}.mdx`}
						githubUrl={`https://github.com/omeriadon/immune/tree/main/content/docs/${page.path}`}
						markdownContent={markdownContent}
					/>
				</div>

				<div className="inline-flex items-center justify-center gap-2 rounded-md border bg-fd-secondary px-2 py-1.5 text-xs font-medium text-fd-secondary-foreground">
					<CalendarClock className="size-3.5 text-fd-muted-foreground" />
					<p>{await getLastModifiedTime(page.path)}</p>
				</div>
			</div>

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

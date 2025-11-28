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
import { CalendarClock } from "lucide-react";

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

export default async function Page(props: PageProps<"/docs/[...slug]">) {
	const { slug } = await props.params;

	const page = slug?.length ? source.getPage(slug) : source.getPage([""]);

	if (!page) notFound();

	const markdownContent = await getLLMText(page);

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			breadcrumb={{ enabled: true, includePage: true, includeRoot: true }}
		>
			<DocsTitle>{page.data.title}</DocsTitle>

			<div className="flex gap-3 items-center">
				<div className="flex gap-3 items-center">
					<LLMCopyButton markdownUrl={`${page.url}.mdx`} />

					<ViewOptions
						markdownUrl={`${page.url}.mdx`}
						githubUrl={`https://github.com/omeriadon/immune/tree/main/content/docs/${page.path}`}
						markdownContent={markdownContent}
					/>
				</div>

				<div className="flex items-center opacity-50 gap-1 ml-auto text-xs">
					<CalendarClock size={16} />
					<p>{await getLastModifiedTime(page.path)}</p>
				</div>
			</div>

			<DocsDescription>{page.data.description}</DocsDescription>
			<hr className="border-t border-fd-accent w-full" />
			<br />

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
	const page = slug?.length ? source.getPage(slug) : source.getPage(["index"]);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
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

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
		return "Last updated: Dev placeholder"; // <- must return
	}

	const time = await getGithubLastEdit({
		owner: "omeriadon",
		repo: "immune",
		path: `content/docs/${path}`,
		token: process.env.GIT_TOKEN,
	});

	if (!time) return "Unknown";
	return time instanceof Date
		? "Last updated: " + time.toLocaleDateString("en-GB", { dateStyle: "long" })
		: String("Last updated: " + time);
}

export default async function Page(props: PageProps<"/docs/[...slug]">) {
	const { slug } = await props.params;

	const page = slug?.length ? source.getPage(slug) : source.getPage([""]);

	console.log("slug:", slug);
	console.log("page:", page);

	if (!page) notFound();

	const markdownContent = await getLLMText(page);

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			breadcrumb={{ enabled: true, includePage: true, includeRoot: true }}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<div className="flex gap-3 text-xs!">
				<LLMCopyButton markdownUrl={`${page.url}.mdx`} />
				<ViewOptions
					markdownUrl={`${page.url}.mdx`}
					githubUrl={`https://github.com/omeriadon/immune/tree/main/content/docs/${page.path}`}
					markdownContent={markdownContent}
				/>
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

			<div className="opacity-50 mt-40 flex gap-1">
				<CalendarClock className="scale-90" />
				<p>{await getLastModifiedTime(page.path)}</p>
			</div>
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

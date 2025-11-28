export const dynamic = "force-dynamic";
import { source } from "@/lib/source";
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

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			breadcrumb={{
				enabled: true,
				includePage: true,
				includeRoot: true,
			}}
		>
			<div>
				<DocsTitle>{page.data.title}</DocsTitle>
				<div className="flex gap-3 text-xs!">
					<LLMCopyButton markdownUrl={`${page.url}.mdx`} />
					<ViewOptions
						markdownUrl={`${page.url}.mdx`}
						githubUrl={`https://github.com/omeriadon/immune/content/docs/${page.path}`}
					/>
				</div>
			</div>
			<DocsDescription>{page.data.description}</DocsDescription>

			<hr className="border border-fd-ring w-full" />

			<br />

			<DocsBody>
				<MDX
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
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

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(
	props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
	const params = await props.params;
	const page = source.getPage(params.slug);
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

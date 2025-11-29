import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function GET(
	_req: Request,
	ctx: { params: Promise<{ slug?: string[] }> },
) {
	const { slug } = await ctx.params;
	const slugs = slug ?? [];

	const page = source.getPage(slugs);
	if (!page) notFound();

	return new Response(await getLLMText(page), {
		headers: { "Content-Type": "text/markdown" },
	});
}

export function generateStaticParams() {
	return source.generateParams();
}

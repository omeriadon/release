"use client";

import { use, useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

const DARK_COLORS: Record<string, string> = {
	"fill:#232323": "fill:#f4f4f5",
	"stroke:#313131": "stroke:#d4d4d8",
	"color:#fff": "color:#18181b",
	"fill:#1c2928": "fill:#ccefec",
	"stroke:#1e726e": "stroke:#1e726e",
	"fill:#2D3136": "fill:#dde6f5",
	"stroke:#89AFDF": "stroke:#4a7fc1",
	"stroke:#3b3b3b": "stroke:#d4d4d8",
};

function applyLightColors(chart: string): string {
	let result = chart;
	for (const [dark, light] of Object.entries(DARK_COLORS)) {
		result = result.replaceAll(dark, light);
	}
	return result;
}

export function Mermaid({ chart }: { chart: string }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return;
	return <MermaidContent chart={chart} />;
}

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(
	key: string,
	setPromise: () => Promise<T>,
): Promise<T> {
	const cached = cache.get(key);
	if (cached) return cached as Promise<T>;

	const promise = setPromise();
	cache.set(key, promise);
	return promise;
}

function MermaidContent({ chart }: { chart: string }) {
	const id = useId();
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === "dark";
	const processedChart = isDark ? chart : applyLightColors(chart);

	const { default: mermaid } = use(
		cachePromise("mermaid", () => import("mermaid")),
	);

	mermaid.initialize({
		startOnLoad: false,
		securityLevel: "loose",
		fontFamily: "inherit",
		theme: isDark ? "dark" : "default",
	});

	const { svg, bindFunctions } = use(
		cachePromise(`${processedChart}-${resolvedTheme}`, () => {
			return mermaid.render(id, processedChart.replaceAll("\\n", "\n"));
		}),
	);

	return (
		<div
			ref={(container) => {
				if (container) bindFunctions?.(container);
			}}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

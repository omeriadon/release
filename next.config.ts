// next.config.ts
import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config: NextConfig = {
	reactStrictMode: true,
	devIndicators: false,
	async rewrites() {
		return [
			{
				source: "/docs/:path*.mdx",
				destination: "/llms/:path*",
			},
		];
	},
};

export default withMDX(config);

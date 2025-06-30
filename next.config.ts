import type {NextConfig} from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.convex.cloud",
			}
		],
		dangerouslyAllowSVG: true,
	},
	pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
	experimental: {
		mdxRs: true,
	},
	transpilePackages: ['next-mdx-remote'],
};

const withMDX = createMDX({})

export default withMDX(nextConfig);

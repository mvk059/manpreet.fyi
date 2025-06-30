import {api} from "@/convex/_generated/api";
import {ConvexHttpClient} from "convex/browser";
import {MDXRemote} from "next-mdx-remote/rsc";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function RegularBlogPost({slug}: { slug: string }) {
	const post = await convex.query(api.posts.getBySlug, {slug});

	if (!post) {
		return <div>Post not found.</div>;
	}

	return (
		<article className="prose dark:prose-invert">
			<MDXRemote source={post.body ?? ""}/>
		</article>
	);
}

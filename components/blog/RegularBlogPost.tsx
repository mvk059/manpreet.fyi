import {api} from "@/convex/_generated/api";
import {MDXRemote} from "next-mdx-remote/rsc";
import {fetchQuery} from "convex/nextjs";

export default async function RegularBlogPost({slug}: { slug: string }) {
	const post = await fetchQuery(api.posts.getBySlug, {slug});

	if (!post) {
		return <div>Post not found.</div>;
	}

	return (
		<article className="blog-post-article">
			<MDXRemote source={post.body ?? ""}/>
		</article>
	);
}

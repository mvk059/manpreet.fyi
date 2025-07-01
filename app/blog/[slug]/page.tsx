import {api} from "@/convex/_generated/api";
import ReactMDXBlogPost from "@/components/blog/ReactMDXBlogPost";
import RegularBlogPost from "@/components/blog/RegularBlogPost";
import {fetchQuery} from "convex/nextjs";

export const revalidate = 60;

export default async function BlogPostPage({params}: { params: Promise<{ slug: string }> }) {
	const {slug} = await params;
	const post = await fetchQuery(api.posts.getBySlug, {slug});

	if (!post) {
		return <div>Post not found.</div>;
	}

	return (
		<main className="blog-post-main">
			<section className="blog-post-section">
				{post.source === 'mdx' ? (
					<ReactMDXBlogPost slug={slug}/>
				) : (
					<RegularBlogPost slug={slug}/>
				)}
			</section>
		</main>
	);
}


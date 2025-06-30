import BlogList from "@/components/blog/BlogList";
import {ConvexHttpClient} from "convex/browser";
import {api} from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default async function BlogPage() {
	const posts = await convex.query(api.posts.getAllPublished);

	return (
		<main className="blog-main">
			<section className="blog-section">
				<h1 className="blog-title">Blog Posts</h1>
				<BlogList posts={posts}/>
			</section>
		</main>
	);
}

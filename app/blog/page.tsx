import BlogList from "@/components/blog/BlogList";
import {api} from "@/convex/_generated/api";
import {fetchQuery} from "convex/nextjs";

export const revalidate = 60;

export default async function BlogPage() {
	const allPosts = await fetchQuery(api.posts.getAllPublished);
	console.log(`All posts: ${allPosts}`);

	return (
		<main className="blog-list-main">
			<section className="blog-list-section">
				<h1 className="blog-title">Blog Posts</h1>
				<BlogList posts={allPosts}/>
			</section>
		</main>
	);
}

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default async function BlogPage() {
	// const allPosts = await convex.query(api.posts.getAllPublished);
	// console.log(`All posts: ${allPosts}`);

	return (
		<main className="blog-list-main">
			<section className="blog-list-section">
				<h1 className="blog-title">Blog Posts</h1>
				{/*<BlogList posts={allPosts}/>*/}
			</section>
		</main>
	);
}

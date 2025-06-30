import BlogPost from "@/components/blog/BlogPost";

export default async function BlogPostPage({params}: { params: Promise<{ slug: string }> }) {
	const {slug} = await params;
	return (
		<main className="blog-main">
			<section className="blog-section">
				<BlogPost slug={slug}/>
			</section>
		</main>
	);
}

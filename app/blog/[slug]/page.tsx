import BlogPost from "@/components/blog/BlogPost";

export default async function BlogPostPage({params}: { params: { slug: string } }) {
	return (
		<main className="blog-main">
			<section className="blog-section">
				<BlogPost slug={params.slug}/>
			</section>
		</main>
	);
}

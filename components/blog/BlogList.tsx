import {format} from "date-fns";
import {Doc} from "@/convex/_generated/dataModel";

export default function BlogList({posts}: { posts: Doc<"posts">[] }) {
	console.log("BlogList received posts:", posts);
	if (!posts || posts.length === 0) {
		return <div>No posts found.</div>;
	}

	return (
		<div className="blog-list-container">
			{posts.map((post) => (
				<div key={post._id} className="blog-list-item">
					<a href={`/blog/${post.slug}`} className="blog-list-title">
						{post.title}
					</a>
					{post.publishedAt && (
						<span className="blog-list-date">
              {format(new Date(post.publishedAt), "PPP")}
            </span>
					)}
				</div>
			))}
		</div>
	);
}
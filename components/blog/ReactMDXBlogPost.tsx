import {promises as fs} from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {components} from '@/mdx-components';

export default async function ReactMDXBlogPost({slug}: { slug: string }) {
	const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
	try {
		const fileContents = await fs.readFile(filePath, 'utf8');
		const {content, data} = matter(fileContents);
		return (
			<article className="blog-post-article">
				<h1>{data.title}</h1>
				<MDXRemote source={content} components={components}/>
			</article>
		);
	} catch (error) {
		console.error(error);
		return <div>Error loading MDX post.</div>;
	}
}

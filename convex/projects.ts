import {query} from "./_generated/server";

export const get = query({
	args: {},
	handler: async (ctx) => {
		const projects = await ctx.db.query("projects").order("asc").collect();
		return await Promise.all(
			projects.map(async (project) => {
				const imageUrl = project.image ? await ctx.storage.getUrl(project.image) : null;
				return {
					...project,
					image: imageUrl
				}
			})
		);
	}
});
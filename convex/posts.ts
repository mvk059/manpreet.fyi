import {query} from "./_generated/server";
import {v} from "convex/values";

// Get all published posts for the blog index
export const getAllPublished = query({
	handler: async (ctx) => {
		return await ctx.db
			.query("posts")
			.filter((q) => q.eq(q.field("isPublished"), true))
			.order("desc")
			.collect();
	},
});


export const getBySlug = query({
	args: {slug: v.string()},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("posts")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.unique();
	},
});
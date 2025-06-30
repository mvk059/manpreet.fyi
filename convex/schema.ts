import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
	about: defineTable({
		name: v.string(),
		subtitle: v.string(),
		description: v.string(),
		profileImage: v.string(),
		contact: v.object({
			email: v.string(),
			phone: v.string(),
			location: v.string(),
		}),
		socials: v.array(
			v.object({
				platform: v.string(),
				url: v.string(),
				iconUrl: v.string(),
			})
		),
	}),

	workExperience: defineTable({
		company: v.string(),
		startDate: v.string(),
		endDate: v.string(),
		title: v.string(),
		duties: v.array(v.string()),
		order: v.number(),
	}),

	education: defineTable({
		institution: v.string(),
		degree: v.string(),
		startDate: v.string(),
		endDate: v.string(),
		order: v.number(),
	}),

	projects: defineTable({
		title: v.string(),
		description: v.string(),
		image: v.string(),
		url: v.string(),
		order: v.number(),
	}),

	posts: defineTable({
		title: v.string(),
		slug: v.string(),
		author: v.string(),
		publishedAt: v.optional(v.number()),
		isPublished: v.boolean(),
		summary: v.string(),
		body: v.string(), // This will store the full MDX content
	}).index("by_slug", ["slug"]),
});

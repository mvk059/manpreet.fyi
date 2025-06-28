import {query} from "./_generated/server";
import {Id} from "./_generated/dataModel";

export const get = query({
	args: {},
	handler: async (ctx) => {
		const about = await ctx.db.query("about").first();
		if (!about) {
			return null;
		}

		const profileImageUrlId = about.profileImage! as Id<"_storage">
		const profileImageUrl = about.profileImage ? await ctx.storage.getUrl(profileImageUrlId) : null;

		const socialsWithIconUrls = await Promise.all(
			about.socials.map(async (social) => {
				const iconUrlId = social.iconUrl! as Id<"_storage">
				const iconUrl = social.iconUrl ? await ctx.storage.getUrl(iconUrlId) : null;
				return {
					...social,
					iconUrl: iconUrl
				}
			})
		);

		return {
			...about,
			profileImage: profileImageUrl,
			socials: socialsWithIconUrls
		}
	}
});
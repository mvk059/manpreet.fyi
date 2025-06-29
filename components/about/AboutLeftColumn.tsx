'use client';

import Image from "next/image";
import {Mail, MapPin} from "lucide-react";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Shimmer from "@/components/Shimmer";

export default function AboutLeftColumn() {
	const about = useQuery(api.about.get);

	if (!about) {
		return (
			<div className="about-left-column">
				<div className="about-left-column-sticky">
					<Shimmer width="192px" height="192px" className="rounded-full mx-auto mb-4"/>
					<div className="about-contact-info">
						<Shimmer width="80%" className="mx-auto mt-2"/>
						<Shimmer width="80%" className="mx-auto mt-2"/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="about-left-column">
			<div className="about-left-column-sticky">
				{about.profileImage && (
					<div className="about-profile-image-wrapper">
						<Image
							src={about.profileImage}
							alt="User"
							width={192}
							height={192}
							objectFit="cover"
							className="theme-icon"
						/>
					</div>
				)}
				<div className="about-contact-info">
					<div className="about-contact-item">
						<Mail size={16}/>
						<span>{about.contact.email}</span>
					</div>
					<div className="about-contact-item">
						<MapPin size={16}/>
						<span>{about.contact.location}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

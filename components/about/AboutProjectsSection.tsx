'use client';

import Image from "next/image";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Shimmer from "@/components/Shimmer";

export default function AboutProjectsSection() {
	const projects = useQuery(api.projects.get);

	if (!projects) {
		return (
			<div className="about-section">
				<h2 className="about-section-title"><Shimmer width="50%"/></h2>
				<div className="about-projects-container">
					{[...Array(2)].map((_, index) => (
						<div key={index} className="about-project-card">
							<Shimmer width="100%" height="160px" className="mb-4"/>
							<h3 className="about-project-title"><Shimmer width="70%"/></h3>
							<p className="about-project-description"><Shimmer width="90%" height="3em"/></p>
							<Shimmer width="40%" height="1.5em" className="mt-2"/>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="about-section">
			<h2 className="about-section-title">Projects</h2>
			<div className="about-projects-container">
				{projects.map((project) => (
					<div key={project._id} className="about-project-card">
						{project.image && (
							<div className="about-project-image-placeholder">
								<Image
									src={project.image}
									alt={project.title}
									fill={true}
									objectFit="cover"
								/>
							</div>
						)}
						<h3 className="about-project-title">{project.title}</h3>
						<p className="about-project-description">
							{project.description}
						</p>
						<a href={project.url} className="about-project-link">
							View Project
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

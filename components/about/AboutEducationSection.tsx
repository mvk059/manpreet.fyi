'use client';

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Shimmer from "@/components/Shimmer";

export default function AboutEducationSection() {
	const education = useQuery(api.education.get);

	if (!education) {
		return (
			<div className="about-section">
				<h2 className="about-section-title"><Shimmer width="50%"/></h2>
				{[...Array(2)].map((_, index) => (
					<div key={index} className="about-education-item">
						<div>
							<h3 className="about-education-details"><Shimmer width="70%"/></h3>
							<p className="about-education-major"><Shimmer width="80%"/></p>
						</div>
						<span className="about-education-date"><Shimmer width="30%"/></span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="about-section">
			<h2 className="about-section-title">Education</h2>
			{education.map((edu) => (
				<div key={edu._id} className="about-education-item">
					<div>
						<h3 className="about-education-details">
							{edu.institution}
						</h3>
						<p className="about-education-major">{edu.degree}</p>
					</div>
					<span className="about-education-date">
            {edu.startDate} - {edu.endDate}
          </span>
				</div>
			))}
		</div>
	);
}

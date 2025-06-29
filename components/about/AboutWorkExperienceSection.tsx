'use client';

import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Shimmer from "@/components/Shimmer";

export default function AboutWorkExperienceSection() {
	const workExperience = useQuery(api.workExperience.get);

	if (!workExperience) {
		return (
			<div className="about-section">
				<h2 className="about-section-title"><Shimmer width="50%"/></h2>
				{[...Array(3)].map((_, index) => (
					<div key={index} className="about-experience-item">
						<div className="about-experience-header">
							<h3 className="about-experience-company"><Shimmer width="60%"/></h3>
							<span className="about-experience-date"><Shimmer width="30%"/></span>
						</div>
						<p className="about-experience-title"><Shimmer width="70%"/></p>
						<ul className="about-experience-duties list-none">
							{[...Array(3)].map((_, idx) => (
								<li key={idx}><Shimmer width="90%" className="mt-1.5"/></li>
							))}
						</ul>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="about-section">
			<h2 className="about-section-title">Work Experience</h2>
			{workExperience.map((job) => (
				<div key={job._id} className="about-experience-item">
					<div className="about-experience-header">
						<h3 className="about-experience-company">{job.company}</h3>
						<span className="about-experience-date">
              {job.startDate} - {job.endDate}
            </span>
					</div>
					<p className="about-experience-title">{job.title}</p>
					<ul className="about-experience-duties">
						{job.duties.map((duty, index) => (
							<li key={index}>{duty}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

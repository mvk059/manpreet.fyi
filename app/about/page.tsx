'use client';

import Image from "next/image";
import {Mail, MapPin, Phone} from "lucide-react";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";

export default function About() {
  const about = useQuery(api.about.get);
  const workExperience = useQuery(api.workExperience.get);
  const education = useQuery(api.education.get);
  const projects = useQuery(api.projects.get);

  if (!about || !workExperience || !education || !projects) {
    return <div>Loading...</div>;
  }

  return (
    <main className="about-main">
      <div className="about-container">
        {/* Left Column */}
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
                <Mail size={16} />
                <span>{about.contact.email}</span>
              </div>
              <div className="about-contact-item">
                <Phone size={16} />
                <span>{about.contact.phone}</span>
              </div>
              <div className="about-contact-item">
                <MapPin size={16} />
                <span>{about.contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="about-right-column">
          <div className="about-section">
            <h1 className="about-name">{about.name}</h1>
            <p className="about-subtitle">{about.subtitle}</p>
            <div className="about-social-links">
              {about.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="about-social-link"
                >
                  {social.iconUrl && (
                    <Image
                      src={social.iconUrl}
                      alt={social.platform}
                      width={24}
                      height={24}
                      className="theme-icon"
                    />
                  )}
                </a>
              ))}
            </div>
            <p className="about-description">{about.description}</p>
          </div>

          {/* Work Experience */}
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

          {/* Education */}
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

          {/* Projects */}
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
        </div>
      </div>
    </main>
  );
}

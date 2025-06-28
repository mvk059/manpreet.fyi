import Image from "next/image";
import {Github, Linkedin, Mail, MapPin, Phone, Twitter} from "lucide-react";

export default function About() {
  return (
    <main className="about-main">
      <div className="about-container">
        {/* Left Column */}
        <div className="about-left-column">
          <div className="about-left-column-sticky">
            <div className="about-profile-image-wrapper">
              <Image
                src="/user.svg"
                alt="User"
                width={192}
                height={192}
                className="about-profile-image"
              />
            </div>
            <div className="about-contact-info">
              <div className="about-contact-item">
                <Mail size={16} />
                <span>john.doe@example.com</span>
              </div>
              <div className="about-contact-item">
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </div>
              <div className="about-contact-item">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="about-right-column">
          <div className="about-section">
            <h1 className="about-name">John Doe</h1>
            <p className="about-subtitle">
              Software Engineer & Web Developer
            </p>
            <div className="about-social-links">
              <a href="#" className="about-social-link">
                <Github size={24} />
              </a>
              <a href="#" className="about-social-link">
                <Linkedin size={24} />
              </a>
              <a href="#" className="about-social-link">
                <Twitter size={24} />
              </a>
            </div>
            <p className="about-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec aliquam aliquam, nunc nisl aliquet nisl, eget
              aliquam nisl nisl sit amet nisl.
            </p>
          </div>

          {/* Work Experience */}
          <div className="about-section">
            <h2 className="about-section-title">Work Experience</h2>
            <div className="about-experience-item">
              <div className="about-experience-header">
                <h3 className="about-experience-company">Company A</h3>
                <span className="about-experience-date">
                  2022 - Present
                </span>
              </div>
              <p className="about-experience-title">
                Software Engineer
              </p>
              <ul className="about-experience-duties">
                <li>Developed and maintained web applications.</li>
                <li>Collaborated with cross-functional teams.</li>
                <li>Implemented new features and fixed bugs.</li>
              </ul>
            </div>
            <div className="about-experience-item">
              <div className="about-experience-header">
                <h3 className="about-experience-company">Company B</h3>
                <span className="about-experience-date">
                  2020 - 2022
                </span>
              </div>
              <p className="about-experience-title">
                Junior Developer
              </p>
              <ul className="about-experience-duties">
                <li>Assisted in the development of web applications.</li>
                <li>Learned and applied new technologies.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="about-section">
            <h2 className="about-section-title">Education</h2>
            <div className="about-education-item">
              <div>
                <h3 className="about-education-details">
                  University of Example
                </h3>
                <p className="about-education-major">
                  B.S. in Computer Science
                </p>
              </div>
              <span className="about-education-date">
                2016 - 2020
              </span>
            </div>
          </div>

          {/* Projects */}
          <div className="about-section">
            <h2 className="about-section-title">Projects</h2>
            <div className="about-projects-container">
              <div className="about-project-card">
                <div className="about-project-image-placeholder"></div>
                <h3 className="about-project-title">Project 1</h3>
                <p className="about-project-description">
                  A brief description of the project.
                </p>
                <a href="#" className="about-project-link">
                  View Project
                </a>
              </div>
              <div className="about-project-card">
                <div className="about-project-image-placeholder"></div>
                <h3 className="about-project-title">Project 2</h3>
                <p className="about-project-description">
                  A brief description of the project.
                </p>
                <a href="#" className="about-project-link">
                  View Project
                </a>
              </div>
	            <div className="about-project-card">
		            <div className="about-project-image-placeholder"></div>
		            <h3 className="about-project-title">Project 2</h3>
		            <p className="about-project-description">
			            A brief description of the project.
		            </p>
		            <a href="#" className="about-project-link">
			            View Project
		            </a>
	            </div>
	            <div className="about-project-card">
		            <div className="about-project-image-placeholder"></div>
		            <h3 className="about-project-title">Project 2</h3>
		            <p className="about-project-description">
			            A brief description of the project.
		            </p>
		            <a href="#" className="about-project-link">
			            View Project
		            </a>
	            </div>
	            <div className="about-project-card">
		            <div className="about-project-image-placeholder"></div>
		            <h3 className="about-project-title">Project 2</h3>
		            <p className="about-project-description">
			            A brief description of the project.
		            </p>
		            <a href="#" className="about-project-link">
			            View Project
		            </a>
	            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

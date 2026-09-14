"use client";
import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectModal from "@/components/ui/ProjectModal";
import { logProjectClicked, logStoreLinkClicked, logExternalLinkClicked } from "@/lib/analytics";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    logProjectClicked(project.name);
    setSelectedProject(project);
  };

  return (
    <section id="projects" data-section="projects" className="section">
      <ScrollReveal>
        <SectionTitle
          label="Portfolio"
          title="Featured Projects"
          subtitle="Production mobile applications used by hundreds of thousands of users worldwide."
        />
      </ScrollReveal>

      <div className="projects-grid">
        {projects.map((project, i) => {
          const coverImage = `/images/projects/${project.imageName}1.webp`;
          return (
            <ScrollReveal key={project.name} delay={i * 80}>
              <div className="project-card" onClick={() => handleOpenModal(project)}>
                <div className="project-img-wrapper">
                  <Image
                    src={coverImage}
                    alt={project.name}
                    width={400}
                    height={300}
                    className="project-img"
                    unoptimized
                  />
                  <div className="project-overlay">
                    <span className="btn btn-primary btn-sm">View Case Study</span>
                  </div>
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags-flat">
                    {project.skills.join(" • ")}
                  </div>

                  <div className="project-footer">
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        logStoreLinkClicked(project.name, "play_store");
                        logExternalLinkClicked(project.playStoreUrl, "PlayStore");
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.55.45-1 1-1h.2l10.8 10-10.8 10H4c-.55 0-1-.45-1-1zm13.1-6.7l2.8-2.6c.4-.4.4-1 0-1.4l-2.8-2.6-2.5 2.3 2.5 4.3z"/></svg>
                      Google Play
                    </a>

                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          logStoreLinkClicked(project.name, "app_store");
                          logExternalLinkClicked(project.appStoreUrl!, "AppStore");
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.17.67-2.87 1.48-.62.72-1.16 1.88-.99 3.01 1.12.09 2.21-.55 2.87-1.37z"/></svg>
                        App Store
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

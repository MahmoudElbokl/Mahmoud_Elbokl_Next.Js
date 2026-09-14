"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { logProjectModalOpened, logProjectModalClosed, logProjectImageNavigated, logStoreLinkClicked, logExternalLinkClicked } from "@/lib/analytics";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logProjectModalOpened(project.name);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project.name]);

  const handleClose = useCallback(() => {
    logProjectModalClosed(project.name);
    onClose();
  }, [project.name, onClose]);

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % project.imageCount;
    setCurrentIdx(nextIdx);
    logProjectImageNavigated(project.name, nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + project.imageCount) % project.imageCount;
    setCurrentIdx(prevIdx);
    logProjectImageNavigated(project.name, prevIdx);
  };

  const currentImgPath = `/images/projects/${project.imageName}${currentIdx + 1}.webp`;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        ref={modalRef}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-gallery">
          <div className="modal-main-img-wrap">
            <Image
              src={currentImgPath}
              alt={`${project.name} screenshot ${currentIdx + 1}`}
              fill
              style={{ objectFit: "contain" }}
              className="modal-main-img"
              unoptimized
            />
            {project.imageCount > 1 && (
              <>
                <button className="modal-nav nav-prev" onClick={handlePrev} aria-label="Previous image">‹</button>
                <button className="modal-nav nav-next" onClick={handleNext} aria-label="Next image">›</button>
              </>
            )}
          </div>

          {project.imageCount > 1 && (
            <div className="modal-thumbs">
              {Array.from({ length: project.imageCount }).map((_, i) => (
                <button
                  key={i}
                  className={`modal-thumb ${i === currentIdx ? "active" : ""}`}
                  onClick={() => {
                    setCurrentIdx(i);
                    logProjectImageNavigated(project.name, i);
                  }}
                >
                  <Image
                    src={`/images/projects/${project.imageName}${i + 1}.webp`}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <button className="modal-close" onClick={handleClose} aria-label="Close modal">✕</button>

          <h2 className="modal-project-name">{project.name}</h2>
          <div className="modal-badges">
            {project.role && <span className="badge badge-primary">{project.role}</span>}
            {project.duration && <span className="badge badge-neutral">⏱ {project.duration}</span>}
            {project.teamSize && <span className="badge badge-neutral">👥 {project.teamSize}</span>}
          </div>

          <p className="modal-desc">{project.description}</p>

          {project.impact && (
            <div className="case-block">
              <div className="case-block-header" style={{ color: "var(--success)" }}>Impact</div>
              <div className="case-block-content case-impact">{project.impact}</div>
            </div>
          )}

          {project.challenge && (
            <div className="case-block">
              <div className="case-block-header" style={{ color: "#ef4444" }}>Challenge</div>
              <div className="case-block-content case-challenge">{project.challenge}</div>
            </div>
          )}

          {project.solution && (
            <div className="case-block">
              <div className="case-block-header" style={{ color: "var(--primary)" }}>Solution</div>
              <div className="case-block-content case-solution">{project.solution}</div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="case-block">
              <div className="case-block-header" style={{ color: "#f59e0b" }}>Key Highlights</div>
              <div className="case-block-content case-highlights">
                {project.highlights.map((h, i) => (
                  <div key={i} className="highlight-item" style={{ display: "flex", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span className="highlight-check" style={{ color: "var(--success)" }}>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="case-block">
            <div className="case-block-header" style={{ color: "var(--primary)" }}>Tech Stack</div>
            <div className="modal-stack">
              {project.skills.map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="modal-store-bar">
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => {
                logStoreLinkClicked(project.name, "play_store");
                logExternalLinkClicked(project.playStoreUrl, "PlayStore");
              }}
            >
              Get on Google Play
            </a>
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                onClick={() => {
                  logStoreLinkClicked(project.name, "app_store");
                  logExternalLinkClicked(project.appStoreUrl!, "AppStore");
                }}
              >
                Get on App Store
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

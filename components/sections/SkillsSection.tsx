"use client";
import { skillCategories } from "@/lib/data/skills";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";

export default function SkillsSection() {
  return (
    <section id="skills" data-section="skills" className="section">
      <ScrollReveal>
        <SectionTitle
          label="Expertise"
          title="Technical Skills"
          subtitle="A comprehensive toolkit built over 6+ years of production mobile engineering."
        />
      </ScrollReveal>
      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={i * 60}>
            <div className="skill-card">
              <div className="skill-card-header">
                <div className="skill-card-icon">{cat.icon}</div>
                <h3 className="skill-card-title">{cat.title}</h3>
              </div>
              <div className="skill-tag-list">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag-item">{skill}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

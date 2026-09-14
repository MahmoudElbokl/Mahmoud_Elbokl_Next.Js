"use client";
import { workExperiences } from "@/lib/data/workExperience";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";

export default function WorkExperienceSection() {
  return (
    <section id="experience" data-section="experience" className="section">
      <ScrollReveal>
        <SectionTitle
          label="Career"
          title="Work Experience"
          subtitle="A journey of continuous growth across high-impact startups and established companies."
        />
      </ScrollReveal>
      <div className="work-grid">
        {workExperiences.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div className="work-card">
              <div className="work-icon-badge">{exp.icon}</div>
              <div>
                <span className="work-period">{exp.period}</span>
                <h3 className="work-title">{exp.title}</h3>
                <p className="work-company">{exp.company}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

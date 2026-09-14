"use client";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { logHireMeClicked, logCvDownloaded, logExternalLinkClicked, logWhatsAppOpened } from "@/lib/analytics";

const bullets = [
  "6+ years shipping high-performance Flutter & Cross-Platform mobile apps",
  "Expert in Clean Architecture, BLoC, Provider, State Management, and CI/CD",
  "Proven track record scaling apps to 10M+ active users with 99.9% crash-free rate",
  "Deep native integration experience",
];

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "15+", label: "Apps Shipped" },
  { value: "10M+", label: "Active Users" },
];

export default function HeroSection() {
  return (
    <section id="hero" data-section="hero" className="hero-section">
      <div className="hero-bg-glow" />
      <div className="hero-grid">
        <ScrollReveal className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Senior Flutter & Mobile Engineer
          </div>

          <h1 className="hero-title">
            Crafting Exceptional <span className="gradient-text">Mobile Experiences</span>
          </h1>

          <p className="hero-subtitle">
            Hi, I&apos;m <strong className="hero-name-highlight">Mahmoud Elbokl</strong>. Senior Mobile Engineer based in Giza, Egypt.
            I design and build production-grade Flutter, iOS, and Android applications with scalable clean architectures.
          </p>

          <ul className="hero-bullets">
            {bullets.map((bullet, i) => (
              <li key={i}>
                <svg className="bullet-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="hero-actions">
            <a
              href="#contact"
              className="btn btn-primary btn-lg"
              onClick={() => logHireMeClicked("hero")}
            >
              Get In Touch
            </a>
            <a
              href="/assets/Mahmoud_Elbokl_Senior_Flutter_Developer_Resume.pdf"
              target="_blank"
              download
              className="btn btn-outline btn-lg"
              onClick={() => logCvDownloaded("hero")}
            >
              Download CV
            </a>
            <a
              href="https://wa.me/201028824642?text=Hi%2C%20I%27m%20interested%20in%20working%20with%20you%21"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              onClick={() => {
                logWhatsAppOpened("hero");
                logExternalLinkClicked("https://wa.me/201028824642", "WhatsApp");
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" /></svg>
              WhatsApp
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value gradient-text">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="hero-media">
          <div className="profile-wrapper">
            <div className="profile-glow" />
            <div className="profile-frame">
              <Image
                src="/images/picture.webp"
                alt="Mahmoud Elbokl"
                width={400}
                height={500}
                priority
                className="profile-img"
              />
            </div>
            <div className="floating-badge badge-top">
              <span className="badge-icon">⚡</span>
              <div>
                <div className="badge-title">Flutter Specialist</div>
                <div className="badge-sub">BLoC & Clean Arch</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

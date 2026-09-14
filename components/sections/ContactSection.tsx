"use client";
import { useState, useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { logContactCardClicked, logWhatsAppOpened, logContactFormStarted, logContactFormSubmitted, logExternalLinkClicked } from "@/lib/analytics";

const MAIL = "MahmoudSaeedElbokl@gmail.com";
const PHONE = "+20 102 882 4642";
const LOCATION = "Giza, Egypt";
const WHATSAPP_URL = "https://wa.me/201028824642?text=Hi%2C%20I%27m%20interested%20in%20working%20with%20you%21";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formStartedRef = useRef(false);

  const handleInputChange = (field: string, value: string) => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      logContactFormStarted();
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("submitting");

    logContactFormSubmitted(formData.subject || "General Inquiry");
    
    setTimeout(() => {
      setStatus("success");
      const mailtoUrl = `mailto:${MAIL}?subject=${encodeURIComponent(formData.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" data-section="contact" className="section">
      <ScrollReveal>
        <SectionTitle
          label="Connect"
          title="Let's Build Something Great Together"
          subtitle="Available for full-time opportunities, senior mobile consulting, and high-impact contracts."
        />
      </ScrollReveal>

      <div className="contact-grid">
        <ScrollReveal delay={100} className="contact-info-cards">
          <div
            className="contact-card"
            onClick={() => {
              logContactCardClicked("email");
              window.location.href = `mailto:${MAIL}`;
            }}
          >
            <div className="contact-card-icon">✉</div>
            <div>
              <div className="contact-card-label">Email Me</div>
              <div className="contact-card-value">{MAIL}</div>
            </div>
          </div>

          <div
            className="contact-card"
            onClick={() => {
              logContactCardClicked("phone");
              window.location.href = `tel:${PHONE}`;
            }}
          >
            <div className="contact-card-icon">📞</div>
            <div>
              <div className="contact-card-label">Call Me</div>
              <div className="contact-card-value">{PHONE}</div>
            </div>
          </div>

          <div
            className="contact-card"
            onClick={() => {
              logContactCardClicked("whatsapp");
              logWhatsAppOpened("contact_section");
              window.open(WHATSAPP_URL, "_blank");
            }}
          >
            <div className="contact-card-icon" style={{ background: "rgba(37, 211, 102, 0.15)", color: "#25D366" }}>💬</div>
            <div>
              <div className="contact-card-label">WhatsApp</div>
              <div className="contact-card-value">+20 102 882 4642</div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">📍</div>
            <div>
              <div className="contact-card-label">Location</div>
              <div className="contact-card-value">{LOCATION}</div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Send Me a Direct Message
            </h3>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="Flutter App Development Opportunity"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: "100%" }}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : status === "success" ? "Message Ready! Opening Mail..." : "Send Message"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

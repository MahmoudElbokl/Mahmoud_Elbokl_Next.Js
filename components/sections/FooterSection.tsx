"use client";
import { logWhatsAppOpened, logSocialLinkClicked } from "@/lib/analytics";

const TAGLINE = "Building seamless cross-platform mobile experiences that delight users and drive business outcomes.";
const MAIL = "MahmoudSaeedElbokl@gmail.com";
const PHONE = "+20 102 882 4642";
const LOCATION = "Giza, Egypt";
const WHATSAPP_URL = "https://wa.me/201028824642?text=Hi%2C%20I%27m%20interested%20in%20working%20with%20you%21";
const LINKEDIN = "https://www.linkedin.com/in/mahmoudelbokl";
const GITHUB = "https://github.com/MahmoudElbokl";
const FACEBOOK = "https://www.facebook.com/MahmoudSaeedElbokl";

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-gradient-bar" />
      <div className="footer-inner">
        <div>
          <div className="footer-logo gradient-text">M.E</div>
          <p className="footer-subtitle">Senior Flutter & Mobile Engineer</p>
          <p className="footer-desc">{TAGLINE}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            onClick={() => logWhatsAppOpened("footer")}
          >
            Chat on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="footer-section-title">Get In Touch</h3>
          <div className="footer-detail">
            <div className="footer-detail-label">Email</div>
            <div className="footer-detail-value"><a href={`mailto:${MAIL}`}>{MAIL}</a></div>
          </div>
          <div className="footer-detail">
            <div className="footer-detail-label">Phone</div>
            <div className="footer-detail-value"><a href={`tel:${PHONE}`}>{PHONE}</a></div>
          </div>
          <div className="footer-detail">
            <div className="footer-detail-label">Location</div>
            <div className="footer-detail-value">{LOCATION}</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Mahmoud Elbokl. All rights reserved.</span>
        <div className="social-row">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="LinkedIn"
            onClick={() => logSocialLinkClicked("linkedin")}
          >
            LinkedIn
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="GitHub"
            onClick={() => logSocialLinkClicked("github")}
          >
            GitHub
          </a>
          <a
            href={FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="Facebook"
            onClick={() => logSocialLinkClicked("facebook")}
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

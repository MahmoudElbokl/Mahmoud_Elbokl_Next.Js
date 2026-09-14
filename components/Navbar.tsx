"use client";
import { useState, useEffect, useCallback } from "react";
import { logNavClick, logThemeToggled, logMobileMenuOpened, logMobileMenuClosed, logScrollToTop, logCvDownloaded } from "@/lib/analytics";

const navItems = [
  { label: "About Me", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = saved || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const sectionIds = ["hero", "skills", "experience", "projects", "testimonials", "contact"];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isScrolled = scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const isAtBottom =
            window.innerHeight + scrollY >= (document.documentElement.scrollHeight - 60);

          if (isAtBottom) {
            setActiveSection((prev) => (prev !== "contact" ? "contact" : prev));
          } else {
            for (let i = sectionIds.length - 1; i >= 0; i--) {
              const el = document.getElementById(sectionIds[i]);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 200) {
                  setActiveSection((prev) => (prev !== sectionIds[i] ? sectionIds[i] : prev));
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", nextTheme);
    logThemeToggled(nextTheme);
  }, [theme]);

  const handleNavClick = (label: string, href: string) => {
    logNavClick(label, href);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      logMobileMenuOpened();
    } else {
      logMobileMenuClosed();
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#hero" className="nav-logo gradient-text" onClick={() => logScrollToTop()}>
          M.E
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${activeSection === item.href.substring(1) ? "active" : ""}`}
              onClick={() => handleNavClick(item.label, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/uc?export=download&id=1Bb6Xnjfb4CYA7E0z4weLxIsbx2uYcdFS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-mobile-btn"
            onClick={() => {
              logCvDownloaded("navbar");
              setMobileMenuOpen(false);
            }}
          >
            Download CV
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <a
            href="https://drive.google.com/file/d/1Bb6Xnjfb4CYA7E0z4weLxIsbx2uYcdFS/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline nav-desktop-btn"
            onClick={() => logCvDownloaded("navbar")}
          >
            Resume
          </a>

          <button
            className="mobile-hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

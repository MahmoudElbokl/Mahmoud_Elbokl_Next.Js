import { logEvent as firebaseLogEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "./firebase";

async function logEvent(name: string, params?: Record<string, unknown>) {
  try {
    const analytics = await getFirebaseAnalytics();
    if (!analytics) return;
    firebaseLogEvent(analytics, name, params as Record<string, string | number | boolean>);
  } catch {
    // Graceful no-op if analytics is blocked
  }
}

// Session & Page
export const logSessionStart = (theme?: string) =>
  logEvent("session_start", { timestamp: Date.now(), theme: theme || "dark" });

export const logPageView = () =>
  logEvent("page_view", { page: "/", referrer: typeof document !== "undefined" ? document.referrer : "" });

export const logPageExit = (timeOnSiteSeconds?: number, scrollDepthPct?: number, sectionsSeen?: string[]) =>
  logEvent("page_exit", {
    time_on_site_seconds: timeOnSiteSeconds || 0,
    scroll_depth_pct: scrollDepthPct || 0,
    sections_seen: (sectionsSeen || []).join(","),
  });

// Scroll
export const logScrollDepth = (depthPct: number) =>
  logEvent("scroll_depth", { depth_pct: depthPct });

// Navigation
export const logNavClick = (sectionLabel: string, href?: string) =>
  logEvent("nav_click", { section_label: sectionLabel, href: href || "" });

export const logScrollToTop = () => logEvent("scroll_to_top_clicked");

// Sections
export const logSectionViewed = (sectionName: string) =>
  logEvent("section_viewed", { section_name: sectionName });

// Theme
export const logThemeToggled = (toTheme: string) =>
  logEvent("theme_toggled", { to_theme: toTheme });

// Mobile Menu
export const logMobileMenuOpened = () => logEvent("mobile_menu_opened");
export const logMobileMenuClosed = () => logEvent("mobile_menu_closed");

// Hero / CTA
export const logHireMeClicked = (source?: string) =>
  logEvent("hire_me_clicked", { source: source || "hero" });

export const logCvDownloaded = (source?: string) =>
  logEvent("cv_downloaded", { source: source || "unknown" });

// Projects
export const logProjectCardClicked = (projectName: string) =>
  logEvent("project_card_clicked", { project_name: projectName });

export const logProjectClicked = logProjectCardClicked;

export const logProjectModalOpened = (projectName: string) =>
  logEvent("project_modal_opened", { project_name: projectName });

export const logProjectModalClosed = (projectName: string, timeSpentSeconds?: number) =>
  logEvent("project_modal_closed", { project_name: projectName, time_spent_seconds: timeSpentSeconds || 0 });

export const logProjectImageNavigated = (projectName: string, imageIndex: number) =>
  logEvent("project_image_navigated", { project_name: projectName, image_index: imageIndex });

export const logStoreLinkClicked = (projectName: string, store: string) =>
  logEvent("store_link_clicked", { project_name: projectName, store });

// Testimonials
export const logTestimonialSwiped = (testimonialIndex: number, author?: string) =>
  logEvent("testimonial_swiped", { testimonial_index: testimonialIndex, author: author || "" });

export const logLinkedInRecommendationsClicked = () =>
  logEvent("linkedin_recommendations_clicked");

// Social & External
export const logSocialLinkClicked = (platform: string) =>
  logEvent("social_link_clicked", { platform });

export const logExternalLinkClicked = (url: string, label: string) =>
  logEvent("external_link_clicked", { url, label });

// Contact
export const logContactCardClicked = (type: string) =>
  logEvent("contact_card_clicked", { type });

export const logWhatsAppOpened = (source?: string) =>
  logEvent("whatsapp_opened", { source: source || "unknown" });

export const logContactFormStarted = () => logEvent("contact_form_started");

export const logContactFormSubmitted = (subject?: string) =>
  logEvent("contact_form_submitted", { subject: subject || "General" });

export const logContactFormSuccess = () => logEvent("contact_form_success");

export const logContactFormError = (error: string) =>
  logEvent("contact_form_error", { error });

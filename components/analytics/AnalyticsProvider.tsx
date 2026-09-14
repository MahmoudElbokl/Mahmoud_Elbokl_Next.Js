"use client";
import { useEffect, useRef, useCallback } from "react";
import {
  logSessionStart, logPageView, logPageExit, logScrollDepth, logSectionViewed,
} from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const sessionStartRef = useRef<number>(Date.now());
  const scrollMilestonesRef = useRef<Set<number>>(new Set());
  const sectionsSeenRef = useRef<Set<string>>(new Set());
  const maxScrollRef = useRef<number>(0);

  const getScrollPct = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  }, []);

  const handlePageExit = useCallback(() => {
    const timeOnSite = Math.round((Date.now() - sessionStartRef.current) / 1000);
    logPageExit(timeOnSite, maxScrollRef.current, Array.from(sectionsSeenRef.current));
  }, []);

  useEffect(() => {
    // Defer analytics initialization to user interaction or late idle to protect FCP, LCP, and TBT
    let initialized = false;
    const initAnalytics = () => {
      if (initialized) return;
      initialized = true;
      const isDark = document.documentElement.classList.contains("dark");
      const currentTheme = isDark ? "dark" : "light";
      logSessionStart(currentTheme);
      logPageView();
    };

    const onUserInteraction = () => {
      initAnalytics();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };

    window.addEventListener("scroll", onUserInteraction, { passive: true, once: true });
    window.addEventListener("click", onUserInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true, once: true });

    const idleTimer = setTimeout(() => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(initAnalytics, { timeout: 2000 });
      } else {
        initAnalytics();
      }
    }, 4500);

    // Scroll depth tracking
    const handleScroll = () => {
      const pct = getScrollPct();
      if (pct > maxScrollRef.current) maxScrollRef.current = pct;
      [25, 50, 75, 90, 100].forEach((milestone) => {
        if (pct >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          logScrollDepth(milestone);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Section visibility tracking via IntersectionObserver
    const sectionIds = ["about", "skills", "experience", "testimonials", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const sectionName = entry.target.getAttribute("data-section") || "";
            if (sectionName && !sectionsSeenRef.current.has(sectionName)) {
              sectionsSeenRef.current.add(sectionName);
              logSectionViewed(sectionName);
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Page exit
    window.addEventListener("beforeunload", handlePageExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handlePageExit();
    });

    return () => {
      clearTimeout(idleTimer);
      cleanupListeners();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handlePageExit);
      observer.disconnect();
    };
  }, [getScrollPct, handlePageExit]);

  return <>{children}</>;
}

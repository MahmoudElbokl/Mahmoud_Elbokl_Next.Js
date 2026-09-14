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
    // Defer initial analytics to idle time to avoid competing with LCP/FCP
    const initAnalytics = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const currentTheme = isDark ? "dark" : "light";
      logSessionStart(currentTheme);
      logPageView();
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(initAnalytics);
    } else {
      setTimeout(initAnalytics, 1200);
    }

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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handlePageExit);
      observer.disconnect();
    };
  }, [getScrollPct, handlePageExit]);

  return <>{children}</>;
}

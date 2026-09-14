"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials } from "@/lib/data/testimonials";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { logTestimonialSwiped } from "@/lib/analytics";

export default function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = useCallback(() => {
    setCurrentIdx((prev) => {
      const next = (prev + 1) % testimonials.length;
      logTestimonialSwiped(next, testimonials[next].name);
      return next;
    });
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIdx((prev) => {
      const next = (prev - 1 + testimonials.length) % testimonials.length;
      logTestimonialSwiped(next, testimonials[next].name);
      return next;
    });
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextTestimonial, 7000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextTestimonial]);

  const item = testimonials[currentIdx];
  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <section id="testimonials" data-section="testimonials" className="section">
      <ScrollReveal>
        <SectionTitle
          label="Endorsements"
          title="What Leaders & Teammates Say"
          subtitle="Recommendations from engineering managers, team leads, and peers I've collaborated with."
        />
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="testimonial-card">
          <p className="testimonial-text">“{item.text}”</p>

          <div className="testimonial-footer">
            <div className="author-avatar">{initials}</div>
            <div>
              <h4 className="author-name">{item.name}</h4>
              <p className="author-role">{item.position}</p>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="testimonial-btn" onClick={prevTestimonial} aria-label="Previous recommendation">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === currentIdx ? "active" : ""}`}
                  onClick={() => {
                    setCurrentIdx(i);
                    logTestimonialSwiped(i, testimonials[i].name);
                  }}
                  aria-label={`Go to recommendation ${i + 1}`}
                />
              ))}
            </div>

            <button className="testimonial-btn" onClick={nextTestimonial} aria-label="Next recommendation">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

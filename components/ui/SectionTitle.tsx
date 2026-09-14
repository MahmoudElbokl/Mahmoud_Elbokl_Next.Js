"use client";
interface Props { label: string; title: string; subtitle?: string; }
export default function SectionTitle({ label, title, subtitle }: Props) {
  return (
    <div className="section-title-wrapper">
      <div className="section-label">{label}</div>
      <h2 className="section-title gradient-text">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

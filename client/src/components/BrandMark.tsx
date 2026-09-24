const logoUrl = "/floow-logo-green-outline_4de514d4.png";

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "brand-mark-compact" : ""}`} aria-label="Floow Labs">
      <span>f l</span>
      <img src={logoUrl} alt="" />
      <span>w</span>
      {!compact && <small>labs</small>}
    </div>
  );
}

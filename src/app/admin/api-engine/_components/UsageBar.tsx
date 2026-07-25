export default function UsageBar({
  value,
  max,
  showLabel = true,
}: {
  value: number;
  max: number;
  showLabel?: boolean;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const level = pct < 60 ? "low" : pct < 85 ? "mid" : "high";

  return (
    <div className="usage-bar-wrap">
      <div className="usage-bar-track">
        <div className={`usage-bar-fill ${level}`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="usage-bar-pct">{pct}%</span>}
    </div>
  );
}

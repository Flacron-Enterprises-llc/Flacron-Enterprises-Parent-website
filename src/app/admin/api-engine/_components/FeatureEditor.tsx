"use client";

import { useState } from "react";
import { Save, Cpu } from "lucide-react";

const ALL_FEATURES = [
  "chat",
  "generate",
  "embeddings",
  "analyze-document",
  "analyze-image",
  "speech-to-text",
  "text-to-speech",
  "file-storage",
];

export default function FeatureEditor({
  enabled,
  onSave,
}: {
  enabled: string[];
  onSave: (features: string[]) => Promise<void>;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set(enabled));
  const [saving, setSaving] = useState(false);

  const toggle = (feature: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(feature)) next.delete(feature);
      else next.add(feature);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(Array.from(selected));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="features-grid">
        {ALL_FEATURES.map((f) => (
          <label key={f} className={`feature-checkbox ${selected.has(f) ? "checked" : ""}`} onClick={() => toggle(f)}>
            <input type="checkbox" checked={selected.has(f)} onChange={() => toggle(f)} />
            <Cpu size={14} style={{ color: selected.has(f) ? "var(--fae-accent-primary)" : "var(--fae-text-muted)", flexShrink: 0 }} />
            <span>{f}</span>
          </label>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={14} />
          {saving ? "Saving…" : "Save Features"}
        </button>
      </div>
    </div>
  );
}

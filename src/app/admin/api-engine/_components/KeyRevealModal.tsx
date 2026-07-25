"use client";

import { useState } from "react";
import { Key, Copy, Check, ShieldAlert, X } from "lucide-react";

export default function KeyRevealModal({ apiKey, onClose }: { apiKey: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--fae-radius-sm)",
              background: "rgba(254,71,5,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--fae-accent-primary)",
            }}
          >
            <Key size={20} />
          </div>
          <h3 className="modal-title" style={{ marginBottom: 0 }}>
            New API Key
          </h3>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--fae-text-muted)", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "var(--fae-radius-sm)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            fontSize: 13,
            color: "#ef4444",
          }}
        >
          <ShieldAlert size={14} />
          Copy this key now — it will not be shown again.
        </div>

        <div className="key-box">{apiKey}</div>

        <button className="key-copy-btn" onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Key"}
        </button>

        <div className="modal-actions" style={{ marginTop: 20 }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--fae-radius-sm)",
              background: danger ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: danger ? "#ef4444" : "#f59e0b",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={20} />
          </div>
          <h3 className="modal-title" style={{ marginBottom: 0 }}>
            {title}
          </h3>
          <button onClick={onCancel} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--fae-text-muted)", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>
        <p className="modal-body">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className={`btn ${danger ? "btn-danger" : "btn-warning"}`} onClick={onConfirm} disabled={loading}>
            {loading ? "Processing…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastCtx {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastCtx>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-success" />,
  error: <XCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-danger" />,
  info: <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />,
};

const styles: Record<ToastType, string> = {
  success: "border-l-success",
  error: "border-l-danger",
  info: "border-l-accent",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const reduceMotion = useReducedMotion();

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Top-right under the navbar, so toasts never cover the Growth Engine chat launcher (bottom-right). */}
      <div role="status" aria-live="polite" className="pointer-events-none fixed right-4 top-20 z-[10000] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2 sm:right-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border border-l-4 border-border bg-surface-raised px-4 py-3 shadow-lg ${styles[t.type]}`}
            >
              {icons[t.type]}
              <p className="flex-1 text-sm font-medium leading-snug text-text">{t.message}</p>
              <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(t.id)} className="rounded text-text-muted transition-colors hover:text-text">
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

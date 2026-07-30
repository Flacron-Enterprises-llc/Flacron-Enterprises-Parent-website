"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Check } from "lucide-react";
import { track } from "@/lib/analytics";

type State = "idle" | "loading" | "sent";

const quickPrompts = [
  "What does Flacron do?",
  "I want a demo",
  "Talk to a human",
];

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  function toggle() {
    const next = !open;
    setOpen(next);
    track(next ? "chat_widget_opened" : "chat_widget_closed");
  }

  function sendPrompt(text: string) {
    setMessage(text);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setState("loading");
    try {
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Live chat visitor",
          email: email || "no-email-provided@flacron.com",
          message,
          source: "live_chat",
        }),
      });
    } catch {
      // silent — don't block UX if Firestore is down
    }
    track("chat_widget_message_sent");
    setState("sent");
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="absolute bottom-16 left-0 w-[min(92vw,340px)] overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            <div className="flex items-center justify-between bg-[#FE4705] px-4 py-3">
              <p className="text-sm font-bold text-white">Chat with Flacron</p>
              <button onClick={toggle} className="text-white/80 hover:text-white" aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              {state === "sent" ? (
                <div className="flex flex-col items-center gap-2 py-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="text-sm font-bold text-white">Message sent!</p>
                  <p className="text-xs text-slate-400">Our team typically replies within a few hours.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    👋 Hi! Ask us anything about Flacron&apos;s AI products, or leave a message and our team will get back to you.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {quickPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendPrompt(p)}
                        className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:border-[#FE4705] hover:text-[#FE4705] transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <form onSubmit={handleSubmit} className="mt-3 space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email (optional)"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/40 focus:border-[#FE4705] transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/40 focus:border-[#FE4705] transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={state === "loading"}
                        className="flex shrink-0 items-center justify-center rounded-xl bg-[#FE4705] px-3 text-white hover:bg-[#D83C04] transition-colors disabled:opacity-60"
                        aria-label="Send"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FE4705] text-white shadow-[0_4px_24px_rgba(254, 71, 5,0.4)] hover:bg-[#D83C04] transition-colors"
        aria-label="Open chat"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}

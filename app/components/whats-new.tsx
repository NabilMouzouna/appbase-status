"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export interface WhatsNewItem {
  id: string;
  message_en: string;
  message_fr: string | null;
  message_ar: string | null;
  created_at: string | null;
}

export function WhatsNew({
  items,
  lang,
  title,
  closeLabel,
}: {
  items: WhatsNewItem[];
  lang: "en" | "fr" | "ar";
  title: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(true);

  if (!open || items.length === 0) return null;

  const isRTL = lang === "ar";

  function pickMessage(item: WhatsNewItem): string {
    if (lang === "fr") return item.message_fr || item.message_en;
    if (lang === "ar") return item.message_ar || item.message_en;
    return item.message_en;
  }

  return (
    <div
      role="dialog"
      aria-label={title}
      dir={isRTL ? "rtl" : "ltr"}
      className={`fixed bottom-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-white shadow-xl ${
        isRTL ? "left-4" : "right-4"
      }`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {title}
          </span>
        </div>
        <button
          type="button"
          aria-label={closeLabel}
          onClick={() => setOpen(false)}
          className="rounded-full p-1 text-muted hover:bg-zinc-100 hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <ul className="max-h-72 overflow-y-auto p-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-lg px-3 py-2.5 text-sm leading-relaxed text-foreground hover:bg-zinc-50 whitespace-pre-line"
          >
            {pickMessage(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

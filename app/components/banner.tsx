"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "appbase.bannerDismissed";

export function Banner({
  message,
  ctaLabel,
  ctaHref,
  closeLabel,
}: {
  message: string;
  ctaLabel: string;
  ctaHref: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) !== "1") {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-3 bg-foreground text-background px-4 py-2.5 text-sm font-medium border-b border-foreground">
      <span className="text-center">
        {message}{" "}
        <Link
          href={ctaHref}
          className="underline underline-offset-4 hover:no-underline whitespace-nowrap"
        >
          {ctaLabel}
        </Link>
      </span>
      <button
        type="button"
        aria-label={closeLabel}
        onClick={() => {
          setOpen(false);
          window.localStorage.setItem(STORAGE_KEY, "1");
        }}
        className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-background/10 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

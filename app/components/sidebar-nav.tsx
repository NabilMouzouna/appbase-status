"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  href?: string;
}

export function SidebarNav({
  items,
  variant,
}: {
  items: NavItem[];
  variant: "desktop" | "mobile";
}) {
  const anchorItems = items.filter((i) => !i.href);
  const [activeId, setActiveId] = useState(anchorItems[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );

    for (const item of anchorItems) {
      const el = document.getElementById(item.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [anchorItems]);

  function renderItem(item: NavItem, isActive: boolean) {
    if (item.href) {
      return (
        <Link key={item.id} href={item.href} className={isActive ? "active" : ""}>
          {item.label}
        </Link>
      );
    }
    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        className={isActive ? "active" : ""}
      >
        {item.label}
      </a>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="mobile-nav" aria-label="Page sections">
        <div className="mobile-nav-inner">
          {items.map((item) => renderItem(item, activeId === item.id))}
        </div>
      </div>
    );
  }

  return (
    <nav className="sidebar-nav" aria-label="Page sections">
      <div className="space-y-0.5">
        {items.map((item) => renderItem(item, activeId === item.id))}
      </div>
    </nav>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";

interface NavItem {
  id: string;
  label: string;
}

export function SidebarNav({
  items,
  variant,
}: {
  items: NavItem[];
  variant: "desktop" | "mobile";
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
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

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (variant === "mobile") {
    return (
      <div className="mobile-nav" aria-label="Page sections">
        <div className="mobile-nav-inner">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="sidebar-nav" aria-label="Page sections">
      <div className="space-y-0.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? "active" : ""}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

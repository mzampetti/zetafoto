"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;

      requestAnimationFrame(() => {
        const el =
          document.scrollingElement ||
          document.documentElement ||
          document.body;
        el.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
  }, [pathname]);

  return null;
}

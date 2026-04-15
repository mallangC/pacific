"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathname,
        referrer: document.referrer || null,
        language: navigator.language,
        screen_width: window.screen.width,
        is_mobile: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}

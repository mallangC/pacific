"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const VIEW_COOLDOWN = 5 * 60 * 1000; // 5분

export default function NoticeViewTracker({ noticeId }: { noticeId: string }) {
  const didTrack = useRef(false);

  useEffect(() => {
    if (didTrack.current) return;
    didTrack.current = true;

    const key = `notice_view_${noticeId}`;
    const last = localStorage.getItem(key);
    const now = Date.now();

    if (!last || now - parseInt(last, 10) > VIEW_COOLDOWN) {
      localStorage.setItem(key, String(now));
      createClient().rpc("increment_notice_view", { notice_id: noticeId }).then(({ error }) => {
        if (error) console.error("조회수 오류:", error);
      });
    }
  }, [noticeId]);

  return null;
}

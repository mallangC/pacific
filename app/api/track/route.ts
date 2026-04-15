import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 봇 판별용 키워드
const BOT_PATTERNS = /bot|crawler|spider|crawling|googlebot|bingbot|yandex|baidu|duckduckbot|facebookexternalhit|slurp/i;

function parseReferrerSource(ref: string | null | undefined): string {
  if (!ref) return "직접 접속";
  try {
    const host = new URL(ref).hostname.replace("www.", "");
    if (host.includes("google")) return "Google";
    if (host.includes("naver")) return "Naver";
    if (host.includes("daum") || host.includes("kakao")) return "Daum/Kakao";
    if (host.includes("bing")) return "Bing";
    return host;
  } catch {
    return "기타";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pathname, referrer, language, screen_width, is_mobile } = body;

    // 봇 필터링
    const userAgent = req.headers.get("user-agent") ?? "";
    if (BOT_PATTERNS.test(userAgent)) {
      return NextResponse.json({ ok: false, reason: "bot" });
    }

    // admin, api 경로 제외
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/api")) {
      return NextResponse.json({ ok: false, reason: "excluded" });
    }

    // IP 추출
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // Vercel 배포 시 국가 자동 제공
    const country = req.headers.get("x-vercel-ip-country") ?? null;
    const city = req.headers.get("x-vercel-ip-city")
      ? decodeURIComponent(req.headers.get("x-vercel-ip-city")!)
      : null;

    const source = parseReferrerSource(referrer);
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const supabase = await createClient();
    await Promise.all([
      supabase.from("page_views").upsert(
        {
          pathname: pathname ?? "/",
          referrer: referrer || null,
          country,
          city,
          ip,
          user_agent: userAgent || null,
          language: language || null,
          screen_width: screen_width ? Number(screen_width) : null,
          is_mobile: is_mobile ?? false,
        },
        { onConflict: "ip" }
      ),
      supabase.rpc("increment_referrer", { source_name: source }),
      supabase.from("daily_visitor_ips").insert({ date: dateStr, ip }).then(() => {}),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

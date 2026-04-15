"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface PageView {
  id: string;
  ip: string | null;
  is_mobile: boolean;
}

interface ReferrerStat {
  source: string;
  count: number;
}

interface DailyRow {
  date: string;
  count: number;
}

type Range = "today" | "7d" | "30d";

const RANGE_LABEL: Record<Range, string> = {
  today: "오늘",
  "7d": "7일",
  "30d": "30일",
};

function LineChart({ rows }: { rows: DailyRow[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 600;
  const H = 100;
  const PAD = { top: 16, bottom: 20, left: 8, right: 8 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const max = Math.max(...rows.map(r => r.count), 1);
  const n = rows.length;

  if (n < 2) return null;

  const px = (i: number) => PAD.left + (i / (n - 1)) * innerW;
  const py = (v: number) => PAD.top + innerH - (v / max) * innerH;

  const points = rows.map((r, i) => ({ x: px(i), y: py(r.count), ...r }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[n - 1].x} ${PAD.top + innerH} L ${points[0].x} ${PAD.top + innerH} Z`;

  // 날짜 레이블: 첫날, 마지막날만
  const labels = [0, n - 1];

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 120 }}
        onMouseLeave={() => setHovered(null)}
      >
        {/* 그라디언트 */}
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 영역 */}
        <path d={areaD} fill="url(#area-grad)" />

        {/* 라인 */}
        <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* 날짜 레이블 */}
        {labels.map(i => (
          <text
            key={i}
            x={points[i].x}
            y={H}
            textAnchor={i === 0 ? "start" : "end"}
            fontSize="9"
            fill="#9ca3af"
          >
            {points[i].date.slice(5)}
          </text>
        ))}

        {/* 호버 영역 + 점 */}
        {points.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x - (innerW / n) / 2}
              y={PAD.top}
              width={innerW / n}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
            />
            {hovered === i && (
              <>
                <line x1={p.x} y1={PAD.top} x2={p.x} y2={PAD.top + innerH} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3 2" />
                <circle cx={p.x} cy={p.y} r="3.5" fill="white" stroke="var(--primary)" strokeWidth="1.5" />
                <rect
                  x={Math.min(Math.max(p.x - 22, PAD.left), W - PAD.right - 44)}
                  y={p.y - 24}
                  width="44"
                  height="16"
                  rx="3"
                  fill="#1f2937"
                />
                <text
                  x={Math.min(Math.max(p.x, PAD.left + 22), W - PAD.right - 22)}
                  y={p.y - 13}
                  textAnchor="middle"
                  fontSize="9"
                  fill="white"
                >
                  {p.date.slice(5)} {p.count}명
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function getDateStr(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DashboardPage() {
  const [range, setRange] = useState<Range>("today");
  const [views, setViews] = useState<PageView[]>([]);
  const [referrerStats, setReferrerStats] = useState<ReferrerStat[]>([]);
  const [dailyRows, setDailyRows] = useState<DailyRow[]>([]);
  const [loading, setLoading] = useState(true);

  // 전체 누적 통계 (최초 1회)
  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("page_views").select("id, ip, is_mobile"),
      supabase.from("referrer_stats").select("source, count").order("count", { ascending: false }),
    ]).then(([{ data: v }, { data: r }]) => {
      setViews(v ?? []);
      setReferrerStats(r ?? []);
      setLoading(false);
    });
  }, []);

  // 기간별 일별 방문자
  useEffect(() => {
    const days = range === "today" ? 0 : range === "7d" ? 6 : 29;
    const from = getDateStr(days);
    const supabase = createClient();
    supabase
      .from("daily_visitor_ips")
      .select("date")
      .gte("date", from)
      .then(({ data }) => {
        const map: Record<string, number> = {};
        (data ?? []).forEach(r => {
          map[r.date] = (map[r.date] ?? 0) + 1;
        });
        const result: DailyRow[] = [];
        for (let i = days; i >= 0; i--) {
          const d = getDateStr(i);
          result.push({ date: d, count: map[d] ?? 0 });
        }
        setDailyRows(result);
      });
  }, [range]);

  const todayStr = getDateStr(0);
  const rangeVisitors = range === "today"
    ? (dailyRows.find(r => r.date === todayStr)?.count ?? 0)
    : dailyRows.reduce((s, r) => s + r.count, 0);

  const uniqueVisitors = views.length;
  const mobileCount = views.filter(r => r.is_mobile).length;
  const desktopCount = uniqueVisitors - mobileCount;
  const dailyMax = Math.max(...dailyRows.map(r => r.count), 1);

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-900 mb-6">방문자 분석</h1>

      {/* 기간 탭 */}
      <div className="flex gap-1 mb-6 border-b border-gray-100">
        {(["today", "7d", "30d"] as Range[]).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-5 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
              range === r
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-400 hover:text-primary"
            }`}
          >
            {RANGE_LABEL[r]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-sm text-gray-400">로딩 중...</div>
      ) : (
        <>
          {/* 요약 카드 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-100 p-5">
              <p className="text-xs text-gray-400 mb-2">{RANGE_LABEL[range]} 방문자</p>
              <p className="text-2xl font-semibold text-gray-900">{rangeVisitors.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-gray-100 p-5">
              <p className="text-xs text-gray-400 mb-2">순 방문자 (누적)</p>
              <p className="text-2xl font-semibold text-gray-900">{uniqueVisitors.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-gray-100 p-5">
              <p className="text-xs text-gray-400 mb-2">PC / 모바일</p>
              <p className="text-2xl font-semibold text-gray-900">
                {desktopCount} <span className="text-base text-gray-400 font-normal">/ {mobileCount}</span>
              </p>
            </div>
          </div>

          {/* 일별 방문자 라인 차트 (오늘 제외) */}
          {range !== "today" && (
            <div className="bg-white border border-gray-100 p-5 mb-6">
              <p className="text-sm font-medium text-gray-700 mb-4">일별 방문자</p>
              <LineChart rows={dailyRows} />
            </div>
          )}

          {/* 유입 경로 */}
          <div className="bg-white border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-700 mb-4">유입 경로 (누적)</p>
            {referrerStats.length === 0 ? (
              <p className="text-xs text-gray-400">데이터 없음</p>
            ) : (
              <ol className="space-y-2">
                {referrerStats.map((item, i) => (
                  <li key={item.source} className="flex items-center gap-2">
                    <span className="text-xs text-gray-300 w-4 shrink-0">{i + 1}</span>
                    <span className="text-xs text-gray-600 flex-1 truncate">{item.source}</span>
                    <span className="text-xs font-medium text-gray-900 shrink-0">{item.count}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </div>
  );
}

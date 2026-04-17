"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

interface Row {
  id: string;
  buy_date: string;
  stock_name: string;
  status: string;
  return_rate: number | null;
}

const WEEK_DAYS = ["월", "화", "수", "목", "금", "토", "일"];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function IndexPortfolioPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setSelectedDate(null);
    const supabase = createClient();
    supabase
      .from("index_returns")
      .select("*")
      .eq("target_year", year)
      .eq("target_month", month)
      .order("buy_date", { ascending: true })
      .then(({ data }) => {
        setRows(data ?? []);
        setLoading(false);
      });
  }, [year, month]);

  // 날짜별 그룹핑
  const byDate: Record<string, Row[]> = {};
  rows.forEach(r => {
    if (!byDate[r.buy_date]) byDate[r.buy_date] = [];
    byDate[r.buy_date].push(r);
  });

  // 전체 수익률
  const closedRows = rows.filter(r => r.return_rate != null);
  const totalReturn = closedRows.reduce((sum, r) => sum + (r.return_rate ?? 0), 0);
  const totalReturnStr = totalReturn > 0 ? `+${totalReturn.toFixed(2)}%` : `${totalReturn.toFixed(2)}%`;

  // 달력 계산 (월요일 시작)
  const firstDow = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const startOffset = (firstDow + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  function prevMonth() {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  }

  const selectedRows = selectedDate ? (byDate[selectedDate] ?? []) : [];

  return (
    <div>
      <PageHeader title="지수거래 수익률" />

      <section className="pb-10 md:pb-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* 월 네비게이션 */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-lg">‹</button>
            <span className="text-lg font-light text-gray-900 w-32 text-center">
              {year}년 {month}월
            </span>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-lg">›</button>
          </div>

          {/* 월 전체 수익률 */}
          {!loading && rows.length > 0 && (
            <div className="border-t border-b border-gray-200 py-3 flex items-center justify-end gap-4 mb-8 px-1">
              <span className="text-xs text-gray-400">{year}년 {month}월 전체 수익률</span>
              <span className={`text-sm font-semibold ${totalReturn >= 0 ? "text-red-500" : "text-blue-500"}`}>
                {totalReturnStr}
              </span>
            </div>
          )}

          {/* 달력 */}
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">로딩 중...</div>
          ) : (
            <>
              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 border-t border-l border-gray-200">
                {WEEK_DAYS.map(d => (
                  <div key={d} className="border-r border-b border-gray-200 py-2 text-center text-xs text-gray-400 font-medium">
                    {d}
                  </div>
                ))}
              </div>

              {/* 날짜 셀 */}
              <div className="grid grid-cols-7 border-l border-gray-200">
                {Array.from({ length: totalCells }).map((_, i) => {
                  const dayNum = i - startOffset + 1;
                  const isValid = dayNum >= 1 && dayNum <= daysInMonth;
                  const dateKey = isValid ? toDateKey(year, month, dayNum) : "";
                  const dayRows = isValid ? (byDate[dateKey] ?? []) : [];
                  const hasData = dayRows.length > 0;
                  const dayReturn = dayRows.reduce((s, r) => s + (r.return_rate ?? 0), 0);
                  const isSelected = dateKey === selectedDate;

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (!isValid || !hasData) return;
                        setSelectedDate(isSelected ? null : dateKey);
                      }}
                      className={`border-r border-b border-gray-200 min-h-[60px] sm:min-h-[72px] p-1 sm:p-2 transition-colors
                        ${!isValid ? "bg-gray-50" : ""}
                        ${hasData ? "cursor-pointer" : ""}
                        ${isSelected ? "bg-primary/5 ring-1 ring-inset ring-primary" : hasData ? "hover:bg-gray-50" : ""}
                      `}
                    >
                      {isValid && (
                        <>
                          <p className={`text-xs font-medium mb-1 ${isSelected ? "text-primary" : "text-gray-700"}`}>
                            {dayNum}
                          </p>
                          {hasData && (
                            <div className="space-y-0.5">
                              <p className="text-[10px] text-gray-400">{dayRows.length}건</p>
                              <p className={`text-xs font-semibold ${dayReturn >= 0 ? "text-red-500" : "text-blue-500"}`}>
                                <span className="sm:hidden">{dayReturn > 0 ? "+" : ""}{dayReturn.toFixed(1)}%</span>
                                <span className="hidden sm:inline">{dayReturn > 0 ? "+" : ""}{dayReturn.toFixed(2)}%</span>
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 선택된 날짜 상세 */}
              {selectedDate && selectedRows.length > 0 && (
                <div className="mt-6 border border-gray-200">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {selectedDate.replace(/-/g, ".")} 거래 내역
                    </span>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-2.5 text-left">종목명</th>
                        <th className="px-4 py-2.5 text-center">상태</th>
                        <th className="px-4 py-2.5 text-right">수익률</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {selectedRows.map(row => (
                        <tr key={row.id}>
                          <td className="px-4 py-3 font-medium text-gray-900">{row.stock_name}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${row.status === "익절" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-500"}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-right font-medium ${row.return_rate == null ? "text-gray-400" : row.return_rate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                            {row.return_rate != null ? `${row.return_rate > 0 ? "+" : ""}${row.return_rate}%` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </div>
  );
}

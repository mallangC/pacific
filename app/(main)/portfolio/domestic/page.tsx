"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

interface Row {
  id: string;
  buy_date: string;
  stock_name: string;
  stock_code: string;
  entry_price: number;
  status: string;
  sell_date: string | null;
  sell_price: number | null;
  return_rate: number | null;
}

export default function DomesticPortfolioPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    supabase
      .from("domestic_returns")
      .select("*")
      .eq("target_year", year)
      .eq("target_month", month)
      .order("buy_date", { ascending: true })
      .then(({ data }) => {
        setRows(data ?? []);
        setLoading(false);
      });
  }, [year, month]);

  const closedRows = rows.filter(r => r.return_rate != null && r.status !== "보유중");
  const totalReturn = closedRows.reduce((sum, r) => sum + (r.return_rate ?? 0), 0);
  const totalReturnStr = totalReturn > 0 ? `+${totalReturn.toFixed(2)}%` : `${totalReturn.toFixed(2)}%`;

  function prevMonth() {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  }

  return (
    <div>
      <PageHeader title="국내주식 수익률" />

      <section className="pb-10 md:pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* 월 네비게이션 */}
          <div className="flex items-center justify-center gap-6 mb-10">
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

          {/* 테이블 */}
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">로딩 중...</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">해당 월의 데이터가 없습니다.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-t border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
                    <th className="px-4 py-3 text-left">매수일자</th>
                    <th className="px-4 py-3 text-left">종목명</th>
                    <th className="px-4 py-3 text-left">종목코드</th>
                    <th className="px-4 py-3 text-right">진입가</th>
                    <th className="px-4 py-3 text-center">상태</th>
                    <th className="px-4 py-3 text-left">매도일자</th>
                    <th className="px-4 py-3 text-right">매도가</th>
                    <th className="px-4 py-3 text-right">수익률</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.map(row => (
                    <tr key={row.id} className="text-gray-700">
                      <td className="px-4 py-3 text-gray-500">{row.buy_date}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.stock_name}</td>
                      <td className="px-4 py-3 text-gray-500">{row.stock_code}</td>
                      <td className="px-4 py-3 text-right">{row.entry_price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.status === "익절" ? "bg-green-50 text-green-600" : row.status === "손절" ? "bg-blue-50 text-blue-500" : row.status === "보합" ? "bg-gray-100 text-gray-500" : "bg-yellow-50 text-yellow-600"}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{row.sell_date ?? "-"}</td>
                      <td className="px-4 py-3 text-right">{row.sell_price != null ? row.sell_price.toLocaleString() : "-"}</td>
                      <td className={`px-4 py-3 text-right font-medium ${row.return_rate == null ? "text-gray-400" : row.return_rate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                        {row.return_rate != null ? `${row.return_rate > 0 ? "+" : ""}${row.return_rate}%` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

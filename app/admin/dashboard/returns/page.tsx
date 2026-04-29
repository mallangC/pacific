"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";

/* ─── 타입 ─────────────────────────────────────────── */
interface DomesticReturn {
  id: string;
  buy_date: string;
  stock_name: string;
  stock_code: string;
  entry_price: number;
  status: string;
  sell_date: string | null;
  sell_price: number | null;
  return_rate: number | null;
  target_year: number;
  target_month: number;
}

interface IndexReturn {
  id: string;
  buy_date: string;
  stock_name: string;
  status: string;
  return_rate: number | null;
  target_year: number;
  target_month: number;
}

const DOMESTIC_EMPTY = {
  buy_date: "",
  stock_name: "",
  stock_code: "",
  entry_price: "",
  status: "보유중",
  sell_date: "",
  sell_price: "",
  return_rate: "",
  target_year: new Date().getFullYear(),
  target_month: new Date().getMonth() + 1,
};

const INDEX_EMPTY = {
  buy_date: "",
  stock_name: "",
  status: "익절",
  return_rate: "",
  target_year: new Date().getFullYear(),
  target_month: new Date().getMonth() + 1,
};

function statusBadge(status: string) {
  switch (status) {
    case "익절": return "bg-green-50 text-green-600";
    case "손절": return "bg-blue-50 text-blue-500";
    case "보합": return "bg-gray-100 text-gray-500";
    case "보유중": return "bg-yellow-50 text-yellow-600";
    default: return "bg-gray-100 text-gray-500";
  }
}

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/* ─── 공통 모달 레이아웃 ────────────────────────────── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── 공통 스타일 ────────────────────────────────────── */
const inputCls = "w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors";

/* ─── 콤마 숫자 입력 ────────────────────────────────── */
function NumberInput({ value, onChange, placeholder, decimal = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  decimal?: boolean;
}) {
  function format(val: string): string {
    if (!val && val !== "0") return "";
    const [int, dec] = val.split(".");
    const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return dec !== undefined ? `${formatted}.${dec}` : formatted;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const allow = decimal ? /[^0-9.-]/g : /[^0-9-]/g;
    const raw = e.target.value.replace(/,/g, "").replace(allow, "");
    onChange(raw);
  }

  return (
    <input
      type="text"
      inputMode={decimal ? "decimal" : "numeric"}
      value={format(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

/* ─── 필드 래퍼 ─────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

/* ─── 커스텀 드롭다운 (Portal) ──────────────────────── */
function Dropdown({ buttonLabel, value, options, onChange }: {
  buttonLabel: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        listRef.current && !listRef.current.contains(e.target as Node)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleOpen() {
    if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen(v => !v);
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center justify-between border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors bg-white"
      >
        <span>{buttonLabel}</span>
        <span className={`text-gray-400 text-xs transition-transform duration-150 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && rect && createPortal(
        <ul
          ref={listRef}
          style={{ position: "fixed", top: rect.bottom + 4, left: rect.left, width: rect.width }}
          className="z-[9999] bg-white border border-gray-200 shadow-lg overflow-y-auto max-h-48"
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${value === opt ? "text-gray-900 font-medium bg-gray-50" : "text-gray-600"}`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}

/* ─── 날짜 / 년월 선택용 데이터 ─────────────────────── */
const _now = new Date();
const TODAY_YEAR  = _now.getFullYear();
const TODAY_MONTH = _now.getMonth() + 1;
const TODAY_DAY   = _now.getDate();
const ALL_YEARS = Array.from({ length: 12 }, (_, i) => TODAY_YEAR + 2 - i);

function daysInMonth(y: number, m: number) {
  return new Date(y, m, 0).getDate();
}

/* ─── 날짜 선택 (년/월/일 커스텀 드롭다운) ──────────── */
function DatePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parts = value ? value.split("-") : ["", "", ""];
  const [y, setY] = useState(parts[0]);
  const [m, setM] = useState(parts[1] ? String(Number(parts[1])) : "");
  const [d, setD] = useState(parts[2] ? String(Number(parts[2])) : "");

  const selYear  = Number(y) || TODAY_YEAR;
  const selMonth = Number(m) || TODAY_MONTH;

  const availableMonths = Array.from({ length: 12 }, (_, i) => i + 1);
  const maxDay = daysInMonth(selYear, selMonth);
  const availableDays = Array.from({ length: maxDay }, (_, i) => i + 1);

  function emit(newY: string, newM: string, newD: string) {
    if (newY && newM && newD) {
      onChange(`${newY}-${newM.padStart(2, "0")}-${newD.padStart(2, "0")}`);
    }
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Dropdown
          buttonLabel={y ? `${y}년` : "년"}
          value={y}
          options={ALL_YEARS.map(yr => String(yr))}
          onChange={v => { setY(v); emit(v, m, d); }}
        />
      </div>
      <div className="flex-1">
        <Dropdown
          buttonLabel={m ? `${m}월` : "월"}
          value={m}
          options={availableMonths.map(mo => String(mo))}
          onChange={v => { setM(v); emit(y, v, d); }}
        />
      </div>
      <div className="flex-1">
        <Dropdown
          buttonLabel={d ? `${d}일` : "일"}
          value={d}
          options={availableDays.map(dy => String(dy))}
          onChange={v => { setD(v); emit(y, m, v); }}
        />
      </div>
    </div>
  );
}

/* ─── 년/월 선택 (커스텀 드롭다운) ─────────────────── */
function YearMonthPicker({ year, month, onYearChange, onMonthChange }: {
  year: number; month: number;
  onYearChange: (v: number) => void;
  onMonthChange: (v: number) => void;
}) {
  const availableMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Dropdown
          buttonLabel={`${year}년`}
          value={String(year)}
          options={ALL_YEARS.map(y => String(y))}
          onChange={v => onYearChange(Number(v))}
        />
      </div>
      <div className="flex-1">
        <Dropdown
          buttonLabel={`${month}월`}
          value={String(month)}
          options={availableMonths.map(m => String(m))}
          onChange={v => onMonthChange(Number(v))}
        />
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ───────────────────────────────────── */
export default function ReturnsAdminPage() {
  const now = new Date();
  const [tab, setTab] = useState<"domestic" | "index">("domestic");
  const [filterYear, setFilterYear] = useState(now.getFullYear());
  const [filterMonth, setFilterMonth] = useState(now.getMonth() + 1);
  const [domesticList, setDomesticList] = useState<DomesticReturn[]>([]);
  const [indexList, setIndexList] = useState<IndexReturn[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<DomesticReturn | IndexReturn | null>(null);
  const [dForm, setDForm] = useState({ ...DOMESTIC_EMPTY });
  const [iForm, setIForm] = useState({ ...INDEX_EMPTY });
  const [saving, setSaving] = useState(false);
  const [selectedAdminDate, setSelectedAdminDate] = useState<string | null>(null);

  /* ─── 데이터 로드 ─── */
  async function load(y = filterYear, m = filterMonth) {
    setLoading(true);
    const supabase = createClient();
    const [{ data: d }, { data: i }] = await Promise.all([
      supabase.from("domestic_returns").select("*").eq("target_year", y).eq("target_month", m).order("buy_date", { ascending: true }),
      supabase.from("index_returns").select("*").eq("target_year", y).eq("target_month", m).order("buy_date", { ascending: true }),
    ]);
    setDomesticList(d ?? []);
    setIndexList(i ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load(filterYear, filterMonth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterYear, filterMonth]);

  function prevMonth() {
    if (filterMonth === 1) { setFilterYear(y => y - 1); setFilterMonth(12); }
    else setFilterMonth(m => m - 1);
  }
  function nextMonth() {
    if (filterMonth === 12) { setFilterYear(y => y + 1); setFilterMonth(1); }
    else setFilterMonth(m => m + 1);
  }

  /* ─── 모달 열기 ─── */
  function openAdd() {
    setEditTarget(null);
    setDForm({ ...DOMESTIC_EMPTY });
    setIForm({ ...INDEX_EMPTY });
    setModal("add");
  }

  function openEdit(row: DomesticReturn | IndexReturn) {
    setEditTarget(row);
    if (tab === "domestic") {
      const r = row as DomesticReturn;
      setDForm({
        buy_date: r.buy_date ?? "",
        stock_name: r.stock_name,
        stock_code: r.stock_code,
        entry_price: String(r.entry_price),
        status: r.status,
        sell_date: r.sell_date ?? "",
        sell_price: r.sell_price != null ? String(r.sell_price) : "",
        return_rate: r.return_rate != null ? String(r.return_rate) : "",
        target_year: r.target_year,
        target_month: r.target_month,
      });
    } else {
      const r = row as IndexReturn;
      setIForm({
        buy_date: r.buy_date ?? "",
        stock_name: r.stock_name,
        status: r.status,
        return_rate: r.return_rate != null ? String(r.return_rate) : "",
        target_year: r.target_year,
        target_month: r.target_month,
      });
    }
    setModal("edit");
  }

  function closeModal() {
    setModal(null);
    setEditTarget(null);
  }

  /* ─── 저장 (등록/수정) ─── */
  async function handleSave() {
    setSaving(true);
    const supabase = createClient();

    if (tab === "domestic") {
      const payload = {
        buy_date: dForm.buy_date || null,
        stock_name: dForm.stock_name,
        stock_code: dForm.stock_code,
        entry_price: Number(dForm.entry_price),
        status: dForm.status,
        sell_date: dForm.sell_date || null,
        sell_price: dForm.sell_price !== "" ? Number(dForm.sell_price) : null,
        return_rate: dForm.return_rate !== "" ? Number(dForm.return_rate) : null,
        target_year: Number(dForm.target_year),
        target_month: Number(dForm.target_month),
      };
      if (modal === "edit" && editTarget) {
        await supabase.from("domestic_returns").update(payload).eq("id", editTarget.id);
      } else {
        await supabase.from("domestic_returns").insert([payload]);
      }
    } else {
      const payload = {
        buy_date: iForm.buy_date || null,
        stock_name: iForm.stock_name,
        status: iForm.status,
        return_rate: iForm.return_rate !== "" ? Number(iForm.return_rate) : null,
        target_year: Number(iForm.target_year),
        target_month: Number(iForm.target_month),
      };
      if (modal === "edit" && editTarget) {
        await supabase.from("index_returns").update(payload).eq("id", editTarget.id);
      } else {
        await supabase.from("index_returns").insert([payload]);
      }
    }

    await load();
    setSaving(false);
    closeModal();
  }

  /* ─── 삭제 ─── */
  async function handleDelete(id: string) {
    if (!confirm("삭제하시겠습니까?")) return;
    const supabase = createClient();
    const table = tab === "domestic" ? "domestic_returns" : "index_returns";
    await supabase.from(table).delete().eq("id", id);
    await load();
  }


  /* ─── 렌더 ─── */
  return (
    <div>
      <h1 className="text-xl font-medium text-gray-900 mb-6">수익률 관리</h1>

      {/* 탭 */}
      <div className="flex gap-1 mb-6 border-b border-gray-100">
        {(["domestic", "index"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelectedAdminDate(null); }}
            className={`px-5 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
              tab === t ? "border-primary text-primary font-medium" : "border-transparent text-gray-400 hover:text-primary"
            }`}
          >
            {t === "domestic" ? "국내주식" : "지수거래"}
          </button>
        ))}
      </div>

      {/* 월 네비게이션 + 추가 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-lg">‹</button>
          <span className="text-sm font-medium text-gray-900 w-24 text-center">{filterYear}년 {filterMonth}월</span>
          <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-lg">›</button>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-primary text-white text-sm hover:bg-primary-dark transition-colors">
          + 추가
        </button>
      </div>

      {/* 목록 */}
      {loading ? (
        <div className="py-12 text-center text-sm text-gray-400">로딩 중...</div>
      ) : tab === "domestic" ? (
        <div className="bg-white border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
                <th className="px-4 py-3 text-left">표시 년월</th>
                <th className="px-4 py-3 text-left">매수일자</th>
                <th className="px-4 py-3 text-left">종목명</th>
                <th className="px-4 py-3 text-left">종목코드</th>
                <th className="px-4 py-3 text-right">진입가</th>
                <th className="px-4 py-3 text-center">상태</th>
                <th className="px-4 py-3 text-right">매도가</th>
                <th className="px-4 py-3 text-right">수익률</th>
                <th className="px-4 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {domesticList.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400">등록된 데이터가 없습니다.</td></tr>
              ) : domesticList.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-600">{row.target_year}년 {row.target_month}월</td>
                  <td className="px-4 py-3 text-gray-600">{row.buy_date}</td>
                  <td className="px-4 py-3 text-gray-800 font-medium">{row.stock_name}</td>
                  <td className="px-4 py-3 text-gray-500">{row.stock_code}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.entry_price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.sell_price != null ? row.sell_price.toLocaleString() : "-"}</td>
                  <td className={`px-4 py-3 text-right font-medium ${row.return_rate != null && row.return_rate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                    {row.return_rate != null ? `${row.return_rate > 0 ? "+" : ""}${row.return_rate}%` : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => openEdit(row)} className="text-xs text-gray-500 hover:text-gray-900 transition-colors">수정</button>
                      <button onClick={() => handleDelete(row.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (() => {
        // 달력 계산
        const byDate: Record<string, IndexReturn[]> = {};
        indexList.forEach(r => {
          if (!byDate[r.buy_date]) byDate[r.buy_date] = [];
          byDate[r.buy_date].push(r);
        });
        const firstDow = new Date(filterYear, filterMonth - 1, 1).getDay();
        const startOffset = (firstDow + 6) % 7;
        const daysInMonth = new Date(filterYear, filterMonth, 0).getDate();
        const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
        const toDateKey = (y: number, mo: number, d: number) =>
          `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const selectedRows = selectedAdminDate ? (byDate[selectedAdminDate] ?? []) : [];

        return (
          <div>
            {/* 달력 */}
            {indexList.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-400">등록된 데이터가 없습니다.</div>
            ) : (
              <>
                {/* 요일 헤더 */}
                <div className="grid grid-cols-7 border-t border-l border-gray-200">
                  {["월","화","수","목","금","토","일"].map(d => (
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
                    const dateKey = isValid ? toDateKey(filterYear, filterMonth, dayNum) : "";
                    const dayRows = isValid ? (byDate[dateKey] ?? []) : [];
                    const hasData = dayRows.length > 0;
                    const dayReturn = dayRows.reduce((s, r) => s + (r.return_rate ?? 0), 0);
                    const isSelected = dateKey === selectedAdminDate;

                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (!isValid || !hasData) return;
                          setSelectedAdminDate(isSelected ? null : dateKey);
                        }}
                        className={`border-r border-b border-gray-200 min-h-[72px] p-2 transition-colors
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
                                  {dayReturn > 0 ? "+" : ""}{dayReturn.toFixed(2)}%
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
                {selectedAdminDate && selectedRows.length > 0 && (
                  <div className="mt-6 border border-gray-200">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {selectedAdminDate.replace(/-/g, ".")} 거래 내역
                      </span>
                      <button onClick={() => setSelectedAdminDate(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
                          <th className="px-4 py-2.5 text-left">종목명</th>
                          <th className="px-4 py-2.5 text-center">상태</th>
                          <th className="px-4 py-2.5 text-right">수익률</th>
                          <th className="px-4 py-2.5 text-center">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {selectedRows.map(row => (
                          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{row.stock_name}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge(row.status)}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className={`px-4 py-3 text-right font-medium ${row.return_rate != null && row.return_rate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                              {row.return_rate != null ? `${row.return_rate > 0 ? "+" : ""}${row.return_rate}%` : "-"}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center gap-3">
                                <button onClick={() => openEdit(row)} className="text-xs text-gray-500 hover:text-gray-900 transition-colors">수정</button>
                                <button onClick={() => handleDelete(row.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">삭제</button>
                              </div>
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
        );
      })()}

      {/* 모달 */}
      {modal && (
        <Modal
          title={`${tab === "domestic" ? "국내주식" : "지수거래"} ${modal === "add" ? "추가" : "수정"}`}
          onClose={closeModal}
        >
          {tab === "domestic"
            ? <DomesticForm form={dForm} setForm={setDForm} />
            : <IndexForm form={iForm} setForm={setIForm} />
          }
          <div className="flex justify-end gap-2 mt-8 pt-5 border-t border-gray-100">
            <button onClick={closeModal} className="px-5 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
              취소
            </button>
            <button onClick={handleSave} disabled={saving} className="px-5 py-2 text-sm bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-50 tracking-wide">
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─── 국내주식 폼 ───────────────────────────────────── */
type DForm = typeof DOMESTIC_EMPTY;
function DomesticForm({ form, setForm }: { form: DForm; setForm: (f: DForm) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="종목명">
          <input type="text" value={form.stock_name} onChange={e => setForm({ ...form, stock_name: e.target.value })} className={inputCls} placeholder="삼성전자" />
        </Field>
        <Field label="종목코드">
          <input type="text" value={form.stock_code} onChange={e => setForm({ ...form, stock_code: e.target.value })} className={inputCls} placeholder="005930" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="매수일자">
          <DatePicker value={form.buy_date} onChange={v => setForm({ ...form, buy_date: v })} />
        </Field>
        <Field label="진입가">
          <NumberInput value={form.entry_price} onChange={v => setForm({ ...form, entry_price: v })} placeholder="0" />
        </Field>
      </div>
      <Field label="상태">
        <Dropdown buttonLabel={form.status} value={form.status} options={["보유중", "익절", "손절", "보합"]} onChange={v => setForm({ ...form, status: v })} />
      </Field>
      <div className={`grid grid-cols-2 gap-4 transition-opacity ${form.status === "보유중" ? "opacity-30 pointer-events-none" : ""}`}>
        <Field label="매도일자">
          <DatePicker value={form.sell_date} onChange={v => setForm({ ...form, sell_date: v })} />
        </Field>
        <Field label="매도가">
          <NumberInput value={form.sell_price} onChange={v => setForm({ ...form, sell_price: v })} placeholder="0" />
        </Field>
      </div>
      <Field label="수익률 (%)">
        <NumberInput value={form.return_rate} onChange={v => setForm({ ...form, return_rate: v })} placeholder="0.00" decimal />
      </Field>
      <Field label="표시 년월">
        <YearMonthPicker
          year={form.target_year} month={form.target_month}
          onYearChange={v => setForm({ ...form, target_year: v })}
          onMonthChange={v => setForm({ ...form, target_month: v })}
        />
      </Field>
    </div>
  );
}

/* ─── 지수거래 폼 ───────────────────────────────────── */
type IForm = typeof INDEX_EMPTY;
function IndexForm({ form, setForm }: { form: IForm; setForm: (f: IForm) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="매수일자">
          <DatePicker value={form.buy_date} onChange={v => setForm({ ...form, buy_date: v })} />
        </Field>
        <Field label="상태">
          <Dropdown buttonLabel={form.status} value={form.status} options={["익절", "손절"]} onChange={v => setForm({ ...form, status: v })} />
        </Field>
      </div>
      <Field label="종목명">
        <input type="text" value={form.stock_name} onChange={e => setForm({ ...form, stock_name: e.target.value })} className={inputCls} placeholder="나스닥100" />
      </Field>
      <Field label="수익률 (%)">
        <NumberInput value={form.return_rate} onChange={v => setForm({ ...form, return_rate: v })} placeholder="0.00" decimal />
      </Field>
      <Field label="표시 년월">
        <YearMonthPicker
          year={form.target_year} month={form.target_month}
          onYearChange={v => setForm({ ...form, target_year: v })}
          onMonthChange={v => setForm({ ...form, target_month: v })}
        />
      </Field>
    </div>
  );
}

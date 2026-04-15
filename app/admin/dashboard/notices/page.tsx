"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface Notice {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

function getToday() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

// ── 모달 ────────────────────────────────────────────────────────
function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">새 공지사항 등록</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ── 커스텀 날짜 피커 ──────────────────────────────────────────
function DatePicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const parsed = value ? new Date(value + "T00:00:00") : new Date();
  const [year, setYear]   = useState(parsed.getFullYear());
  const [month, setMonth] = useState(parsed.getMonth() + 1);
  const [day, setDay]     = useState(parsed.getDate());

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      setYear(d.getFullYear());
      setMonth(d.getMonth() + 1);
      setDay(d.getDate());
    }
  }, [value]);

  function daysInMonth(y: number, m: number) {
    return new Date(y, m, 0).getDate();
  }

  function commit(y: number, m: number, d: number) {
    const maxDay = daysInMonth(y, m);
    const safeDay = Math.min(d, maxDay);
    setDay(safeDay);
    onChange(`${y}-${String(m).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`);
  }

  const now = new Date();
  const currentYear  = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay   = now.getDate();

  const years  = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1).filter(
    (m) => year < currentYear || m <= currentMonth
  );
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1).filter(
    (d) => year < currentYear || month < currentMonth || d <= currentDay
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-primary focus:outline-none focus:border-primary transition-colors bg-white"
      >
        <span>{year}년 {month}월 {day}일</span>
        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-white border border-gray-200 shadow-md w-full">
          <div className="flex divide-x divide-gray-100">
            <div className="flex-1 max-h-48 overflow-y-auto">
              <p className="text-[10px] text-gray-400 px-3 pt-2 pb-1 tracking-wide">연도</p>
              {years.map((y) => (
                <button key={y} type="button" onClick={() => { setYear(y); commit(y, month, day); }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${y === year ? "bg-primary text-white font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                  {y}
                </button>
              ))}
            </div>
            <div className="flex-1 max-h-48 overflow-y-auto">
              <p className="text-[10px] text-gray-400 px-3 pt-2 pb-1 tracking-wide">월</p>
              {months.map((m) => (
                <button key={m} type="button" onClick={() => { setMonth(m); commit(year, m, day); }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${m === month ? "bg-primary text-white font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                  {m}월
                </button>
              ))}
            </div>
            <div className="flex-1 max-h-48 overflow-y-auto">
              <p className="text-[10px] text-gray-400 px-3 pt-2 pb-1 tracking-wide">일</p>
              {days.map((d) => (
                <button key={d} type="button" onClick={() => { setDay(d); commit(year, month, d); setOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${d === day ? "bg-primary text-white font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                  {d}일
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 메인 ────────────────────────────────────────────────────────
export default function NoticesAdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", created_at: getToday() });
  const [submitting, setSubmitting] = useState(false);

  async function loadNotices() {
    const supabase = createClient();
    const { data } = await supabase.from("notices").select("*").order("created_at", { ascending: false });
    setNotices(data ?? []);
    setLoading(false);
  }

  useEffect(() => { loadNotices(); }, []);

  function openModal() {
    setForm({ title: "", content: "", created_at: getToday() });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const supabase = createClient();
    await supabase.from("notices").insert([form]);
    setModalOpen(false);
    await loadNotices();
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("공지사항을 삭제하시겠습니까?")) return;
    const supabase = createClient();
    await supabase.from("notices").delete().eq("id", id);
    await loadNotices();
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium text-gray-900">공지사항 관리</h1>
        <button onClick={openModal} className="px-4 py-2 bg-primary text-white text-sm hover:bg-primary-dark transition-colors">
          + 추가
        </button>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">공지사항 목록</h2>
        </div>
        {loading ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">로딩 중...</div>
        ) : notices.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">등록된 공지사항이 없습니다.</div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {notices.map((notice) => (
              <li key={notice.id} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{notice.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <button onClick={() => handleDelete(notice.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 모달 */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">제목</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="공지사항 제목"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">등록일</label>
              <DatePicker value={form.created_at} onChange={(val) => setForm({ ...form, created_at: val })} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">내용</label>
              <textarea
                required
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                placeholder="공지사항 내용"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                취소
              </button>
              <button type="submit" disabled={submitting} className="px-5 py-2 text-sm bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-50">
                {submitting ? "등록 중..." : "등록"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

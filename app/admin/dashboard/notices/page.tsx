"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Notice {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function NoticesAdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  async function loadNotices() {
    const supabase = createClient();
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });
    setNotices(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setNotices(data ?? []);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const supabase = createClient();
    await supabase.from("notices").insert([form]);
    setForm({ title: "", content: "" });
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
      <h1 className="text-xl font-medium text-gray-900 mb-8">공지사항 관리</h1>

      {/* 등록 폼 */}
      <div className="bg-white border border-gray-100 p-6 mb-8">
        <h2 className="text-sm font-medium text-gray-900 mb-4">새 공지사항 등록</h2>
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
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-primary text-white text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "등록 중..." : "등록"}
          </button>
        </form>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">공지사항 목록</h2>
        </div>
        {loading ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">로딩 중...</div>
        ) : notices.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            등록된 공지사항이 없습니다.
          </div>
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
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

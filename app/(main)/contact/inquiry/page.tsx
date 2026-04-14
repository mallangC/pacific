"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function InquiryPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from("inquiries")
        .insert([{ ...form, status: "pending" }]);

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-600 text-lg">✓</span>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">문의가 접수되었습니다</h2>
          <p className="text-sm text-gray-500">
            담당자 확인 후 빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">고객안내</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">상담문의</h1>
        </div>
      </div>

      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                이름 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                placeholder="홍길동"
              />
            </div>

<div>
              <label className="block text-xs text-gray-500 mb-1.5">
                이메일 <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                문의 내용 <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                placeholder="문의 내용을 자세히 입력해 주세요."
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <p className="text-xs text-gray-400">
              입력하신 개인정보는 문의 답변 목적으로만 사용되며, 답변 완료 후 파기됩니다.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white text-sm tracking-widest hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? "접수 중..." : "문의 접수"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

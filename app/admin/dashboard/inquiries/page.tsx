"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  content: string;
  status: string;
  reply: string | null;
  created_at: string;
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadInquiries() {
    const supabase = createClient();
    const { data } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setInquiries(data ?? []);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("문의를 삭제하시겠습니까?")) return;
    const supabase = createClient();
    await supabase.from("inquiries").delete().eq("id", id);
    await loadInquiries();
  }

  async function handleReply(id: string) {
    if (!replyText.trim()) return;
    setSubmitting(true);
    const supabase = createClient();
    await supabase
      .from("inquiries")
      .update({ reply: replyText, status: "replied" })
      .eq("id", id);
    setReplyTarget(null);
    setReplyText("");
    await loadInquiries();
    setSubmitting(false);
  }

  const statusLabel: Record<string, string> = {
    pending: "대기",
    replied: "답변완료",
  };

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-900 mb-8">문의 관리</h1>

      <div className="bg-white border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">문의 목록</h2>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">로딩 중...</div>
        ) : inquiries.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">접수된 문의가 없습니다.</div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {inquiries.map((inquiry) => (
              <li key={inquiry.id} className="px-6 py-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-10">이름</span>
                      <span className="text-sm font-medium text-gray-900">{inquiry.name}</span>
                    </div>
                    {inquiry.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-10">이메일</span>
                        <span className="text-xs text-gray-600">{inquiry.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{inquiry.content}</p>

                {inquiry.reply && (
                  <div className="bg-gray-50 px-4 py-3 mb-3 border-l-2 border-gray-300">
                    <p className="text-xs text-gray-400 mb-1">답변</p>
                    <p className="text-sm text-gray-600">{inquiry.reply}</p>
                  </div>
                )}

                {/* {replyTarget === inquiry.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
                      placeholder="답변 내용을 입력하세요."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(inquiry.id)}
                        disabled={submitting}
                        className="px-4 py-1.5 bg-gray-900 text-white text-xs hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        답변 저장
                      </button>
                      <button
                        onClick={() => { setReplyTarget(null); setReplyText(""); }}
                        className="px-4 py-1.5 border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setReplyTarget(inquiry.id); setReplyText(inquiry.reply ?? ""); }}
                      className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {inquiry.reply ? "답변 수정" : "답변"}
                    </button>
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                )} */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

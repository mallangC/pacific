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
          <ul className="space-y-3 p-4">
            {inquiries.map((inquiry) => (
              <li key={inquiry.id} className="bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">이름</span>
                      <span className="text-sm font-medium text-gray-900">{inquiry.name}</span>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">연락처</span>
                        <span className="text-xs text-gray-600">{inquiry.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.created_at).toLocaleDateString("ko-KR")}
                    </span>
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-5 py-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{inquiry.content}</p>
                </div>

                {inquiry.reply && (
                  <div className="border-t border-gray-200 px-5 py-3 bg-white">
                    <p className="text-xs text-gray-400 mb-1">답변</p>
                    <p className="text-sm text-gray-600">{inquiry.reply}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

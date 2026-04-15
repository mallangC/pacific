import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NoticeViewTracker from "@/components/NoticeViewTracker";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: notice } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .single();

  if (!notice) notFound();

  return (
    <div>
      <NoticeViewTracker noticeId={id} />

      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">고객안내</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">공지사항</h1>
        </div>
      </div>

      <section className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 pb-5 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800 mb-3">{notice.title}</h2>
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-400">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
              </p>
              <span className="text-gray-200">·</span>
              <p className="text-xs text-gray-400">조회 {notice.view_count ?? 0}</p>
            </div>
          </div>

          <div className="py-2 text-sm text-gray-600 leading-relaxed whitespace-pre-line min-h-40">
            {notice.content}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-100">
            <Link
              href="/contact/notices"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors"
            >
              ← 목록으로
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

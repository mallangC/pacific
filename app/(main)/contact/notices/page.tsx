import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function NoticesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { data: notices, count } = await supabase
    .from("notices")
    .select("id, title, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">고객안내</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">공지사항</h1>
        </div>
      </div>

      <section className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-3 px-2 border-t border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-8 shrink-0 hidden md:block">번호</span>
              <span className="text-xs text-gray-500">제목</span>
            </div>
            <span className="text-xs text-gray-500 shrink-0 ml-4">작성일</span>
          </div>
          <div className="border-b border-gray-100">
            {Array.from({ length: PAGE_SIZE }).map((_, idx) => {
              const notice = notices?.[idx];
              if (notice) {
                return (
                  <Link
                    key={notice.id}
                    href={`/contact/notices/${notice.id}`}
                    className="flex items-center justify-between py-4 px-2 border-t border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-xs text-gray-300 w-8 shrink-0 hidden md:block">
                        {(count ?? 0) - from - idx}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                        {notice.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-4">
                      {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </Link>
                );
              }
              return (
                <div
                  key={`empty-${idx}`}
                  className="flex items-center py-4 px-2 border-t border-gray-100"
                >
                  <span className="text-xs text-gray-300 w-8 shrink-0 hidden md:block">&nbsp;</span>
                  <span className="text-sm">&nbsp;</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-1 mt-10">
            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/contact/notices?page=${p}`}
                className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-colors ${
                  p === currentPage
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

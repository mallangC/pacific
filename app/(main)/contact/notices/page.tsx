import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "공지사항 | 태평양투자그룹",
  description: "태평양투자그룹의 공지사항입니다.",
  openGraph: { title: "공지사항 | 태평양투자그룹", description: "태평양투자그룹의 공지사항입니다." },
};

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
    .select("id, title, created_at, view_count", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div>
      <PageHeader title="공지사항" />

      <section className="pb-10 md:pb-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* 헤더 */}
          <div className="flex items-center py-3 px-2 border-t border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
            <span className="w-10 shrink-0 hidden md:block text-center">번호</span>
            <span className="flex-1 min-w-0 pl-2 md:pl-0 text-center">제목</span>
            <span className="w-24 shrink-0 text-center">작성일</span>
          </div>

          {/* 목록 */}
          <div className="border-b border-gray-100">
            {Array.from({ length: PAGE_SIZE }).map((_, idx) => {
              const notice = notices?.[idx];
              if (notice) {
                return (
                  <Link
                    key={notice.id}
                    href={`/contact/notices/${notice.id}`}
                    className="flex items-center py-4 px-2 border-t border-gray-100 hover:bg-primary-muted transition-colors group"
                  >
                    <span className="w-10 shrink-0 hidden md:block text-center text-xs text-gray-300">
                      {(count ?? 0) - from - idx}
                    </span>
                    <span className="flex-1 min-w-0 text-base text-gray-700 group-hover:text-primary transition-colors truncate pl-2 md:pl-0 text-center">
                      {notice.title}
                    </span>

                    <span className="w-24 shrink-0 text-center text-xs text-gray-400">
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
                  <span className="w-10 shrink-0 hidden md:block" />
                  <span className="flex-1 text-sm pl-2 md:pl-0">&nbsp;</span>
                  <span className="w-24 shrink-0" />
                </div>
              );
            })}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-1 mt-10">
            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/contact/notices?page=${p}`}
                className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-colors ${
                  p === currentPage
                    ? "bg-primary text-white font-medium"
                    : "text-gray-400 hover:bg-primary-muted hover:text-primary"
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

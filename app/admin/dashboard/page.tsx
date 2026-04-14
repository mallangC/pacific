import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-medium text-gray-900 mb-8">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "공지사항 관리", desc: "공지사항 등록 및 삭제", href: "/admin/dashboard/notices" },
          { title: "문의 관리", desc: "문의 확인, 답변 및 삭제", href: "/admin/dashboard/inquiries" },
          { title: "푸터 수정", desc: "푸터 정보 업데이트", href: "/admin/dashboard/footer" },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <h2 className="text-sm font-medium text-gray-900 mb-1">{card.title}</h2>
            <p className="text-xs text-gray-400">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

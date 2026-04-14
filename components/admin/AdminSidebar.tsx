"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "대시보드", href: "/admin/dashboard" },
  { label: "공지사항 관리", href: "/admin/dashboard/notices" },
  { label: "문의 관리", href: "/admin/dashboard/inquiries" },
  { label: "푸터 수정", href: "/admin/dashboard/footer" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
  }

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside className="hidden md:flex w-56 bg-white border-r border-gray-100 flex-col min-h-screen shrink-0">
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-xs text-gray-400 mb-1">관리자</p>
          <p className="text-sm font-medium text-gray-900">태평양투자그룹</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-6 py-2.5 text-sm transition-colors ${
                pathname === item.href
                  ? "text-gray-900 bg-gray-50 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 모바일 상단 바 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-12">
          <p className="text-sm font-medium text-gray-900">관리자 페이지</p>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-600"
            aria-label="메뉴"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white shadow-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm border-b border-gray-50 transition-colors ${
                  pathname === item.href
                    ? "text-gray-900 bg-gray-50 font-medium"
                    : "text-gray-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-6 py-3 text-sm text-red-400"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "회사소개",
    sub: [
      { label: "회사 개요", href: "/company/overview" },
      { label: "대표 인사말", href: "/company/greeting" },
      { label: "핵심 가치", href: "/company/values" },
      { label: "연혁", href: "/company/history" },
      { label: "조직도 / 팀 소개", href: "/company/team" },
    ],
  },
  {
    label: "투자영역",
    sub: [
      { label: "국내주식", href: "/investment/domestic" },
      { label: "미국주식", href: "/investment/us" },
      { label: "지수거래", href: "/investment/index-trading" },
    ],
  },
  {
    label: "포트폴리오 및 성과",
    sub: [
      { label: "국내주식 수익률", href: "/portfolio/domestic" },
      { label: "지수거래 수익률", href: "/portfolio/index" },
    ],
  },
  {
    label: "파트너스",
    sub: [
      { label: "CME", href: "/partners/cme" },
      { label: "국제예탁결제기구 ICSD", href: "/partners/icsd" },
      { label: "YOUTUBE 컨텐츠 제작사 원데이", href: "/partners/oneday" },
    ],
  },
  {
    label: "고객안내",
    sub: [
      { label: "공지사항", href: "/contact/notices" },
      { label: "자주묻는질문", href: "/contact/faq" },
      { label: "상담문의", href: "/contact/inquiry" },
    ],
  },
];

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-16">
        <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900 shrink-0">
          태평양투자그룹
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap">
                {item.label}
              </button>

              {openIndex === idx && (
                <div className="absolute top-full left-0 mt-0 bg-white border border-gray-100 shadow-lg min-w-[180px] py-2">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 whitespace-nowrap transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 모바일 메뉴 */}
        <MobileMenu />
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-700"
        aria-label="메뉴 열기"
      >
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current" />
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-md">
          {navItems.map((item, idx) => (
            <div key={item.label}>
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-700 border-b border-gray-50"
              >
                {item.label}
                <span className="text-xs">{expandedIdx === idx ? "▲" : "▼"}</span>
              </button>
              {expandedIdx === idx && (
                <div className="bg-gray-50">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-gray-100"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

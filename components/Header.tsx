"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  {
    label: "About Us",
    sub: [
      { label: "회사 개요", href: "/company/overview" },
      { label: "대표 인사말", href: "/company/greeting" },
      { label: "핵심 가치", href: "/company/values" },
      { label: "연혁", href: "/company/history" },
      { label: "조직도 / 팀 소개", href: "/company/team" },
    ],
  },
  {
    label: "Investment",
    sub: [
      { label: "국내주식", href: "/investment/domestic" },
      { label: "미국주식", href: "/investment/us" },
      { label: "지수거래", href: "/investment/index-trading" },
    ],
  },
  {
    label: "Performance",
    sub: [
      { label: "국내주식 수익률", href: "/portfolio/domestic" },
      { label: "지수거래 수익률", href: "/portfolio/index" },
    ],
  },
  {
    label: "Partners",
    sub: [
      { label: "CME", href: "/partners/cme" },
      { label: "국제예탁결제기구 ICSD", href: "/partners/icsd" },
      { label: "YOUTUBE 컨텐츠 제작사 원데이", href: "/partners/oneday" },
    ],
  },
  {
    label: "Support",
    sub: [
      { label: "공지사항", href: "/contact/notices" },
      { label: "자주묻는질문", href: "/contact/faq" },
      { label: "상담문의", href: "/contact/inquiry" },
      { label: "오시는길", href: "/contact/directions" },
    ],
  },
];

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      onMouseLeave={() => setOpenIndex(null)}
    >
      {/* 메인 헤더 바 */}
      <div className="border-b border-gray-100">
        <div className="w-full px-0 flex items-center h-25 relative">
          <Link href="/" className="shrink-0 flex items-center px-5">
            <Image src="/logo.png" alt="태평양투자그룹" width={300} height={200} className="h-16 w-auto object-contain" priority />
          </Link>

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-full items-center gap-1">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onMouseEnter={() => setOpenIndex(idx)}
                className="relative px-6 h-full flex items-center text-base font-bold text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
                {/* 헤더 하단 보더 위치에 맞춘 포인트 선 */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-opacity duration-150"
                  style={{ opacity: openIndex === idx ? 1 : 0 }}
                />
              </button>
            ))}
          </nav>

          {/* 모바일 메뉴 */}
          <MobileMenu />
        </div>
      </div>

      {/* 서브메뉴 바 — 헤더 바로 아래 한 줄 */}
      <div
        className="bg-white border-b border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
        style={{ height: openIndex !== null ? "60px" : "0px" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-10 h-[60px]">
          {openIndex !== null &&
            navItems[openIndex].sub.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="text-base text-gray-600 hover:text-primary hover:font-bold whitespace-nowrap transition-colors"
              >
                {sub.label}
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="md:hidden ml-auto">
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
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-md">
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
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-primary border-b border-gray-100"
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

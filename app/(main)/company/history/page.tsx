"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const history = [
  {
    period: "2017",
    image: "/history/2017.jpg",
    items: ["태평양투자그룹 출범", "국내주식 중심 투자 서비스 시작"],
  },
  {
    period: "2018 – 2019",
    image: "/history/2018.jpg",
    items: ["투자 전략 및 매매 기준 정립", "국내 중심에서 글로벌 시장으로 확장"],
  },
  {
    period: "2020 – 2021",
    image: "/history/2020.jpg",
    items: ["글로벌 시장 대응 전략 구축", "데이터 기반 투자 분석 시스템 도입"],
  },
  {
    period: "2022 – 2023",
    image: "/history/2022.jpg",
    items: ["국내주식·미국주식 통합 운용 체계 구축", "회원 기반 투자 서비스 확대"],
  },
  {
    period: "2024 – 현재",
    image: "/history/2024.jpg",
    items: ["투자 전략 고도화 및 포트폴리오 확장", "지수 거래 및 글로벌 시장 대응 강화"],
    current: true,
  },
];

export default function HistoryPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el, idx) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(idx);
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div>
      <PageHeader title="연혁" className="px-6 py-6" />

      <div className="flex flex-col md:flex-row">

        {/* 이미지 패널: 모바일=상단 sticky, 데스크탑=왼쪽 sticky */}
        <div className="w-full md:w-1/2 sticky top-25 self-start z-10
                        h-[35vh] md:h-[calc(100vh-100px)]">
          <div className="relative w-full h-full overflow-hidden">
            {history.map((row, idx) => (
              <Image
                key={row.period}
                src={row.image}
                alt={row.period}
                fill
                className="object-cover transition-opacity duration-700"
                style={{ opacity: idx === activeIdx ? 1 : 0 }}
                priority={idx === 0}
              />
            ))}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10">
              <p className="text-white/50 text-xs md:text-sm tracking-widest uppercase mb-1">
                Pacific Investment Group
              </p>
              <p className="text-white text-3xl md:text-5xl font-bold tracking-tight transition-all duration-500">
                {history[activeIdx].period}
              </p>
            </div>
          </div>
        </div>

        {/* 타임라인 */}
        <div className="w-full md:w-1/2 px-8 md:px-16">
          <ol className="relative border-l-2 border-gray-100">
            {history.map((row, idx) => (
              <li
                key={idx}
                ref={(el) => { itemRefs.current[idx] = el; }}
                className={`pl-10 md:pl-14 relative flex flex-col justify-center ${
                  idx === history.length - 1
                    ? "py-20 md:py-32"
                    : "min-h-[65vh] md:min-h-screen"
                }`}
              >
                <span
                  className={`absolute -left-1.75 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${
                    idx === activeIdx
                      ? "bg-primary border-primary"
                      : row.current
                      ? "bg-gray-900 border-gray-900"
                      : "bg-white border-gray-300"
                  }`}
                />

                <p className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 tracking-wide transition-colors duration-500 ${
                  idx === activeIdx ? "text-primary" : row.current ? "text-gray-900" : "text-gray-200"
                }`}>
                  {row.period}
                </p>

                <ul className="space-y-4 md:space-y-5">
                  {row.items.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 md:gap-4 text-base md:text-xl leading-relaxed transition-colors duration-500 ${
                      idx === activeIdx ? "text-gray-700" : "text-gray-300"
                    }`}>
                      <span className={`mt-2.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-500 ${
                        idx === activeIdx ? "bg-primary" : "bg-gray-200"
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

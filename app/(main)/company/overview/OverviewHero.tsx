"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function OverviewHero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const whiteRef      = useRef<HTMLDivElement>(null);
  const darkRef       = useRef<HTMLDivElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect   = section.getBoundingClientRect();
      const vh     = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const imageH = vh * (isMobile ? 0.35 : 0.5);
      const range  = section.offsetHeight - imageH;
      const rawP   = Math.max(0, Math.min(1, -rect.top / range));

      // ease in-out
      const p = rawP < 0.5
        ? 2 * rawP * rawP
        : 1 - Math.pow(-2 * rawP + 2, 2) / 2;

      // 흰 오버레이: 1 → 0
      if (whiteRef.current) {
        whiteRef.current.style.opacity = String(1 - p);
      }

      // 어두운 오버레이: p=0.3 이후 등장
      if (darkRef.current) {
        const dp = Math.max(0, (p - 0.3) / 0.7);
        darkRef.current.style.opacity = String(dp * 0.5);
      }

      // 스크롤 힌트: 초반에만
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(Math.max(0, 1 - rawP / 0.15));
      }

      // 텍스트: 위치 고정, 색상만 gray-800 → white (p=0.3 이후)
      if (textRef.current) {
        const cp = Math.max(0, (p - 0.3) / 0.7);
        const c  = Math.round(31 + (255 - 31) * cp);
        const cg = Math.round(41 + (255 - 41) * cp);
        const cb = Math.round(55 + (255 - 55) * cp);
        textRef.current.style.color = `rgb(${c}, ${cg}, ${cb})`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "130vh" }}>
      <div className="sticky top-25 w-full overflow-hidden h-[35vh] md:h-[50vh]">

        {/* 이미지 배경 */}
        <Image src="/company.jpg" alt="태평양투자그룹" fill className="object-cover" priority />

        {/* 흰 오버레이 */}
        <div ref={whiteRef} className="absolute inset-0 bg-white z-10" />

        {/* 어두운 오버레이 */}
        <div ref={darkRef} className="absolute inset-0 bg-black z-20" style={{ opacity: 0 }} />

        {/* 텍스트: 항상 수직 중앙, 살짝 아래에서 올라오는 애니메이션 */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
          <div
            ref={textRef}
            className="max-w-4xl w-full"
            style={{ color: "#1f2937", willChange: "color" }}
          >
            <p className="text-3xl md:text-4xl font-bold leading-snug tracking-tight text-center">
              태평양투자그룹은 글로벌 금융시장의 흐름을 기반으로<br className="hidden md:block" />
              국내주식, 미국주식, 그리고 지수 거래까지 아우르는<br className="hidden md:block" />
              통합 투자 전략을 제공하는 전문 투자 그룹입니다.
            </p>
          </div>
        </div>

        {/* 스크롤 힌트 — 텍스트와 분리해 하단 고정 */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5"
          style={{ willChange: "opacity" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Scroll</span>
          <div className="w-px h-8 overflow-hidden">
            <div className="w-full bg-gray-400 animate-scroll-line" style={{ height: "100%" }} />
          </div>
        </div>

      </div>
    </section>
  );
}

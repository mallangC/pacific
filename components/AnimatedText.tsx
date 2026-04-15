"use client";

import { useEffect, useRef } from "react";

interface Props {
  text: string;
  className?: string;
  /**
   * 애니메이션 시작 지점 (뷰포트 높이 기준 비율, 기본 0.95 = 화면 아래쪽 진입 시 시작)
   */
  startAt?: number;
  /**
   * 애니메이션 완료 지점 (뷰포트 높이 기준 비율, 기본 0.25 = 화면 상단 25% 지점 도달 시 완료)
   */
  endAt?: number;
}

export default function AnimatedText({
  text,
  className,
  startAt = 0.95,
  endAt = 0.25,
}: Props) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = Array.from(
      el.querySelectorAll<HTMLSpanElement>("span[data-word]")
    );
    const count = spans.length;

    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;

      // 요소 상단이 vh*startAt ~ vh*endAt 사이를 이동할 때 progress 0→1
      const start = vh * startAt;
      const end = vh * endAt;
      const p = 1 - Math.max(0, Math.min(1, (rect.top - end) / (start - end)));

      // 단어 등장 범위를 [0, 0.85]로 제한 → p=0.85에서 전체 완성
      // (마지막 단어가 p=1.0 전에 완전히 보이도록 여유 확보)
      const REVEAL_RANGE = 0.85;
      spans.forEach((span, i) => {
        const wordStart = (i / count) * REVEAL_RANGE;
        const wordEnd = ((i + 1) / count) * REVEAL_RANGE;
        const wordP = Math.max(
          0,
          Math.min(1, (p - wordStart) / (wordEnd - wordStart))
        );

        span.style.opacity = String(wordP);
        span.style.transform = `translateY(${(1 - wordP) * 20}px)`;
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update(); // 초기 실행
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [startAt, endAt]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          data-word=""
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(20px)",
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** 등장 지연 시간 (ms) */
  delay?: number;
}

export default function FadeInSection({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.65s ease, transform 0.65s ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

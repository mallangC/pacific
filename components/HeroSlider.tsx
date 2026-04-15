"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/hero/1.jpg",
  "/hero/2.jpg",
  "/hero/3.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % slides.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {slides.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt=""
          fill
          className="object-cover transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : i === prev ? 0 : 0,
          }}
          priority={i === 0}
        />
      ))}

      {/* 마커 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i === current ? "white" : "rgba(255,255,255,0.4)",
              transform: i === current ? "scale(1.2)" : "scale(1)",
            }}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

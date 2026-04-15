import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        {/* 슬라이더 */}
        <HeroSlider />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* 회사명 */}
        <div className="relative z-20 text-center text-white px-6">
          <p className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-gray-300 mb-4">
            Pacific Investment Group
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest mb-6">
            태평양투자그룹
          </h1>
          <div className="w-16 h-px bg-white/40 mx-auto mb-6" />
          <p className="text-sm md:text-base font-semibold text-gray-300 tracking-wide max-w-md mx-auto">
            안정적이고 투명한 투자로 함께 성장합니다
          </p>
        </div>
      </section>

      {/* 간략 소개 섹션 */}
      <section className="py-14 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-wide">
            신뢰와 전문성을 바탕으로 한 투자
          </h2>
          <div className="w-12 h-px bg-primary/40 mx-auto mb-8" />
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
            태평양투자그룹은 국내외 금융 시장에서 검증된 투자 전략으로<br className="hidden md:block" />
            고객의 자산을 안전하고 효율적으로 운용합니다.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              title: "Investment",
              desc: "국내주식 · 미국주식 · 지수거래",
              href: "/investment/domestic",
              icon: (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto">
                  <line x1="10" y1="4"  x2="10" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="7"  y="8"  width="6" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="10" y1="22" x2="10" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="20" y1="10" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="17" y="14" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="20" y1="24" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="30" y1="6"  x2="30" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="27" y="12" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="30" y1="28" x2="30" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: "Performance",
              desc: "투명하게 공개되는 실적",
              href: "/portfolio/domestic",
              icon: (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto">
                  <polyline points="4,30 12,20 18,24 26,10 36,16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4"  cy="30" r="2" fill="currentColor" />
                  <circle cx="12" cy="20" r="2" fill="currentColor" />
                  <circle cx="18" cy="24" r="2" fill="currentColor" />
                  <circle cx="26" cy="10" r="2" fill="currentColor" />
                  <circle cx="36" cy="16" r="2" fill="currentColor" />
                  <line x1="4" y1="34" x2="36" y2="34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: "Support",
              desc: "상담부터 운용까지 함께합니다",
              href: "/contact/faq",
              icon: (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto">
                  <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 17c0-2.76 2.24-5 5-5s5 2.24 5 5c0 3-5 7-5 7s-5-4-5-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="20" cy="30" r="1.2" fill="currentColor" />
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-8 bg-primary hover:bg-primary-dark transition-all text-center"
            >
              <div className="text-white/70 group-hover:text-white transition-colors mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-white/60">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <Image
          src="/hero.jpg"
          alt="태평양투자그룹 히어로 이미지"
          fill
          className="object-cover"
          priority
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/50" />

        {/* 회사명 */}
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-300 mb-4">
            Pacific Investment Group
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-widest mb-6">
            태평양투자그룹
          </h1>
          <div className="w-16 h-px bg-white/40 mx-auto mb-6" />
          <p className="text-sm md:text-base text-gray-300 tracking-wide max-w-md mx-auto">
            안정적이고 투명한 투자로 함께 성장합니다
          </p>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4 justify-center">
            <Link
              href="/company/overview"
              className="px-8 py-3 text-sm border border-white/60 text-white hover:bg-white hover:text-gray-900 transition-all tracking-widest"
            >
              회사소개
            </Link>
            <Link
              href="/contact/inquiry"
              className="px-8 py-3 text-sm bg-white text-gray-900 hover:bg-gray-100 transition-all tracking-widest"
            >
              상담문의
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest flex flex-col items-center gap-2">
          <span>SCROLL</span>
          <span className="block w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* 간략 소개 섹션 */}
      <section className="py-14 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-wide">
            신뢰와 전문성을 바탕으로 한 투자
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto mb-8" />
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
            태평양투자그룹은 국내외 금융 시장에서 검증된 투자 전략으로<br className="hidden md:block" />
            고객의 자산을 안전하고 효율적으로 운용합니다.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            { title: "투자영역", desc: "국내주식 · 미국주식 · 지수거래", href: "/investment/domestic" },
            { title: "포트폴리오 성과", desc: "투명하게 공개되는 실적", href: "/portfolio/domestic" },
            { title: "고객안내", desc: "상담부터 운용까지 함께합니다", href: "/contact/faq" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-8 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all text-center"
            >
              <h3 className="text-base font-medium text-gray-900 mb-3 group-hover:text-gray-700">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

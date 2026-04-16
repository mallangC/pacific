import type { Metadata } from "next";
import OverviewHero from "./OverviewHero";
import FadeInSection from "@/components/FadeInSection";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "회사 개요 | 태평양투자그룹",
  description: "글로벌 흐름 위에서 기준을 제시합니다. 태평양투자그룹은 국내주식, 미국주식, 지수거래 전문 통합 투자 그룹입니다.",
  openGraph: {
    title: "회사 개요 | 태평양투자그룹",
    description: "글로벌 흐름 위에서 기준을 제시합니다. 태평양투자그룹은 국내주식, 미국주식, 지수거래 전문 통합 투자 그룹입니다.",
  },
};

const investmentItems = [
  {
    title: "국내주식",
    desc: <>중장기 관점의 국내 시장<br />분석 및 투자 전략</>,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
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
    title: "미국주식",
    desc: <>글로벌 트렌드 기반의<br />미국 시장 포트폴리오</>,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="20" cy="20" rx="6" ry="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6"  y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 13h24"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 27h24"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "지수거래",
    desc: <>글로벌 파생상품 시장을 활용한<br />지수 전략</>,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <polyline
          points="4,30 12,20 18,24 26,10 36,16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4"  cy="30" r="2" fill="currentColor" />
        <circle cx="12" cy="20" r="2" fill="currentColor" />
        <circle cx="18" cy="24" r="2" fill="currentColor" />
        <circle cx="26" cy="10" r="2" fill="currentColor" />
        <circle cx="36" cy="16" r="2" fill="currentColor" />
        <line x1="4" y1="34" x2="36" y2="34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function OverviewPage() {
  return (
    <div>
      <PageHeader title="회사 개요" />

      <OverviewHero />

      {/* ── 나머지 콘텐츠 ── */}
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">

          {/* 핵심 철학 */}
          <FadeInSection>
            <section>
              <h2 className="text-sm text-gray-400 tracking-widest uppercase mb-6">Core Philosophy</h2>
              <div className="space-y-5 text-base text-gray-600 leading-relaxed">
                <p>
                  빠르게 변화하는 시장 환경 속에서 단순한 정보 전달이나 단기적인 시세 대응을 넘어,
                  데이터와 구조에 기반한 일관된 기준을 통해 안정성과 수익 가능성을 동시에 추구하는 것을
                  핵심 가치로 삼고 있습니다.
                </p>
                <p>
                  태평양투자그룹은 시장을 예측하는 것이 아닌, 시장이 만들어내는 흐름을 해석하고
                  그 안에서 유리한 구간을 선별하는 전략적 접근을 지향합니다. 이를 위해 자체적인 분석 시스템과
                  다각도의 지표를 활용하여, 투자 판단에 있어 감정이 아닌 기준이 작동하도록 설계된
                  구조를 구축해왔습니다.
                </p>
              </div>
            </section>
          </FadeInSection>

          {/* 투자 전략 */}
          <FadeInSection>
            <section>
              <h2 className="text-sm text-gray-400 tracking-widest uppercase mb-6">Investment Strategy</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-10">
                특히 국내주식과 미국주식 시장을 기반으로 한 중장기 투자 전략과 함께, 글로벌 파생상품 시장을
                활용한 지수 거래 전략을 병행함으로써 시장 상황에 따라 유연하게 대응할 수 있는 포트폴리오
                운영을 지향하고 있습니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {investmentItems.map((item, i) => (
                  <FadeInSection key={item.title} delay={i * 120}>
                    <div className="bg-primary p-10 flex flex-col gap-6 h-full">
                      <div className="text-white">{item.icon}</div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </section>
          </FadeInSection>

          {/* 파트너 네트워크 */}
          <FadeInSection>
            <section>
              <h2 className="text-sm text-gray-400 tracking-widest uppercase mb-6">Partner Network</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                태평양투자그룹은 검증된 파트너 네트워크를 기반으로 운영됩니다. 글로벌 거래소, 증권사,
                데이터 및 인프라 협력사와의 유기적인 연결을 통해 투자 환경의 안정성과 실행력을 동시에
                확보하고 있으며, 이를 통해 보다 신뢰할 수 있는 투자 서비스를 제공하고 있습니다.
              </p>
            </section>
          </FadeInSection>

          {/* 투자자 교육 */}
          <FadeInSection>
            <section>
              <h2 className="text-sm text-gray-400 tracking-widest uppercase mb-6">Investor Education</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                단순히 수익을 제시하는 것을 넘어, 투자자 스스로 시장을 이해하고 기준을 세울 수 있도록
                돕는 것 또한 중요한 역할로 보고 있습니다. 지속적인 시황 분석, 전략 공유, 그리고 실제
                시장 데이터에 기반한 인사이트 제공을 통해 투자에 대한 접근 방식을 근본적으로 개선하는 데
                집중하고 있습니다.
              </p>
            </section>
          </FadeInSection>

          {/* 마무리 */}
          <FadeInSection>
            <section className="pb-4">
              <div className="space-y-4 text-base text-gray-500 leading-relaxed italic">
                <p>
                  태평양투자그룹은 단기적인 성과에 집중하는 조직이 아닌, 장기적으로 살아남는 투자 구조를
                  만드는 것을 목표로 합니다.
                </p>
                <p>
                  시장은 언제나 변하지만, 기준 있는 투자와 검증된 전략은 결국 결과로 이어진다는 믿음 아래
                  앞으로도 흔들리지 않는 방향성을 유지하며 나아가겠습니다.
                </p>
              </div>
            </section>
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}

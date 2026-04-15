import InvestmentHero from "@/components/InvestmentHero";
import FadeInSection from "@/components/FadeInSection";

const points = [
  {
    title: "지수, 시장 그 자체에 집중",
    desc: "개별 종목은 다양한 변수에 영향을 받지만, 지수는 시장 전체의 흐름과 자금의 방향이 직접적으로 반영되는 영역입니다. 불필요한 변수를 줄이고, 시장 그 자체에 집중할 수 있는 장점이 있습니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8"  y="28" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="20" y="18" width="8" height="22" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="32" y="10" width="8" height="30" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="6" x2="40" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    title: "가격 구조와 자금 이동 중심 접근",
    desc: "글로벌 지수 시장을 기반으로 가격 구조와 흐름, 그리고 자금의 이동을 중심으로 접근합니다. 특히 변동성이 확대되는 구간에서 발생하는 기회를 포착하며, 단순한 방향 예측이 아닌 확률적으로 유리한 구간에서의 대응에 집중합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <polyline points="6,34 14,20 22,28 30,14 38,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6" y1="14" x2="42" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
        <line x1="6" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
        <polyline points="34,18 38,22 34,26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "준비된 기준으로 진입과 청산",
    desc: "지수거래에 있어 가장 중요한 것은 빠른 판단이 아니라, 준비된 기준입니다. 진입과 청산의 명확한 기준을 사전에 설정하고, 시장 상황에 따라 유연하게 대응하는 구조를 유지합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="10" y="8" width="28" height="32" rx="3" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="13,18 15,20 17,16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="13,24 15,26 17,22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "리스크 관리 우선 원칙",
    desc: "레버리지 구조가 포함된 거래인 만큼, 수익보다 리스크 관리 원칙을 우선으로 두고 있으며 손실을 제한하고 수익을 확장하는 전략을 일관되게 적용합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 6 L40 12 L40 28 C40 37 24 42 24 42 C24 42 8 37 8 28 L8 12 Z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <polyline points="16,24 21,30 32,18"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function IndexTradingPage() {
  return (
    <div>
      <InvestmentHero
        text="태평양투자그룹은 지수거래를 가장 구조적이고 효율적인 투자 방식으로 바라봅니다."
        imageSrc="/investment/index-trading.jpg"
        imageAlt="지수거래"
      />

      <div className="pb-16 md:pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <ol className="divide-y divide-gray-100">
            {points.map((item, idx) => (
              <FadeInSection key={idx} delay={idx * 80}>
                <li className="flex gap-6 md:gap-10 py-10 md:py-14">
                  <div className="shrink-0 mt-1 text-gray-300">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{item.title}</h2>
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              </FadeInSection>
            ))}
          </ol>

          <FadeInSection delay={100}>
            <div className="border-l-2 border-gray-200 pl-6 mt-4 space-y-3">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                태평양투자그룹은 지수거래를 단기적인 매매 수단이 아닌, 반복 가능한 수익 구조로 구축하는 데 집중합니다.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                시장은 언제나 변동성을 만들어내지만, 그 속에서도 일정한 흐름은 존재합니다.
                태평양투자그룹은 그 흐름 위에서 기준 있는 대응을 이어가며 지속 가능한 결과로 연결되는
                투자 방향을 제시합니다.
              </p>
            </div>
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}

import InvestmentHero from "@/components/InvestmentHero";
import FadeInSection from "@/components/FadeInSection";

const points = [
  {
    title: "글로벌 자금 흐름과 구조적 트렌드 분석",
    desc: "미국 시장은 전 세계 자금이 모이는 핵심 시장으로, 금리, 유동성, 정책, 그리고 글로벌 투자 심리가 복합적으로 반영되는 구조를 가지고 있습니다. 단순한 종목 접근이 아닌, 시장 전체의 방향성과 자금 흐름을 우선적으로 분석하는 전략을 기반으로 합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 지구 외곽 */}
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
        {/* 경도선 (타원) */}
        <ellipse cx="24" cy="24" rx="7" ry="16" stroke="currentColor" strokeWidth="1.5" />
        {/* 위도선 */}
        <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="16" x2="38" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="10" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: "지수 흐름과 섹터 자금 이동 추적",
    desc: "주요 지수의 흐름과 섹터 간 자금 이동을 면밀히 추적하며, 상승 가능성만을 보는 것이 아닌 리스크 대비 기대 구간이 형성된 자리에서 선별적으로 접근합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 캔들스틱 */}
        <line x1="13" y1="10" x2="13" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="18" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
        <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="20" y="14" width="8" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
        <line x1="35" y1="12" x2="35" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="31" y="16" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "성장성과 변동성의 균형 전략",
    desc: "미국주식은 장기적인 성장성과 함께 단기적인 변동성 기회가 동시에 존재하는 시장입니다. 이 두 가지 특성을 모두 고려하여, 추세가 이어지는 구간에서는 수익을 극대화하고 불확실성이 높은 구간에서는 리스크를 우선적으로 관리하는 전략을 유지합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 기둥 */}
        <line x1="24" y1="10" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 받침 */}
        <line x1="14" y1="40" x2="34" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 팔 */}
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 왼쪽 줄 */}
        <line x1="11" y1="18" x2="11" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="18" x2="17" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* 왼쪽 접시 */}
        <path d="M6,26 Q14,34 22,26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 오른쪽 줄 */}
        <line x1="31" y1="18" x2="31" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="37" y1="18" x2="37" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* 오른쪽 접시 */}
        <path d="M26,26 Q34,34 42,26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 중심 핀 */}
        <circle cx="24" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "명확한 진입·손절 기준과 유연한 대응",
    desc: "매매에 있어서는 명확한 진입 기준과 손절 기준을 사전에 설정하며, 시장 상황에 따라 유연하게 대응하는 구조를 통해 지속 가능한 수익을 추구합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 세로 기준선 */}
        <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        {/* 진입 화살표 (왼→오) */}
        <line x1="8" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="18,16 22,20 18,24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 청산 화살표 (오→왼) */}
        <line x1="26" y1="32" x2="40" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="30,28 26,32 30,36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function UsPage() {
  return (
    <div>
      <InvestmentHero
        text="글로벌 자금 흐름과 구조적인 트렌드를 중심으로 해석합니다"
        imageSrc="/investment/us.jpg"
        imageAlt="미국주식"
      />

      <div className="pb-16 md:pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* 전략 포인트 */}
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

          {/* 마무리 */}
          <FadeInSection delay={100}>
            <div className="border-l-2 border-gray-200 pl-6 mt-4 space-y-3">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                미국주식 투자는 단순한 종목 선택을 넘어 글로벌 흐름을 이해하는 것이 핵심입니다.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                태평양투자그룹은 데이터 기반 분석과 일관된 기준을 바탕으로 복잡한 글로벌 시장 속에서도
                흔들림 없는 투자 방향을 제시합니다.
              </p>
            </div>
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}

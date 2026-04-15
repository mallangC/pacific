import InvestmentHero from "@/components/InvestmentHero";
import FadeInSection from "@/components/FadeInSection";

const points = [
  {
    title: "수급과 구조 중심의 해석",
    desc: "시장은 언제나 다양한 변수에 의해 움직이지만, 결국 가격을 움직이는 핵심은 자금의 흐름과 시장 참여자의 행동입니다. 단순한 뉴스나 테마 추종이 아닌, 실제 수급이 유입되는 구간과 가격 구조가 형성되는 지점을 중심으로 접근합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 아래→위 화살표 */}
        <line x1="14" y1="36" x2="14" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="10,20 14,14 18,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 위→아래 화살표 */}
        <line x1="24" y1="12" x2="24" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="20,28 24,34 28,28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 아래→위 화살표 */}
        <line x1="34" y1="36" x2="34" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="30,20 34,14 38,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "기준 있는 진입과 리스크 관리",
    desc: "매매에 있어 가장 중요하게 생각하는 것은 '어디서 사느냐'보다 '왜 그 자리인가'입니다. 사전에 정의된 기준을 바탕으로 진입 구간과 리스크 구간을 명확히 구분하며, 불확실한 구간에서는 무리한 대응을 지양합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 외부 원 */}
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
        {/* 중간 원 */}
        <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="2" />
        {/* 중심 점 */}
        <circle cx="24" cy="24" r="2.5" fill="currentColor" />
        {/* 십자 */}
        <line x1="24" y1="6" x2="24" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="38" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "시장 흐름과 섹터 방향성 우선 분석",
    desc: "국내주식 시장은 단기 변동성이 큰 특징을 가지고 있는 만큼, 개별 종목 접근에 앞서 시장 전체 흐름과 섹터의 방향성을 우선적으로 분석합니다. 이를 통해 시장과 같은 방향에서 움직이는 전략을 지향합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 추세선 */}
        <polyline points="6,36 16,26 24,30 36,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 화살표 머리 */}
        <polyline points="30,12 36,14 34,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* X축 */}
        <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* 섹터 막대 (배경) */}
        <line x1="12" y1="40" x2="12" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 1" />
        <line x1="22" y1="40" x2="22" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 1" />
        <line x1="32" y1="40" x2="32" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 1" />
      </svg>
    ),
  },
  {
    title: "리스크 대비 기대값 중심의 선별",
    desc: "단순히 상승 가능성이 높은 종목을 찾는 것이 아니라, 리스크 대비 기대값이 유리한 구간을 선별하는 데 집중합니다. 진입 이후에도 상황에 따라 유연하게 대응하며, 손실은 제한하고 수익은 확장하는 구조를 유지합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* 돋보기 */}
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
        <line x1="28" y1="28" x2="40" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 내부 상승 선 */}
        <polyline points="14,24 19,18 24,20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function DomesticPage() {
  return (
    <div>
      <InvestmentHero
        text="단기적인 이슈나 감정이 아닌, 수급과 구조를 중심으로 해석합니다"
        imageSrc="/investment/domestic.jpg"
        imageAlt="국내주식"
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
                국내주식 투자는 예측이 아닌 기준으로 접근해야 합니다.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                태평양투자그룹은 일관된 원칙과 체계적인 전략을 통해 변동성이 큰 시장 속에서도
                흔들리지 않는 투자 방향을 제시합니다.
              </p>
            </div>
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}

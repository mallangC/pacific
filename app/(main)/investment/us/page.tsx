const points = [
  {
    title: "글로벌 자금 흐름과 구조적 트렌드 분석",
    desc: "미국 시장은 전 세계 자금이 모이는 핵심 시장으로, 금리, 유동성, 정책, 그리고 글로벌 투자 심리가 복합적으로 반영되는 구조를 가지고 있습니다. 단순한 종목 접근이 아닌, 시장 전체의 방향성과 자금 흐름을 우선적으로 분석하는 전략을 기반으로 합니다.",
  },
  {
    title: "지수 흐름과 섹터 자금 이동 추적",
    desc: "주요 지수의 흐름과 섹터 간 자금 이동을 면밀히 추적하며, 상승 가능성만을 보는 것이 아닌 리스크 대비 기대 구간이 형성된 자리에서 선별적으로 접근합니다.",
  },
  {
    title: "성장성과 변동성의 균형 전략",
    desc: "미국주식은 장기적인 성장성과 함께 단기적인 변동성 기회가 동시에 존재하는 시장입니다. 이 두 가지 특성을 모두 고려하여, 추세가 이어지는 구간에서는 수익을 극대화하고 불확실성이 높은 구간에서는 리스크를 우선적으로 관리하는 전략을 유지합니다.",
  },
  {
    title: "명확한 진입·손절 기준과 유연한 대응",
    desc: "매매에 있어서는 명확한 진입 기준과 손절 기준을 사전에 설정하며, 시장 상황에 따라 유연하게 대응하는 구조를 통해 지속 가능한 수익을 추구합니다.",
  },
];

export default function UsPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">투자영역</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">미국주식</h1>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-14">

          {/* 도입 */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            태평양투자그룹은 미국주식 시장을 글로벌 자금 흐름과 구조적인 트렌드를 중심으로 해석합니다.
          </p>

          {/* 전략 포인트 */}
          <ol className="space-y-0 divide-y divide-gray-100">
            {points.map((item, idx) => (
              <li key={idx} className="flex gap-4 md:gap-8 py-7 md:py-10">
                <span className="text-2xl font-light text-gray-200 tabular-nums shrink-0 w-6 text-right">
                  {idx + 1}
                </span>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-3">{item.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* 마무리 */}
          <div className="border-l-2 border-gray-200 pl-6 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              미국주식 투자는 단순한 종목 선택을 넘어 글로벌 흐름을 이해하는 것이 핵심입니다.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              태평양투자그룹은 데이터 기반 분석과 일관된 기준을 바탕으로 복잡한 글로벌 시장 속에서도
              흔들림 없는 투자 방향을 제시합니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

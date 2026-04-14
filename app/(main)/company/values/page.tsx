const values = [
  {
    title: "기준 중심의 투자",
    desc: "감정이나 추측이 아닌, 명확한 기준과 원칙을 기반으로 시장에 접근합니다. 모든 판단은 사전에 정의된 전략과 데이터에 근거하며, 일관된 기준이 결국 안정적인 결과로 이어진다고 믿습니다.",
  },
  {
    title: "리스크 관리 우선",
    desc: "수익은 결과이지만, 리스크 관리는 선택이 아닌 필수입니다. 태평양투자그룹은 어떠한 상황에서도 손실을 통제할 수 있는 구조를 최우선으로 설계하며, 지속 가능한 투자를 위한 기반을 지켜갑니다.",
  },
  {
    title: "데이터 기반 의사결정",
    desc: "시장은 감으로 접근할 수 있는 영역이 아닙니다. 다양한 시장 데이터와 분석 지표를 활용하여 현재 시장에서 확률적으로 유리한 방향을 도출하고, 객관적인 근거 위에서 의사결정을 이어갑니다.",
  },
  {
    title: "지속 가능한 수익 구조",
    desc: "단기적인 성과에 집중하기보다 장기적으로 반복 가능한 수익 구조를 만드는 것을 목표로 합니다. 흔들림 없는 기준과 전략을 통해 시간이 지날수록 안정적으로 축적되는 성과를 지향합니다.",
  },
  {
    title: "투자자의 성장",
    desc: "태평양투자그룹은 단순한 정보 제공을 넘어 투자자 스스로 시장을 이해하고 판단할 수 있도록 돕습니다. 올바른 기준을 공유함으로써 개개인의 투자 역량이 성장하는 것을 중요하게 생각합니다.",
  },
];

export default function ValuesPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">회사소개</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">핵심 가치</h1>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-0 divide-y divide-gray-100">
            {values.map((item, idx) => (
              <li key={idx} className="flex gap-4 md:gap-8 py-7 md:py-10">
                <span className="text-2xl font-light text-gray-200 tabular-nums shrink-0 w-6 text-right">
                  {idx + 1}
                </span>
                <div>
                  <h2 className="text-base font-medium text-gray-900 mb-3">{item.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

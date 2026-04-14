const points = [
  {
    title: "지수, 시장 그 자체에 집중",
    desc: "개별 종목은 다양한 변수에 영향을 받지만, 지수는 시장 전체의 흐름과 자금의 방향이 직접적으로 반영되는 영역입니다. 불필요한 변수를 줄이고, 시장 그 자체에 집중할 수 있는 장점이 있습니다.",
  },
  {
    title: "가격 구조와 자금 이동 중심 접근",
    desc: "글로벌 지수 시장을 기반으로 가격 구조와 흐름, 그리고 자금의 이동을 중심으로 접근합니다. 특히 변동성이 확대되는 구간에서 발생하는 기회를 포착하며, 단순한 방향 예측이 아닌 확률적으로 유리한 구간에서의 대응에 집중합니다.",
  },
  {
    title: "준비된 기준으로 진입과 청산",
    desc: "지수거래에 있어 가장 중요한 것은 빠른 판단이 아니라, 준비된 기준입니다. 진입과 청산의 명확한 기준을 사전에 설정하고, 시장 상황에 따라 유연하게 대응하는 구조를 유지합니다.",
  },
  {
    title: "리스크 관리 우선 원칙",
    desc: "레버리지 구조가 포함된 거래인 만큼, 수익보다 리스크 관리 원칙을 우선으로 두고 있으며 손실을 제한하고 수익을 확장하는 전략을 일관되게 적용합니다.",
  },
];

export default function IndexTradingPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">투자영역</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">지수거래</h1>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-14">

          {/* 도입 */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            태평양투자그룹은 지수거래를 가장 구조적이고 효율적인 투자 방식으로 바라봅니다.
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
              태평양투자그룹은 지수거래를 단기적인 매매 수단이 아닌, 반복 가능한 수익 구조로 구축하는 데 집중합니다.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              시장은 언제나 변동성을 만들어내지만, 그 속에서도 일정한 흐름은 존재합니다.
              태평양투자그룹은 그 흐름 위에서 기준 있는 대응을 이어가며 지속 가능한 결과로 연결되는
              투자 방향을 제시합니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

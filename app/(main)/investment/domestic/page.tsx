const points = [
  {
    title: "수급과 구조 중심의 해석",
    desc: "시장은 언제나 다양한 변수에 의해 움직이지만, 결국 가격을 움직이는 핵심은 자금의 흐름과 시장 참여자의 행동입니다. 단순한 뉴스나 테마 추종이 아닌, 실제 수급이 유입되는 구간과 가격 구조가 형성되는 지점을 중심으로 접근합니다.",
  },
  {
    title: "기준 있는 진입과 리스크 관리",
    desc: "매매에 있어 가장 중요하게 생각하는 것은 '어디서 사느냐'보다 '왜 그 자리인가'입니다. 사전에 정의된 기준을 바탕으로 진입 구간과 리스크 구간을 명확히 구분하며, 불확실한 구간에서는 무리한 대응을 지양합니다.",
  },
  {
    title: "시장 흐름과 섹터 방향성 우선 분석",
    desc: "국내주식 시장은 단기 변동성이 큰 특징을 가지고 있는 만큼, 개별 종목 접근에 앞서 시장 전체 흐름과 섹터의 방향성을 우선적으로 분석합니다. 이를 통해 시장과 같은 방향에서 움직이는 전략을 지향합니다.",
  },
  {
    title: "리스크 대비 기대값 중심의 선별",
    desc: "단순히 상승 가능성이 높은 종목을 찾는 것이 아니라, 리스크 대비 기대값이 유리한 구간을 선별하는 데 집중합니다. 진입 이후에도 상황에 따라 유연하게 대응하며, 손실은 제한하고 수익은 확장하는 구조를 유지합니다.",
  },
];

export default function DomesticPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">투자영역</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">국내주식</h1>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-14">

          {/* 도입 */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            태평양투자그룹은 국내주식 시장을 단기적인 이슈나 감정이 아닌,
            수급과 구조를 중심으로 해석합니다.
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
              국내주식 투자는 예측이 아닌 기준으로 접근해야 합니다.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              태평양투자그룹은 일관된 원칙과 체계적인 전략을 통해 변동성이 큰 시장 속에서도
              흔들리지 않는 투자 방향을 제시합니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

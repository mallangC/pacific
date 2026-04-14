export default function OverviewPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">회사소개</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">회사 개요</h1>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-16">

          {/* 소개 */}
          <section>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              태평양투자그룹은 글로벌 금융시장의 흐름을 기반으로 국내주식, 미국주식, 그리고 지수 거래까지 아우르는
              통합 투자 전략을 제공하는 전문 투자 그룹입니다.
            </p>
          </section>

          <div className="w-full h-px bg-gray-100" />

          {/* 핵심 철학 */}
          <section>
            <h2 className="text-xs text-gray-400 tracking-widest uppercase mb-5">Core Philosophy</h2>
            <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
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

          <div className="w-full h-px bg-gray-100" />

          {/* 투자 전략 */}
          <section>
            <h2 className="text-xs text-gray-400 tracking-widest uppercase mb-5">Investment Strategy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              특히 국내주식과 미국주식 시장을 기반으로 한 중장기 투자 전략과 함께, 글로벌 파생상품 시장을
              활용한 지수 거래 전략을 병행함으로써 시장 상황에 따라 유연하게 대응할 수 있는 포트폴리오
              운영을 지향하고 있습니다.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "국내주식", desc: "중장기 관점의 국내 시장 분석 및 투자 전략" },
                { title: "미국주식", desc: "글로벌 트렌드 기반의 미국 시장 포트폴리오" },
                { title: "지수거래", desc: "글로벌 파생상품 시장을 활용한 지수 전략" },
              ].map((item) => (
                <div key={item.title} className="border border-gray-100 p-5">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-gray-100" />

          {/* 파트너 네트워크 */}
          <section>
            <h2 className="text-xs text-gray-400 tracking-widest uppercase mb-5">Partner Network</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              태평양투자그룹은 검증된 파트너 네트워크를 기반으로 운영됩니다. 글로벌 거래소, 증권사,
              데이터 및 인프라 협력사와의 유기적인 연결을 통해 투자 환경의 안정성과 실행력을 동시에
              확보하고 있으며, 이를 통해 보다 신뢰할 수 있는 투자 서비스를 제공하고 있습니다.
            </p>
          </section>

          <div className="w-full h-px bg-gray-100" />

          {/* 투자자 교육 */}
          <section>
            <h2 className="text-xs text-gray-400 tracking-widest uppercase mb-5">Investor Education</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              단순히 수익을 제시하는 것을 넘어, 투자자 스스로 시장을 이해하고 기준을 세울 수 있도록
              돕는 것 또한 중요한 역할로 보고 있습니다. 지속적인 시황 분석, 전략 공유, 그리고 실제
              시장 데이터에 기반한 인사이트 제공을 통해 투자에 대한 접근 방식을 근본적으로 개선하는 데
              집중하고 있습니다.
            </p>
          </section>

          <div className="w-full h-px bg-gray-100" />

          {/* 마무리 */}
          <section className="pb-4">
            <blockquote className="border-l-2 border-gray-300 pl-6 space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                태평양투자그룹은 단기적인 성과에 집중하는 조직이 아닌, 장기적으로 살아남는 투자 구조를
                만드는 것을 목표로 합니다.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                시장은 언제나 변하지만, 기준 있는 투자와 검증된 전략은 결국 결과로 이어진다는 믿음 아래
                앞으로도 흔들리지 않는 방향성을 유지하며 나아가겠습니다.
              </p>
            </blockquote>
          </section>

        </div>
      </div>
    </div>
  );
}

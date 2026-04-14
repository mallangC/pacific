const sections = [
  {
    num: "01",
    title: "CME 기반 글로벌 거래 환경",
    paragraphs: [
      "태평양투자그룹은 글로벌 파생상품 시장의 기준이 되는 CME Group의 가격 구조를 기반으로 지수 거래 전략을 운용하고 있습니다.",
      "CME 시장은 전 세계 투자자들이 참여하는 대표적인 파생상품 거래소로, 투명한 가격 형성과 높은 유동성을 갖춘 것이 특징입니다.",
      "태평양투자그룹은 이러한 글로벌 시장 구조를 바탕으로 보다 객관적인 기준과 흐름을 반영한 투자 접근을 지향합니다.",
    ],
  },
  {
    num: "02",
    title: "마이크로 계약 기반 거래 환경",
    paragraphs: [
      "태평양투자그룹은 일반적인 선물 거래 대비 진입 장벽을 낮춘 마이크로 계약(Micro Contract) 구조를 활용한 거래 환경을 제공합니다.",
      "기존 파생상품 시장은 높은 증거금이 요구되지만, 마이크로 계약은 상대적으로 소규모 자금으로도 접근이 가능하며 리스크를 보다 세밀하게 관리할 수 있는 장점이 있습니다.",
      "이를 통해 투자자는 과도한 부담 없이 글로벌 지수 시장에 참여할 수 있으며, 상황에 따라 유연한 포지션 조절이 가능한 구조를 경험할 수 있습니다.",
    ],
  },
  {
    num: "03",
    title: "안정적인 거래 및 지원 환경",
    paragraphs: [
      "태평양투자그룹은 안정적인 거래 환경과 원활한 투자 지원을 위해 다양한 파트너 네트워크와 함께 운영되고 있습니다.",
      "거래 환경, 데이터, 그리고 투자 지원 전반에 걸쳐 지속적인 점검과 개선을 통해 투자자가 보다 안정적으로 시장에 접근할 수 있도록 지원합니다.",
    ],
  },
];

export default function CmePage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">파트너스</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">CME</h1>
          <p className="text-xs text-gray-400 mt-2">Chicago Mercantile Exchange</p>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-0 divide-y divide-gray-100">
          {sections.map((sec) => (
            <div key={sec.num} className="flex gap-4 md:gap-8 py-8 md:py-12">
              <span className="text-2xl font-light text-gray-200 tabular-nums shrink-0 w-6 text-right">
                {sec.num}
              </span>
              <div className="space-y-4">
                <h2 className="text-sm font-medium text-gray-900">{sec.title}</h2>
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-gray-500 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

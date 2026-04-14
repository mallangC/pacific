const history = [
  {
    period: "2017",
    items: ["태평양투자그룹 출범", "국내주식 중심 투자 서비스 시작"],
  },
  {
    period: "2018 – 2019",
    items: ["투자 전략 및 매매 기준 정립", "국내 중심에서 글로벌 시장으로 확장"],
  },
  {
    period: "2020 – 2021",
    items: ["글로벌 시장 대응 전략 구축", "데이터 기반 투자 분석 시스템 도입"],
  },
  {
    period: "2022 – 2023",
    items: ["국내주식·미국주식 통합 운용 체계 구축", "회원 기반 투자 서비스 확대"],
  },
  {
    period: "2024 – 현재",
    items: ["투자 전략 고도화 및 포트폴리오 확장", "지수 거래 및 글로벌 시장 대응 강화"],
    current: true,
  },
];

export default function HistoryPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">회사소개</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">연혁</h1>
        </div>
      </div>

      <div className="py-10 md:py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ol className="relative border-l border-gray-200 space-y-0">
            {history.map((row, idx) => (
              <li key={idx} className="pl-10 pb-12 last:pb-0 relative">
                {/* 타임라인 점 */}
                <span
                  className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                    row.current
                      ? "bg-gray-900 border-gray-900"
                      : "bg-white border-gray-300"
                  }`}
                />

                <p
                  className={`text-sm font-medium mb-3 ${
                    row.current ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {row.period}
                </p>

                <ul className="space-y-2">
                  {row.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-2 w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

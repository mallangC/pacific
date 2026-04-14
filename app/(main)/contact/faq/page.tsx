import KakaoMap from "@/components/KakaoMap";

const faqs = [
  {
    q: "투자 초보자도 이용 가능한가요?",
    a: "네, 기본적인 시장 이해를 돕는 안내와 함께 누구나 기준 있는 투자를 시작할 수 있도록 전문 교육을 수강한 어드바이저가 함께합니다.",
  },
  {
    q: "태평양투자그룹 사칭하며 가입비를 요구하는 연락을 받았습니다.",
    a: "태평양투자그룹은 어떠한 경우에도 문자, 전화, SNS 등을 통해 가입비 또는 선입금을 요구하지 않습니다.\n당사를 사칭하여 금전을 요구하는 행위는 불법이며, 이와 같은 연락을 받으신 경우 절대 응하지 마시기 바랍니다.\n유사 사례가 확인될 경우, 즉시 태평양투자그룹 고객센터로 연락주시면 사실 확인 및 필요한 조치를 도와드리고 있습니다.",
  },
  {
    q: "거래가 어려울 경우 도움을 받을 수 있나요?",
    a: "시장 브리핑, 전략 안내, 콘텐츠 등을 통해 투자 판단에 필요한 정보를 지속적으로 제공하고 있으며, 필요 시 전문 교육을 수강한 어드바이저의 추가적인 안내를 받으실 수 있습니다.",
  },
  {
    q: "지수 거래는 어떻게 진행되나요?",
    a: "글로벌 지수 시장의 흐름을 기반으로 정해진 전략과 기준에 따라 거래가 이루어지며, 변동성을 활용한 대응 중심의 방식으로 운영됩니다.",
  },
  {
    q: "손실이 날까 봐 걱정됩니다.",
    a: "모든 투자는 손실 가능성을 포함하고 있습니다.\n다만, 중요한 것은 손실을 피하는 것이 아니라 통제 가능한 범위 안에서 관리하는 것입니다.\n태평양투자그룹은 리스크 관리 기준을 중심으로 무리한 진입을 지양하고 안정적인 접근을 지향합니다.",
  },
];

const ADDRESS = "서울특별시 영등포구 국제금융로 2길 32 여의도파이낸스 타워";

export default function FaqPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="bg-gray-50 border-b border-gray-100 py-8 md:py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">고객안내</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">자주 묻는 질문</h1>
        </div>
      </div>

      {/* FAQ 목록 */}
      <section className="py-10 md:py-16 px-6">
        <div className="max-w-3xl mx-auto divide-y divide-gray-100">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="py-10 md:py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-light text-gray-900 mb-2">오시는 길</h2>
          <div className="w-8 h-px bg-gray-300 mb-8" />

          <div className="mb-6 space-y-2.5 text-sm text-gray-600">
            <div className="flex gap-3">
              <span className="text-gray-400 w-12 shrink-0">주소</span>
              <span>{ADDRESS}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 w-12 shrink-0">이메일</span>
              <a
                href="mailto:pacificgroup@google.com"
                className="hover:text-gray-900 transition-colors"
              >
                pacificgroup@google.com
              </a>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 w-12 shrink-0">운영</span>
              <span>평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</span>
            </div>
          </div>

          {/* 카카오 지도 */}
          <div className="rounded overflow-hidden border border-gray-200">
            <KakaoMap address={ADDRESS} placeName="태평양투자그룹" />
          </div>

        </div>
      </section>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
  warning?: boolean;
}) {
  return (
    <details className="group py-6 cursor-pointer">
      <summary className="flex items-start justify-between gap-4 list-none">
        <div className="flex items-start gap-3">
          <span className="text-xs font-medium text-gray-400 mt-0.5 shrink-0">Q.</span>
          <span className="text-sm text-gray-800 font-medium">{question}</span>
        </div>
        <span className="text-gray-400 shrink-0 text-xs mt-0.5 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <div className="mt-4 flex gap-3">
        <span className="text-xs font-medium text-gray-400 mt-0.5 shrink-0">A.</span>
        <div
          className={`text-sm leading-relaxed whitespace-pre-line text-gray-500`}
        >
          {answer}
        </div>
      </div>
    </details>
  );
}

import PageHeader from "@/components/PageHeader";
const paragraphs = [
  "태평양투자그룹은 투자 정보의 전달과 시장 이해를 돕기 위해 콘텐츠 제작사인 원데이와 협력하여 다양한 미디어 콘텐츠를 제작·운영하고 있습니다.",
  "시장은 빠르게 변화하고 있으며, 정보의 전달 방식 또한 중요해지고 있습니다. 이에 따라 태평양투자그룹은 영상 콘텐츠를 기반으로 보다 직관적이고 이해하기 쉬운 형태의 시장 정보와 투자 인사이트를 제공하고 있습니다.",
  "콘텐츠 제작사 원데이와의 협업을 통해 기획부터 제작, 운영까지 체계적인 프로세스를 구축하고 있으며, 투자자가 시장을 보다 쉽게 이해하고 접근할 수 있도록 지원합니다.",
];

export default function OnedayPage() {
  return (
    <div>
      <PageHeader title="YOUTUBE 콘텐츠 제작사 원데이" />

      <div className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="py-8 md:py-12">
            <div className="space-y-5">
              <h2 className="text-base md:text-lg font-bold text-gray-900">콘텐츠 제작 및 미디어 파트너</h2>
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg text-gray-500 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>

          {/* 마무리 */}
          <div className="border-t border-gray-100 pt-10">
            <div className="border-l-2 border-gray-200 pl-6">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                태평양투자그룹은 단순한 정보 전달을 넘어 지속적으로 소통하는 투자 환경을 만들어가고 있습니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

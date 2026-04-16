import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "국제예탁결제기구 ICSD | 태평양투자그룹",
  description: "태평양투자그룹의 파트너 국제예탁결제기구(ICSD) 기반 안정적인 자산 관리 시스템을 소개합니다.",
  openGraph: { title: "국제예탁결제기구 ICSD | 태평양투자그룹", description: "태평양투자그룹의 파트너 국제예탁결제기구(ICSD) 기반 안정적인 자산 관리 시스템을 소개합니다." },
};
const paragraphs = [
  "태평양투자그룹은 안정적인 자산 관리와 효율적인 거래 지원을 위해 국제예탁결제기구인 ICSD 구조를 기반으로 한 계좌 시스템을 활용하고 있습니다.",
  "ICSD는 글로벌 금융시장에서 증권 보관 및 결제 안정성을 담당하는 핵심 인프라로, 국제적으로 검증된 자산 관리 체계를 제공합니다.",
  "태평양투자그룹은 이러한 구조를 바탕으로 옴니버스 계좌 방식을 통해 자산을 관리하며, 투자자별 거래 내역과 자산은 내부적으로 구분 관리되는 시스템을 적용하고 있습니다.",
  "이를 통해 투자자는 개별 거래 단위로 자산 흐름을 확인할 수 있으며, 효율성과 안정성을 동시에 고려한 환경에서 거래에 참여할 수 있습니다.",
  "옴니버스 계좌는 다수의 투자 자산을 통합 관리하는 방식으로, 거래 효율성과 접근성을 높이는 동시에 운용의 유연성을 확보할 수 있는 구조입니다.",
];

export default function IcsdPage() {
  return (
    <div>
      <PageHeader title="국제예탁결제기구 ICSD" />

      <div className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="py-8 md:py-12">
            <div className="space-y-5">
              <h2 className="text-base md:text-lg font-bold text-gray-900">국제예탁결제 시스템 기반 자산 관리</h2>
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg text-gray-500 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>

          {/* 마무리 */}
          <div className="border-t border-gray-100 pt-10">
            <div className="border-l-2 border-gray-200 pl-6">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                태평양투자그룹은 검증된 국제 금융 인프라를 기반으로 안정성과 효율성을 균형 있게 갖춘
                투자 환경을 제공합니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

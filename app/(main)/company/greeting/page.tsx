import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "대표 인사말 | 태평양투자그룹",
  description: "태평양투자그룹 대표의 인사말. 투자 철학과 비전을 전합니다.",
  openGraph: { title: "대표 인사말 | 태평양투자그룹", description: "태평양투자그룹 대표의 인사말. 투자 철학과 비전을 전합니다." },
};

export default function GreetingPage() {
  return (
    <div>
      <PageHeader title="대표 인사말" />

      <div className="pb-10 px-6">
        <div className="max-w-2xl mx-auto">

          {/* 인사 */}
          <FadeInSection>
            <p className="text-lg text-gray-700 font-medium mb-6 md:mb-10">
              안녕하십니까, 태평양투자그룹 대표입니다.
            </p>
          </FadeInSection>

          {/* 본문 */}
          <div className="space-y-6 text-base text-gray-600 leading-[1.9]">
            <FadeInSection>
              <p>
                시장은 늘 기회와 위험이 공존하는 공간입니다. 누군가에게는 수익의 기회가 되지만,
                또 다른 누군가에게는 손실의 경험으로 남기도 합니다. 그 차이는 결국 &#39;정보&#39;가 아니라
                &#39;기준&#39;에서 나온다고 생각합니다.
              </p>
            </FadeInSection>
            <FadeInSection>
              <p>
                많은 투자자분들이 지금이 매수인지, 매도인지, 어디까지 올라갈지, 어디서 내려올지를
                고민합니다. 하지만 시장은 언제나 불확실성을 내포하고 있으며, 정답을 맞추는 방식으로는
                지속적인 성과를 만들기 어렵습니다.
              </p>
            </FadeInSection>

            <FadeInSection>
              <div className="border-l-2 border-primary/40 pl-6 py-1 my-8 space-y-4">
                <p>태평양투자그룹은 이러한 시장의 본질 속에서 출발했습니다.</p>
                <p>
                  우리는 방향을 예측하기보다 현재 시장이 열어두고 있는 가능성을 읽고,
                  그 안에서 확률적으로 유리한 선택을 이어가는 것을 중요하게 생각합니다.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <p>
                이를 위해 데이터 기반의 분석과 일관된 리스크 관리 원칙을 중심에 두고 있으며,
                누구나 흔들리지 않고 적용할 수 있는 투자 기준을 만드는 데 집중하고 있습니다.
              </p>
            </FadeInSection>
            <FadeInSection>
              <p>
                투자는 결국 혼자 결정해야 하는 영역입니다. 그렇기 때문에 저희는 단순한 정보 전달이 아닌,
                스스로 판단할 수 있는 기준을 전달하는 것을 목표로 하고 있습니다.
              </p>
            </FadeInSection>
            <FadeInSection>
              <p>
                시장은 계속해서 변할 것입니다. 하지만 기준이 있는 투자자는 그 변화 속에서도
                방향을 잃지 않습니다.
              </p>
            </FadeInSection>
            <FadeInSection>
              <p>
                태평양투자그룹은 앞으로도 투자자분들과 같은 방향을 바라보며,
                더 안정적이고 지속 가능한 투자 환경을 만들어 나가겠습니다.
              </p>
            </FadeInSection>
          </div>

          {/* 서명 */}
          <FadeInSection>
            <div className="mt-10 md:mt-14 pt-8 border-t border-gray-100 text-right space-y-1">
              <p className="text-base text-gray-500">감사합니다.</p>
              <p className="text-base text-gray-700 font-medium">태평양투자그룹 대표 드림</p>
            </div>
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}

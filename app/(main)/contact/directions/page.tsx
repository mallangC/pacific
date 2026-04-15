import KakaoMap from "@/components/KakaoMap";
import PageHeader from "@/components/PageHeader";

const ADDRESS = "서울특별시 영등포구 국제금융로 2길 32 여의도파이낸스 타워";

export default function DirectionsPage() {
  return (
    <div>
      <PageHeader title="오시는 길" />

      <section className="pb-16 md:pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="rounded overflow-hidden border border-gray-200">
            <KakaoMap address={ADDRESS} placeName="태평양투자그룹" />
          </div>

          <div className="mt-8 space-y-3 text-gray-600">
            <div className="flex gap-4">
              <span className="text-gray-400 w-14 shrink-0 text-base">주소</span>
              <span className="text-base md:text-lg">{ADDRESS}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-400 w-14 shrink-0 text-base">이메일</span>
              <a
                href="mailto:pacificgroup@google.com"
                className="text-base md:text-lg hover:text-gray-900 transition-colors"
              >
                pacificgroup@google.com
              </a>
            </div>
            {/* <div className="flex gap-4">
              <span className="text-gray-400 w-14 shrink-0 text-base">운영</span>
              <span className="text-base md:text-lg">평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</span>
            </div> */}
          </div>

        </div>
      </section>
    </div>
  );
}

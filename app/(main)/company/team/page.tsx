import PageHeader from "@/components/PageHeader";
const departments = [
  { name: "경영지원본부", teams: ["인사재무팀", "경영지원팀"] },
  { name: "전략투자기획본부", teams: ["투자전략팀", "리서치팀", "트레이딩팀"] },
  { name: "제휴사업본부", teams: ["운영관리팀"] },
  { name: "대외협력본부", teams: ["대외협력팀"] },
];

export default function TeamPage() {
  return (
    <div>
      <PageHeader title="조직도" />

      {/* 데스크탑: 차트형 조직도 */}
      <div className="hidden md:block py-16 px-6 overflow-x-auto">
        <div className="max-w-5xl mx-auto min-w-[600px]">
          <div className="flex items-start justify-center gap-6 mb-8">
            <OrgBox label="사외고문" sub />
            <OrgBox label="CEO" highlight />
            <OrgBox label="COO" sub />
          </div>
          <div className="flex justify-center">
            <div className="w-px h-8 bg-gray-200" />
          </div>
          <div className="relative">
            <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-gray-200" />
            <div className="grid grid-cols-4 gap-4">
              {departments.map((dept) => (
                <div key={dept.name} className="flex flex-col items-center">
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="w-full border border-gray-300 bg-white px-3 py-2.5 text-center">
                    <p className="text-sm font-medium text-gray-800">{dept.name}</p>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="w-full space-y-1">
                    {dept.teams.map((team) => (
                      <div key={team} className="border border-gray-200 bg-gray-50 px-3 py-2 text-center">
                        <p className="text-sm text-gray-500">{team}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 모바일: 리스트형 조직도 */}
      <div className="md:hidden py-10 px-6">
        <div className="space-y-6">
          {/* 임원진 */}
          <div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">임원진</p>
            <div className="grid grid-cols-3 gap-2">
              {["사외고문", "CEO", "COO"].map((role) => (
                <div
                  key={role}
                  className={`py-2.5 text-center text-sm border ${
                    role === "CEO"
                      ? "bg-gray-900 text-white border-gray-900 font-medium"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* 본부 및 팀 */}
          <div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">본부 / 팀</p>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.name} className="border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                    <p className="text-base font-medium text-gray-800">{dept.name}</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dept.teams.map((team) => (
                      <p key={team} className="px-4 py-2.5 text-base text-gray-500">{team}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrgBox({ label, highlight, sub }: { label: string; highlight?: boolean; sub?: boolean }) {
  return (
    <div
      className={`px-6 py-2.5 text-center border text-base font-medium min-w-[100px] ${
        highlight
          ? "bg-gray-900 text-white border-gray-900"
          : sub
          ? "bg-white text-gray-600 border-gray-300"
          : "bg-white text-gray-800 border-gray-300"
      }`}
    >
      {label}
    </div>
  );
}

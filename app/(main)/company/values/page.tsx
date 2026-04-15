import PageHeader from "@/components/PageHeader";

const values = [
  {
    title: "기준 중심의 투자",
    desc: "감정이나 추측이 아닌, 명확한 기준과 원칙을 기반으로 시장에 접근합니다. 모든 판단은 사전에 정의된 전략과 데이터에 근거하며, 일관된 기준이 결국 안정적인 결과로 이어진다고 믿습니다.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        {/* 기둥 */}
        <line x1="40" y1="14" x2="40" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* 받침대 */}
        <line x1="22" y1="68" x2="58" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* 팔 */}
        <line x1="10" y1="26" x2="70" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* 왼쪽 줄 */}
        <line x1="14" y1="26" x2="14" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="26" x2="22" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 왼쪽 접시 */}
        <path d="M8 38 Q18 52 28 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 오른쪽 줄 */}
        <line x1="58" y1="26" x2="58" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="66" y1="26" x2="66" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* 오른쪽 접시 */}
        <path d="M52 38 Q62 52 72 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* 중심 고정핀 */}
        <circle cx="40" cy="20" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    title: "리스크 관리 우선",
    desc: "수익은 결과이지만, 리스크 관리는 선택이 아닌 필수입니다. 태평양투자그룹은 어떠한 상황에서도 손실을 통제할 수 있는 구조를 최우선으로 설계하며, 지속 가능한 투자를 위한 기반을 지켜갑니다.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        <path d="M40 10 L68 20 L68 44 C68 58 40 70 40 70 C40 70 12 58 12 44 L12 20 Z"
          stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <polyline points="28,40 36,48 52,32"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "데이터 기반 의사결정",
    desc: "시장은 감으로 접근할 수 있는 영역이 아닙니다. 다양한 시장 데이터와 분석 지표를 활용하여 현재 시장에서 확률적으로 유리한 방향을 도출하고, 객관적인 근거 위에서 의사결정을 이어갑니다.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        <rect x="10" y="52" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="28" y="36" width="12" height="34" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="46" y="24" width="12" height="46" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="66" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" />
        <line x1="71" y1="26" x2="76" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "지속 가능한 수익 구조",
    desc: "단기적인 성과에 집중하기보다 장기적으로 반복 가능한 수익 구조를 만드는 것을 목표로 합니다. 흔들림 없는 기준과 전략을 통해 시간이 지날수록 안정적으로 축적되는 성과를 지향합니다.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        {/* 달력 외곽 */}
        <rect x="10" y="16" width="60" height="54" rx="4" stroke="currentColor" strokeWidth="2.5" />
        {/* 상단 바 */}
        <line x1="10" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2.5" />
        {/* 고리 왼쪽 */}
        <line x1="24" y1="10" x2="24" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* 고리 오른쪽 */}
        <line x1="56" y1="10" x2="56" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* 날짜 점들 */}
        <circle cx="26" cy="44" r="2.5" fill="currentColor" />
        <circle cx="40" cy="44" r="2.5" fill="currentColor" />
        <circle cx="54" cy="44" r="2.5" fill="currentColor" />
        <circle cx="26" cy="58" r="2.5" fill="currentColor" />
        <circle cx="40" cy="58" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "투자자의 성장",
    desc: "태평양투자그룹은 단순한 정보 제공을 넘어 투자자 스스로 시장을 이해하고 판단할 수 있도록 돕습니다. 올바른 기준을 공유함으로써 개개인의 투자 역량이 성장하는 것을 중요하게 생각합니다.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        {/* 줄기 */}
        <line x1="40" y1="66" x2="40" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* 왼쪽 잎 */}
        <path d="M40 48 C40 48 40 32 18 22 C18 22 18 38 40 48 Z"
          stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        {/* 오른쪽 잎 */}
        <path d="M40 38 C40 38 40 20 62 12 C62 12 62 30 40 38 Z"
          stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        {/* 땅 */}
        <line x1="24" y1="66" x2="56" y2="66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const BG = [
  { bg: "#ffffff", text: "#111827", desc: "#6b7280", accent: "var(--primary)" },
  { bg: "var(--primary)", text: "#ffffff", desc: "rgba(255,255,255,0.7)", accent: "#ffffff" },
  { bg: "#ffffff", text: "#111827", desc: "#6b7280", accent: "var(--primary)" },
  { bg: "var(--primary)", text: "#ffffff", desc: "rgba(255,255,255,0.7)", accent: "#ffffff" },
  { bg: "#ffffff", text: "#111827", desc: "#6b7280", accent: "var(--primary)" },
];

export default function ValuesPage() {
  return (
    <div>
      <PageHeader title="핵심 가치" />

      {values.map((item, idx) => (
        <div
          key={idx}
          className="relative flex flex-col items-center justify-center px-8 overflow-hidden"
          style={{
            minHeight: "100vh",
            background: BG[idx].bg,
          }}
        >
            {/* 배경 번호 */}
            <span
              className="absolute font-bold select-none pointer-events-none"
              style={{
                fontSize: "clamp(12rem, 30vw, 22rem)",
                opacity: 0.04,
                color: BG[idx].text,
                lineHeight: 1,
                bottom: "-0.1em",
                right: "0.05em",
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* 아이콘 */}
            <div className="mb-8 md:mb-10" style={{ color: BG[idx].accent }}>
              {item.icon}
            </div>

            {/* 제목 */}
            <h2
              className="text-3xl md:text-5xl font-bold mb-5 md:mb-6 text-center tracking-tight"
              style={{ color: BG[idx].text }}
            >
              {item.title}
            </h2>

            {/* 설명 */}
            <p
              className="text-base md:text-lg text-center max-w-xl leading-relaxed"
              style={{ color: BG[idx].desc }}
            >
              {item.desc}
            </p>

            {/* 스크롤 힌트 — 첫 번째 카드만 */}
            {idx === 0 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: BG[idx].desc }}>
                  Scroll
                </span>
                <div className="w-px h-8 overflow-hidden">
                  <div className="w-full animate-scroll-line" style={{ height: "100%", background: BG[idx].desc }} />
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
}

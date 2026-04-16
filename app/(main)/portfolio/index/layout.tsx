import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "지수거래 수익률 | 태평양투자그룹",
  description: "태평양투자그룹의 지수거래 월별 투자 수익률입니다.",
  openGraph: { title: "지수거래 수익률 | 태평양투자그룹", description: "태평양투자그룹의 지수거래 월별 투자 수익률입니다." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

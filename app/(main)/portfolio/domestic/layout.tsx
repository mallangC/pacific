import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "국내주식 수익률 | 태평양투자그룹",
  description: "태평양투자그룹의 국내주식 월별 투자 수익률입니다.",
  openGraph: { title: "국내주식 수익률 | 태평양투자그룹", description: "태평양투자그룹의 국내주식 월별 투자 수익률입니다." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

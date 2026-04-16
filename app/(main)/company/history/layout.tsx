import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연혁 | 태평양투자그룹",
  description: "태평양투자그룹의 설립부터 현재까지의 주요 연혁입니다.",
  openGraph: { title: "연혁 | 태평양투자그룹", description: "태평양투자그룹의 설립부터 현재까지의 주요 연혁입니다." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

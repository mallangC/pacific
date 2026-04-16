import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담문의 | 태평양투자그룹",
  description: "태평양투자그룹에 상담 문의를 남겨주세요.",
  openGraph: { title: "상담문의 | 태평양투자그룹", description: "태평양투자그룹에 상담 문의를 남겨주세요." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "태평양투자그룹",
  description: "태평양투자그룹 공식 홈페이지. 글로벌 흐름 위에서 기준을 제시합니다. 국내주식, 미국주식, 지수거래 전문 투자 그룹.",
  metadataBase: new URL("https://thepacificinvest.com"),
  openGraph: {
    title: "태평양투자그룹",
    description: "태평양투자그룹 공식 홈페이지. 글로벌 흐름 위에서 기준을 제시합니다. 국내주식, 미국주식, 지수거래 전문 투자 그룹.",
    url: "https://thepacificinvest.com",
    siteName: "태평양투자그룹",
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "FhDoY-pHgCK4OCPOttRjrgU9w3DEmBfb6cypVjiEGGA",
    other: {
      "naver-site-verification": "2258b28bb8898020122e077e11d8b58f9ffebbf4",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-[--font-pretendard]">{children}</body>
    </html>
  );
}

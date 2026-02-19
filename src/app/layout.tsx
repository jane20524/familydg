import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "대구 이혼 전문 변호사 | 홍민정·최지연 변호사",
  description:
    "대구 여성 이혼 전문 변호사 홍민정·최지연. 재산분할, 위자료, 양육권, 상간소송, 가정폭력 전문. 비밀 상담 보장.",
  keywords:
    "대구 이혼변호사, 대구 여성변호사, 재산분할, 위자료, 양육권, 상간소송, 가정폭력, 이혼상담",
  openGraph: {
    title: "대구 이혼 전문 변호사 | 홍민정·최지연",
    description:
      "대한변협 등록 이혼전문변호사 홍민정·최지연. 재산분할·위자료·양육권·상간소송 전문. 대구가정법원 사건 경험이 곧 전략입니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

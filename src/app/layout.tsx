import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-pretendard",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "대구 이혼 전문 변호사 | 홍민정·최지연 변호사",
  description:
    "대구 여성 이혼 전문 변호사 홍민정·최지연. 재산분할, 위자료, 양육권, 상간소송, 가정폭력 전문. 비밀 상담 보장. 24시간 상담 가능.",
  keywords:
    "대구 이혼변호사, 대구 여성변호사, 재산분할, 위자료, 양육권, 상간소송, 가정폭력, 이혼상담",
  openGraph: {
    title: "대구 이혼 전문 변호사 | 홍민정·최지연",
    description:
      "대구 여자의 마음, 대구 여자 변호사가 가장 잘 압니다. 재산분할·위자료·양육권·상간소송 전문.",
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

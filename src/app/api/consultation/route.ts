import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { caseTypes, preferredLawyer, name, phone, content } = await request.json()

    if (!name || !phone) {
      return NextResponse.json(
        { error: "성함과 연락처는 필수입니다." },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const caseTypeText = caseTypes.length > 0 ? caseTypes.join(", ") : "미선택"

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "jane20524@gmail.com",
      subject: `[대구 상담신청] ${name}님 - ${caseTypeText}`,
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #2d2d2d; border-bottom: 2px solid #9e5e5a; padding-bottom: 12px;">
            새로운 상담 신청이 접수되었습니다
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 12px; background: #f5f2f1; font-weight: bold; width: 120px; border: 1px solid #d9d5d4;">성함</td>
              <td style="padding: 12px; border: 1px solid #d9d5d4;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f2f1; font-weight: bold; border: 1px solid #d9d5d4;">연락처</td>
              <td style="padding: 12px; border: 1px solid #d9d5d4;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f2f1; font-weight: bold; border: 1px solid #d9d5d4;">사건 유형</td>
              <td style="padding: 12px; border: 1px solid #d9d5d4;">${caseTypeText}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f2f1; font-weight: bold; border: 1px solid #d9d5d4;">선호 변호사</td>
              <td style="padding: 12px; border: 1px solid #d9d5d4;">${preferredLawyer || "상관없음"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f5f2f1; font-weight: bold; border: 1px solid #d9d5d4;">상담 내용</td>
              <td style="padding: 12px; border: 1px solid #d9d5d4; white-space: pre-wrap;">${content || "내용 없음"}</td>
            </tr>
          </table>
          <p style="margin-top: 16px; color: #888; font-size: 12px;">
            * 이 메일은 대구 랜딩페이지 상담 폼에서 자동 발송되었습니다.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("이메일 발송 실패:", error)
    return NextResponse.json(
      { error: "상담 신청 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

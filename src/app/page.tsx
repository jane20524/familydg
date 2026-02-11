"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Phone,
  ChevronDown,
  ChevronLeft,
  Check,
  MapPin,
  MessageSquare,
  Youtube,
  FileText,
  Scale,
  Shield,
  Users,
  BadgeCheck,
  Clock,
  Lock,
  Heart,
  Gavel,
  Eye,
} from "lucide-react"

/* ── 색상 상수 ── */
const COLORS = {
  primary: "#2d2d2d",
  accent: "#9e5e5a",
  accentLight: "#efe6e5",
  primaryBg: "#f0eceb",
  text: "#1a1a1a",
  textLight: "#4a4a4a",
  textMuted: "#888888",
  border: "#d9d5d4",
  white: "#ffffff",
  bg: "#f5f2f1",
}

/* ── 전화번호/링크 상수 (placeholder) ── */
const PHONE = "053-741-7150"
const KAKAO_URL = "https://go.knp-law.com/4rcCmAR"
const OFFICE_ADDRESS = "대구광역시 수성구 동대구로353(범어동, 범어353타워) 7층"

/* ── FAQ 컴포넌트 ── */
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isOpen ? COLORS.accentLight : COLORS.white,
        border: isOpen ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-all duration-300"
        style={{ color: COLORS.text }}
      >
        <span className="font-medium text-sm md:text-base leading-relaxed">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: isOpen ? COLORS.accent : COLORS.textMuted }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p
          className="px-5 md:px-6 pb-5 md:pb-6 text-sm leading-relaxed"
          style={{ color: COLORS.textLight }}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  )
}

/* ── 메인 랜딩 ── */
export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [matchStep, setMatchStep] = useState(0)
  const [matchAnswers, setMatchAnswers] = useState<number[]>([])
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const [formData, setFormData] = useState({
    caseTypes: [] as string[],
    name: "",
    phone: "",
    content: "",
    privacyAgree: true,
  })
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert("성함과 연락처를 입력해 주세요.")
      return
    }
    if (!formData.privacyAgree) {
      alert("개인정보 수집 및 이용에 동의해 주세요.")
      return
    }

    setSubmitState("loading")
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseTypes: formData.caseTypes,
          name: formData.name,
          phone: formData.phone,
          content: formData.content,
        }),
      })

      if (!res.ok) throw new Error("발송 실패")

      setSubmitState("success")
      setFormData({ caseTypes: [], name: "", phone: "", content: "", privacyAgree: true })
    } catch {
      setSubmitState("error")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const matchQuestions = [
    {
      question: "지금 가장 필요한 것은 무엇인가요?",
      options: [
        { text: "상황을 빠르게 정리하고, 명확한 방향을 잡고 싶어요", score: 0 },
        { text: "제 이야기를 들어주고, 마음까지 헤아려줄 변호사가 필요해요", score: 1 },
      ],
    },
    {
      question: "소송이 진행되는 동안, 변호사에게 바라는 것은?",
      options: [
        { text: "\"맡겨만 주세요\" — 든든하게 이끌어주는 스타일", score: 0 },
        { text: "\"같이 가요\" — 과정을 함께 나누며 결정하는 스타일", score: 1 },
      ],
    },
    {
      question: "상대방이 갑자기 예상 밖의 행동을 한다면?",
      options: [
        { text: "즉시 단호하게 차단하고 법적으로 대응해줬으면 해요", score: 0 },
        { text: "상황을 차분히 파악한 뒤, 가장 효과적인 방법을 찾아줬으면 해요", score: 1 },
      ],
    },
  ]

  const handleMatchAnswer = (score: number) => {
    const newAnswers = [...matchAnswers, score]
    setMatchAnswers(newAnswers)
    if (newAnswers.length < matchQuestions.length) {
      setMatchStep(matchStep + 1)
    } else {
      setMatchStep(matchQuestions.length)
    }
  }

  const matchResult = matchAnswers.length === matchQuestions.length
    ? matchAnswers.reduce((a, b) => a + b, 0) >= 2
      ? {
          name: "최지연 변호사",
          specialty: "재산분할·상간소송·양육권 전문",
          quote: "당신 곁에서 따뜻하게, 상대에게는 치밀하고 얄짤없이.",
          image: "/images/profile_choi.jpg",
        }
      : {
          name: "홍민정 변호사",
          specialty: "재산분할·위자료 전문",
          quote: "명확한 전략으로, 든든하게 지켜드리겠습니다.",
          image: "/images/profile_hong.jpg",
        }
    : null

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      caseTypes: prev.caseTypes.includes(value)
        ? prev.caseTypes.filter((v) => v !== value)
        : [...prev.caseTypes, value],
    }))
  }

  const faqData = [
    {
      question: "대구 이혼 전문 변호사를 찾아야 하는 이유가 있나요?",
      answer: `이혼·상간 소송은 지역 법원마다 판결 성향과 위자료 기준이 다릅니다. 저희는 <strong style="color:${COLORS.accent};">대구가정법원의 판결 경향을 가장 잘 이해</strong>하는 지역 밀착형 전문가로서, 대구 법원에 최적화된 전략을 제시합니다.`,
    },
    {
      question: "이혼 상담 비밀보장 되나요? 익명으로 상담받을 수 있나요?",
      answer: `모든 상담은 변호사법에 따라 <strong style="color:${COLORS.accent};">철저히 비밀이 보장</strong>됩니다. 별도의 비밀 상담실에서 진행되며, 상담 기록은 암호화하여 관리합니다. 가족이나 직장에 알려지지 않도록 안심하고 상담받으실 수 있습니다.`,
    },
    {
      question: "상간소송 증거 없을 때도 소송이 가능한가요?",
      answer: `물론입니다. 오히려 <strong style="color:${COLORS.accent};">증거가 부족할 때 전문가의 도움이 더 필요</strong>합니다. 카톡 대화, 카드 내역, 위치 기록 등 정황 증거만으로도 입증이 가능하며, 법원 사실조회·금융거래 추적·통신자료 조회 등 합법적인 방법으로 증거를 확보할 수 있습니다.`,
    },
    {
      question: "이혼 재산분할 전업주부도 받을 수 있나요?",
      answer: `네, 전업주부도 <strong style="color:${COLORS.accent};">혼인 중 형성된 재산에 대해 정당한 분할을 받을 수 있습니다.</strong> 가사노동과 육아의 기여도가 법적으로 인정되며, 상대방 명의의 부동산·예금·주식 등도 분할 대상이 됩니다. 은닉 재산이 의심되는 경우 법원 사실조회를 통해 추적합니다.`,
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
        backgroundColor: COLORS.white,
      }}
    >
      {/* ═══════════ 고정 내비게이션 ═══════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: showNav ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: showNav ? "blur(12px)" : "none",
          borderBottom: showNav ? `1px solid ${COLORS.border}` : "none",
          transform: showNav ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: showNav ? "auto" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-bold" style={{ color: COLORS.text }}>
            법무법인 김앤파트너스
          </span>
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "변호사 소개", id: "youtube" },
              { label: "성공사례", id: "cases" },
              { label: "전문분야", id: "practice" },
              { label: "진행절차", id: "process" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm transition-colors duration-200 hover:opacity-70"
                style={{ color: COLORS.textLight }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollToSection("consultation")}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
          >
            무료 상담 신청
          </button>
        </div>
      </nav>

      {/* ═══════════ S1. 히어로 ═══════════ */}
      <section
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ backgroundColor: COLORS.white }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 텍스트 영역 */}
            <div className="order-2 lg:order-1">
              {/* 라벨 */}
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-medium tracking-wide mb-8"
                style={{
                  color: COLORS.accent,
                  backgroundColor: COLORS.accentLight,
                }}
              >
                대구 이혼 전문 여성 변호사
              </span>

              {/* 메인 카피 */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: COLORS.text }}
              >
                대구 여자의 마음,
                <br />
                <span style={{ color: COLORS.accent }}>
                  대구 여자 변호사가
                  <br />
                  가장 잘 압니다.
                </span>
              </h1>

              {/* 서브 카피 */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: COLORS.textLight }}
              >
                법무법인 김앤파트너스
                <br />
                <strong style={{ color: COLORS.text }}>홍민정 · 최지연 변호사</strong>가
                <br />
                당신의 새로운 시작을 함께합니다.
              </p>

              {/* CTA 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => scrollToSection("consultation")}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                  }}
                >
                  <Lock size={18} />
                  지금 바로 비밀 상담 시작하기
                </button>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-gray-50"
                  style={{
                    backgroundColor: "transparent",
                    color: COLORS.text,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <Phone size={18} />
                  긴급 전화상담
                </a>
              </div>

              {/* 하단 태그 */}
              <div className="flex flex-wrap gap-2">
                {["재산분할", "위자료", "양육권", "상간소송", "가정폭력", "이혼소송"].map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-sm"
                      style={{
                        backgroundColor: COLORS.accentLight,
                        color: COLORS.accent,
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* 이미지 영역 */}
            <div className="order-1 lg:order-2">
              <div
                className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden"
                style={{ backgroundColor: COLORS.primaryBg }}
              >
                <Image
                  src="/images/2lawyers.png"
                  alt="홍민정·최지연 변호사"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const placeholder = target.parentElement?.querySelector(
                      ".placeholder"
                    ) as HTMLElement
                    if (placeholder) placeholder.style.display = "flex"
                  }}
                />
                <div
                  className="placeholder absolute inset-0 items-center justify-center hidden"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <div className="text-center">
                    <p className="text-sm mb-2" style={{ color: COLORS.textMuted }}>
                      변호사 프로필 사진
                    </p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>
                      /public/images/hero-lawyers.jpg
                    </p>
                  </div>
                </div>
                {/* 하단 정보 오버레이 */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background: "linear-gradient(transparent, rgba(58,58,58,0.85))",
                  }}
                >
                  <p className="text-white text-sm opacity-80">법무법인 김앤파트너스 대구</p>
                  <p className="text-white text-xl font-bold">홍민정 · 최지연 변호사</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S2. 유튜브 영상 ═══════════ */}
      <section id="youtube" className="py-20 md:py-28" style={{ backgroundColor: COLORS.primaryBg }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              VIDEO COUNSEL
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: COLORS.text }}
            >
              어떤 변호사인지 직접 확인하세요
            </h2>
            <p className="text-base" style={{ color: COLORS.textLight }}>
              상담 전, 영상으로 먼저 만나보세요
            </p>
          </div>

          {/* 영상 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: "ZEDSdHkpgYk",
                url: "https://go.knp-law.com/3MCphBJ",
                title: "결혼 전 피해야 할 유형",
                desc: "이런 사람과 결혼하면 후회합니다! 이혼전문변호사가 말하는 반드시 피해야 할 5가지 유형",
                lawyer: "홍민정·최지연 변호사",
                icon: Scale,
              },
              {
                id: "YDTRTQrsYH8",
                url: "https://go.knp-law.com/4krXXml",
                title: "부정행위 녹음, 합법일까?",
                desc: "부정행위 현장 대화가 우연히 녹음된 사례 — 합법 vs 불법 증거의 실제 판단 기준",
                lawyer: "홍민정 변호사",
                icon: Gavel,
              },
              {
                id: "9RXYRGrFRXY",
                url: "https://go.knp-law.com/4ajXzmx",
                title: "상간소송 합의 2,500만원",
                desc: "판결 없이 합의서 작성으로 2,500만 원 받은 실제 사례",
                lawyer: "최지연 변호사",
                icon: Scale,
              },
            ].map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white }}
              >
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <video.icon size={16} style={{ color: COLORS.accent }} />
                    <span className="text-sm font-semibold" style={{ color: COLORS.text }}>
                      {video.title}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: COLORS.textLight }}>
                    {video.desc}
                  </p>
                  <p className="text-xs" style={{ color: COLORS.textMuted }}>
                    {video.lawyer}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* 유튜브 채널 링크 */}
          <div className="text-center mt-10">
            <a
              href="https://go.knp-law.com/3ZwNbBz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: COLORS.white,
                color: COLORS.accent,
                border: `1px solid ${COLORS.accent}40`,
              }}
            >
              <Youtube size={18} />
              유튜브 채널에서 더 많은 영상 보기
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S3. 두 변호사 소개 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              OUR LAWYERS
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold leading-snug"
              style={{ color: COLORS.text }}
            >
              각자의 강점으로
              <br />
              당신의 권리를 지킵니다
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 홍민정 변호사 */}
            <div
              className="rounded-2xl transition-all duration-300 hover:shadow-lg overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              {/* 프로필 이미지 */}
              <div
                className="relative w-full aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: COLORS.accentLight }}
              >
                <Image
                  src="/images/profile_hong.jpg"
                  alt="홍민정 변호사"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(transparent, rgba(58,58,58,0.85))" }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)", color: COLORS.white }}
                  >
                    이혼 · 도산 전문
                  </span>
                  <h3 className="text-xl font-bold text-white">홍민정 변호사</h3>
                  <p className="text-sm text-white/70">재산분할·위자료 전문</p>
                </div>
              </div>

              <div className="p-6">
                <p
                  className="text-base md:text-lg leading-relaxed mb-5 font-semibold"
                  style={{ color: COLORS.textLight }}
                >
                  &ldquo;명확한 전략으로, 끝까지 든든하게 지켜드리겠습니다.&rdquo;
                </p>
                <ul className="space-y-2.5">
                  {[
                    "영산대학교 법학과 졸업",
                    "제53회 사법시험 합격 / 사법연수원 43기 수료",
                    "대한변호사협회 [도산] 전문변호사",
                    "대한변호사협회 [이혼] 전문변호사",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: COLORS.textLight }}
                    >
                      <BadgeCheck
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: COLORS.accent }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 최지연 변호사 */}
            <div
              className="rounded-2xl transition-all duration-300 hover:shadow-lg overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              {/* 프로필 이미지 */}
              <div
                className="relative w-full aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: COLORS.accentLight }}
              >
                <Image
                  src="/images/profile_choi.jpg"
                  alt="최지연 변호사"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(transparent, rgba(45,45,45,0.85))" }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)", color: COLORS.white }}
                  >
                    이혼 · 형사 전문
                  </span>
                  <h3 className="text-xl font-bold text-white">최지연 변호사</h3>
                  <p className="text-sm text-white/70">상간소송·양육권 전문</p>
                </div>
              </div>

              <div className="p-6">
                <p
                  className="text-base md:text-lg leading-relaxed mb-5 font-semibold"
                  style={{ color: COLORS.textLight }}
                >
                  &ldquo;당신에게는 따뜻하게, 상대에게는 얄짤없이.&rdquo;
                </p>
                <ul className="space-y-2.5">
                  {[
                    "경북대학교 법학부 졸업",
                    "제53회 사법시험 합격 / 사법연수원 43기 수료",
                    "대한변호사협회 [형사법] 전문변호사",
                    "대한변호사협회 [이혼] 전문변호사",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: COLORS.textLight }}
                  >
                    <BadgeCheck
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: COLORS.accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S3.5 나에게 맞는 변호사 찾기 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.primaryBg }}>
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              FIND YOUR LAWYER
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold leading-snug mb-3"
              style={{ color: COLORS.text }}
            >
              나에게 맞는 변호사는?
            </h2>
            <p className="text-sm" style={{ color: COLORS.textLight }}>
              3가지 질문에 답하면, 내 상황에 딱 맞는 변호사를 알려드려요.
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            {/* 프로그레스 바 */}
            <div className="h-1.5" style={{ backgroundColor: COLORS.accentLight }}>
              <div
                className="h-full transition-all duration-500 ease-out rounded-r-full"
                style={{
                  width: `${(Math.min(matchStep, matchQuestions.length) / matchQuestions.length) * 100}%`,
                  backgroundColor: COLORS.accent,
                }}
              />
            </div>

            <div className="p-8 md:p-10">
              {/* 질문 단계 */}
              {matchStep < matchQuestions.length && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: COLORS.accentLight, color: COLORS.accent }}
                    >
                      {matchStep + 1} / {matchQuestions.length}
                    </span>
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold mb-8"
                    style={{ color: COLORS.text }}
                  >
                    {matchQuestions[matchStep].question}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {matchQuestions[matchStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleMatchAnswer(opt.score)}
                        className="w-full text-left px-6 py-5 rounded-xl text-sm md:text-base font-medium transition-all duration-300 hover:shadow-md"
                        style={{
                          backgroundColor: COLORS.bg,
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.text,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = COLORS.accent
                          e.currentTarget.style.backgroundColor = COLORS.accentLight
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = COLORS.border
                          e.currentTarget.style.backgroundColor = COLORS.bg
                        }}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                  {matchStep > 0 && (
                    <button
                      onClick={() => {
                        setMatchStep(matchStep - 1)
                        setMatchAnswers(matchAnswers.slice(0, -1))
                      }}
                      className="flex items-center gap-1 mt-6 text-sm transition-all duration-200 hover:opacity-70"
                      style={{ color: COLORS.textMuted }}
                    >
                      <ChevronLeft size={14} />
                      이전 질문
                    </button>
                  )}
                </div>
              )}

              {/* 결과 */}
              {matchResult && (
                <div className="text-center">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
                    style={{ backgroundColor: COLORS.accentLight, color: COLORS.accent }}
                  >
                    <Check size={14} />
                    매칭 완료
                  </div>
                  <div className="flex flex-col items-center gap-5">
                    <div
                      className="relative w-24 h-24 rounded-full overflow-hidden"
                      style={{ border: `3px solid ${COLORS.accent}` }}
                    >
                      <Image
                        src={matchResult.image}
                        alt={matchResult.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: COLORS.text }}
                      >
                        {matchResult.name}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: COLORS.accent }}>
                        {matchResult.specialty}
                      </p>
                      <p
                        className="text-base font-medium mb-6"
                        style={{ color: COLORS.textLight }}
                      >
                        &ldquo;{matchResult.quote}&rdquo;
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={() => scrollToSection("consultation")}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                      >
                        <Lock size={16} />
                        {matchResult.name}에게 상담 신청
                      </button>
                      <button
                        onClick={() => { setMatchStep(0); setMatchAnswers([]) }}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: "transparent",
                          color: COLORS.textLight,
                          border: `1px solid ${COLORS.border}`,
                        }}
                      >
                        다시 해보기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S4. Social Proof - 통계 & 사례 ═══════════ */}
      <section id="cases" className="py-20 md:py-28" style={{ backgroundColor: COLORS.primaryBg }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-8">
            <h3
              className="text-xl md:text-2xl font-bold"
              style={{ color: COLORS.text }}
            >
              법정에서 증명한 이야기
            </h3>
            <p className="text-sm mt-2" style={{ color: COLORS.textMuted }}>
              * 의뢰인 보호를 위해 개인정보는 비공개 처리되었습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "재산분할",
                icon: Scale,
                title: "1심 패소 → 항소심 역전, 오히려 1,400만원 수령",
                desc: "1심에서 재산분할금 5,000만 원 지급 판결을 받았으나, 항소심에서 금융거래정보제출명령으로 아내의 은닉 재산을 추적. 누락된 퇴직금·증권·예금을 찾아내고, 지인 송금 4,000만 원까지 재산에 포함시켜 판결을 완전히 뒤집었습니다.",
                result: "역전승 — 1,400만원 수령",
                image: "/images/case 1.png",
              },
              {
                type: "상간소송",
                icon: Gavel,
                title: "남편 사망 후 상간녀 상대 위자료 2,500만원 인용",
                desc: "남편 외도 발각 후 상간녀의 협박으로 남편이 극단적 선택을 한 사건. 증언 확보가 불가능한 상황에서 휴대폰 포렌식으로 장기 부정행위와 악의적 협박 정황을 입증하고, 의뢰인과 자녀의 돌이킬 수 없는 피해를 강력히 변론하여 통상보다 높은 위자료를 이끌어냈습니다.",
                result: "위자료 2,500만원 인용",
                image: "/images/case 2.png",
              },
              {
                type: "양육권·양육비",
                icon: Users,
                title: "가정폭력 남편 상대 단독 친권·양육권 + 양육비 2배 확보",
                desc: "임신 중 폭행과 출산 직후 가출·경제적 방임을 겪은 사건. 진단서로 폭력을 입증하고, 고소득 남편의 소득 은폐를 반박하여 상대 제안의 2배인 월 150만 원 양육비와 단독 친권·양육권을 확보. 위자료·과거 양육비 1,300만 원까지 수령했습니다.",
                result: "단독 친권·양육권 + 월 150만원",
                image: "/images/case 3.png",
              },
            ].map((caseItem, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {/* 케이스 헤더 */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{
                    backgroundColor: COLORS.accentLight,
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <caseItem.icon size={18} style={{ color: COLORS.accent }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: COLORS.text }}
                    >
                      {caseItem.type}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>
                    실제 판결
                  </span>
                </div>

                {/* 판결문 이미지 */}
                {caseItem.image && (
                  <div className="relative w-full">
                    <Image
                      src={caseItem.image}
                      alt={`${caseItem.type} 판결문`}
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <h4
                    className="text-base font-bold mb-3 leading-snug"
                    style={{ color: COLORS.text }}
                  >
                    {caseItem.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: COLORS.textLight }}
                  >
                    {caseItem.desc}
                  </p>
                  {/* 판결 결과 */}
                  <div
                    className="p-4 rounded-xl text-center mt-auto"
                    style={{
                      backgroundColor: COLORS.accentLight,
                      border: `1px solid ${COLORS.accent}30`,
                    }}
                  >
                    <span
                      className="block text-xs mb-1 font-semibold"
                      style={{ color: COLORS.accent }}
                    >
                      판결 결과
                    </span>
                    <span
                      className="block text-lg font-bold"
                      style={{ color: COLORS.accent }}
                    >
                      {caseItem.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S5. 긴급 CTA 띠 배너 ═══════════ */}
      <section
        className="py-10"
        style={{
          backgroundColor: COLORS.primary,
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                이혼 소송, 골든타임을 놓치면
              </p>
              <p
                className="text-base md:text-lg font-semibold"
                style={{ color: COLORS.white }}
              >
                증거도 재산도 사라집니다.
              </p>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.white,
              }}
            >
              <Phone size={18} />
              긴급 전화상담
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 전문 분야 (Practice Areas) ═══════════ */}
      <section id="practice" className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: COLORS.accent }}>
              PRACTICE AREAS
            </p>
            <h3 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.text }}>
              대구 이혼 전문 변호사가 해결합니다
            </h3>
            <p className="text-sm mt-3" style={{ color: COLORS.textLight }}>
              각 분야별 전문 변호사가 최적의 전략을 세워드립니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Scale,
                title: "재산분할",
                keyword: "대구 재산분할 변호사",
                desc: "부동산·퇴직금·주식 등 은닉 재산 추적부터 기여도 산정까지, 정당한 몫을 확보합니다.",
              },
              {
                icon: Gavel,
                title: "상간소송",
                keyword: "대구 상간소송 변호사",
                desc: "부정행위 증거 확보와 위자료 청구. 포렌식·SNS·카드 내역 등 체계적으로 입증합니다.",
              },
              {
                icon: Users,
                title: "양육권·양육비",
                keyword: "대구 양육권 변호사",
                desc: "자녀의 안정적 양육 환경을 최우선으로, 친권·양육권·양육비를 확보합니다.",
              },
              {
                icon: Shield,
                title: "가정폭력",
                keyword: "대구 가정폭력 변호사",
                desc: "피해 입증부터 접근금지·보호명령까지, 당신과 자녀의 안전을 지켜냅니다.",
              },
              {
                icon: Heart,
                title: "위자료 청구",
                keyword: "대구 위자료 변호사",
                desc: "외도·폭력·유기 등 유책 사유에 따른 적정 위자료를 산정하고 관철합니다.",
              },
              {
                icon: FileText,
                title: "협의이혼",
                keyword: "대구 협의이혼 변호사",
                desc: "합의서 작성부터 재산분할·양육 조건까지, 불리한 합의 없이 마무리합니다.",
              },
            ].map((area, i) => (
              <a
                key={i}
                href="#consultation"
                className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg flex flex-col"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <area.icon size={20} style={{ color: COLORS.accent }} />
                </div>
                <h4 className="text-base font-bold mb-2" style={{ color: COLORS.text }}>
                  {area.title}
                </h4>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: COLORS.textLight }}>
                  {area.desc}
                </p>
                <span
                  className="text-xs font-semibold group-hover:underline"
                  style={{ color: COLORS.accent }}
                >
                  무료 상담 신청 →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S6. Local Trust ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              LOCAL EXPERT
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.text }}
            >
              멀리 갈 필요 없습니다
            </h2>
            <p className="text-base mt-3" style={{ color: COLORS.textLight }}>
              대구 범어동에서, 대구가정법원과 가장 가까운 곳에서
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "범어동 사무실",
                desc: "대구가정법원 인근, 접근성 좋은 범어동 중심에 위치하여 언제든 편하게 방문하실 수 있습니다.",
              },
              {
                icon: Scale,
                title: "대구가정법원 전문",
                desc: "대구가정법원의 판결 성향과 기준을 정확히 파악하고 있어, 지역 법원에 최적화된 전략을 세워드립니다.",
              },
              {
                icon: Shield,
                title: "비밀 상담실 운영",
                desc: "완전히 독립된 비밀 상담실에서 상담이 진행됩니다. 다른 의뢰인과 마주칠 걱정이 없습니다.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <item.icon size={24} style={{ color: COLORS.accent }} />
                </div>
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ color: COLORS.text }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: COLORS.textLight }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S7. 프로세스 - 5단계 ═══════════ */}
      <section id="process" className="py-20 md:py-28" style={{ backgroundColor: COLORS.primaryBg }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              PROCESS
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.text }}
            >
              새로운 시작을 위한 5단계
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* 연결선 */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
              style={{ backgroundColor: COLORS.accent + "40" }}
            />

            {[
              {
                num: "01",
                title: "1:1 심층 상담",
                desc: "비밀이 보장되는 별도의 상담실에서, 담당 변호사가 직접 만나 현재 상황을 정밀하게 분석합니다.",
              },
              {
                num: "02",
                title: "맞춤 전략 수립",
                desc: "사건의 유형과 상대방의 약점을 파악하여, 승소 확률을 최대로 높이는 맞춤 전략을 설계합니다.",
              },
              {
                num: "03",
                title: "소장·서면 작성",
                desc: "담당 변호사가 증거를 꼼꼼히 정리하고, 판사를 설득할 수 있는 논리적 구조로 소장과 준비서면을 완성합니다.",
              },
              {
                num: "04",
                title: "재판·조정 대리",
                desc: "법정에서 의뢰인의 이익을 최우선으로 변론합니다. 조정 과정에서도 유리한 합의를 이끌어냅니다.",
              },
              {
                num: "05",
                title: "판결 및 집행",
                desc: "승소 판결 후 실제 집행까지 책임집니다. 재산분할 이행, 양육비 직접지급명령 등 결과를 현실로 만듭니다.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-5 md:gap-7 mb-8 relative"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-base font-bold relative z-10"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="flex-1 p-5 md:p-6 rounded-xl"
                  style={{
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <h4
                    className="text-base md:text-lg font-bold mb-2"
                    style={{ color: COLORS.text }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: COLORS.textLight }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S8. FAQ ═══════════ */}
      <section id="faq" className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              FAQ
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.text }}
            >
              자주 묻는 질문
            </h2>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S9. 상담 폼 ═══════════ */}
      <section
        id="consultation"
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ color: COLORS.white }}
            >
              1:1 비공개 상담 신청
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              남겨주시는 내용은 담당 변호사에게 직접 전달됩니다.
              <br />
              가장 빠른 시간 내에 변호사가 직접 연락드립니다.
            </p>
          </div>

          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{ backgroundColor: COLORS.white }}
          >
            {/* 사건 유형 체크 */}
            <div className="mb-6">
              <p
                className="text-sm mb-3 font-medium"
                style={{ color: COLORS.textLight }}
              >
                해당 사항을 체크해 주세요
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "재산분할",
                  "위자료",
                  "상간소송",
                  "양육권/양육비",
                  "가정폭력",
                  "이혼소송",
                  "기타",
                ].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: formData.caseTypes.includes(type)
                        ? COLORS.accentLight
                        : COLORS.bg,
                      border: formData.caseTypes.includes(type)
                        ? `1px solid ${COLORS.accent}`
                        : `1px solid ${COLORS.border}`,
                    }}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.caseTypes.includes(type)}
                      onChange={() => handleCheckboxChange(type)}
                    />
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: formData.caseTypes.includes(type)
                          ? COLORS.accent
                          : "transparent",
                        border: formData.caseTypes.includes(type)
                          ? "none"
                          : `2px solid ${COLORS.border}`,
                      }}
                    >
                      {formData.caseTypes.includes(type) && (
                        <Check size={12} style={{ color: COLORS.white }} />
                      )}
                    </span>
                    <span className="text-sm" style={{ color: COLORS.text }}>
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 입력 필드 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <input
                type="text"
                placeholder="성함"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
              <input
                type="tel"
                placeholder="연락처"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
              <textarea
                placeholder="사건 내용을 간략히 적어주세요 (비밀보장)"
                rows={4}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="col-span-2 w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none resize-y min-h-[120px]"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="mb-5">
              <label className="flex items-center gap-2.5 px-1 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.privacyAgree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      privacyAgree: e.target.checked,
                    })
                  }
                />
                <span
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: formData.privacyAgree
                      ? COLORS.accent
                      : "transparent",
                    border: formData.privacyAgree
                      ? "none"
                      : `2px solid ${COLORS.border}`,
                  }}
                >
                  {formData.privacyAgree && (
                    <Check size={12} style={{ color: COLORS.white }} />
                  )}
                </span>
                <span
                  className="text-sm"
                  style={{ color: COLORS.textLight }}
                >
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            {submitState === "success" ? (
              <div className="text-center py-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <Check size={28} style={{ color: COLORS.accent }} />
                </div>
                <p className="text-lg font-bold mb-2" style={{ color: COLORS.text }}>
                  상담 신청이 완료되었습니다
                </p>
                <p className="text-sm" style={{ color: COLORS.textLight }}>
                  빠른 시간 내에 변호사가 직접 연락드리겠습니다.
                </p>
                <button
                  onClick={() => setSubmitState("idle")}
                  className="mt-4 text-sm underline"
                  style={{ color: COLORS.accent }}
                >
                  추가 상담 신청
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitState === "loading"}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                  }}
                >
                  <Lock size={18} />
                  {submitState === "loading" ? "발송 중..." : "1:1 비공개 상담 신청하기"}
                </button>

                {submitState === "error" && (
                  <p className="text-center text-sm mt-3" style={{ color: "#e74c3c" }}>
                    발송에 실패했습니다. 전화로 문의해 주세요.
                  </p>
                )}

                <div className="flex items-center justify-center gap-2 mt-4">
                  <Clock size={14} style={{ color: COLORS.textMuted }} />
                  <p className="text-xs" style={{ color: COLORS.textMuted }}>
                    야간/주말 문자 상담 가능 · 접수 후 24시간 내 회신
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ S10. 푸터 ═══════════ */}
      <footer
        className="py-16"
        style={{
          backgroundColor: COLORS.primaryBg,
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* 감성 카피 */}
          <p
            className="text-xl md:text-2xl font-bold mb-8"
            style={{ color: COLORS.text }}
          >
            오늘 밤은 걱정 없이 주무세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.white,
              }}
            >
              <Phone size={18} />
              24시 전화상담
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#FEE500",
                color: "#3C1E1E",
              }}
            >
              <MessageSquare size={18} />
              카카오톡 상담
            </a>
          </div>

          {/* 사무소 정보 */}
          <div
            className="flex items-center justify-center gap-2 mb-4"
            style={{ color: COLORS.textLight }}
          >
            <MapPin size={16} style={{ opacity: 0.5 }} />
            <span className="text-sm">{OFFICE_ADDRESS}</span>
          </div>

          <p
            className="text-xs mb-4 leading-relaxed"
            style={{ color: COLORS.textMuted }}
          >
            본 페이지의 내용은 법률 상담의 일반적인 정보 제공을 목적으로 하며,
            <br className="hidden md:block" />
            구체적인 법률 문제에 대해서는 반드시 전문가와 상담하시기 바랍니다.
          </p>

          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © 2026. 법무법인 김앤파트너스 All rights reserved.
          </p>
        </div>
      </footer>

      {/* ═══════════ S11. 플로팅 버튼 ═══════════ */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 z-50">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: COLORS.accent,
            color: COLORS.white,
          }}
        >
          <Phone size={18} />
          <span className="hidden md:inline">전화상담</span>
        </a>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: "#FEE500",
            color: "#3C1E1E",
          }}
        >
          <MessageSquare size={18} />
          <span className="hidden md:inline">카카오톡</span>
        </a>
        <button
          onClick={() => scrollToSection("consultation")}
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: COLORS.white,
            color: COLORS.accent,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <FileText size={18} />
          <span className="hidden md:inline">비공개상담</span>
        </button>
      </div>
    </div>
  )
}

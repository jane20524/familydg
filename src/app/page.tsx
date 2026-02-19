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
  Lock,
  Heart,
  Gavel,
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

/* ── 전화번호/링크 상수 ── */
const PHONE = "010-6624-7140"
const KAKAO_URL = "https://go.knp-law.com/4rcCmAR"
const OFFICE_ADDRESS = "대구광역시 수성구 동대구로353(범어동, 범어353타워) 7층"

/* ── 변호사별 데이터 ── */
const LAWYERS = {
  hong: {
    name: "홍민정 변호사",
    specialty: "재산분할·위자료 전문",
    tag: "이혼 · 도산 전문",
    quote: "의뢰인의 눈물은 닦아드리고,<br/>상대방의 은닉 재산은 탈탈 텁니다.",
    certs: ["대한변협 등록 이혼 전문", "대한변협 등록 도산 전문"],
    education: "영산대 법학과 · 사법시험 53회 · 사법연수원 43기",
    image: "/images/profile_hong.jpg",
    videos: [
      { id: "YDTRTQrsYH8", url: "https://go.knp-law.com/4krXXml", title: "몰래 녹음한 증거, 써도 될까?", desc: "배우자의 외도 현장이 녹음됐을 때, 증거로 쓸 수 있는 경우와 없는 경우", icon: Gavel, lawyer: "홍민정 변호사 단독 영상" },
      { id: "XVIysjrlc9w", url: "https://go.knp-law.com/4rPwXja", title: "협의이혼 시 꼭 합의해야 하는 핵심 사항 5가지", desc: "위자료, 재산분할, 친권·양육권, 양육비, 면접교섭까지 — 협의이혼 전 반드시 확인해야 할 체크포인트", icon: FileText, lawyer: "홍민정 변호사 단독 영상" },
      { id: "ZEDSdHkpgYk", url: "https://go.knp-law.com/3MCphBJ", title: "이런 사람, 절대 결혼하지 마세요", desc: "이혼 전문 변호사가 수백 건의 사건에서 발견한, 결혼하면 후회하는 5가지 유형", icon: Scale, lawyer: "공통 영상" },
    ],
    cases: [
      { type: "재산분할", summary: "재산분할 역전승 1,400만원", icon: Scale, title: "5,000만원을 내주어야 했던 1심 판결을 뒤집고, 오히려 1,400만원을 받아냈습니다", desc: "아내의 이혼 청구로 1심에서 약 5,000만 원을 내주어야 하는 판결을 받았습니다. 항소심에서 금융거래정보제출명령을 통해 아내의 퇴직금이 1심 인정액의 10배에 달하는 점, 각종 증권·예금 미반영분을 밝혀내 적극재산을 1억 원 넘게 늘렸습니다. 또한 아내가 소송 전 약 4,000만 원을 주변인에게 빼돌린 재산 은닉 정황까지 포착하고, 관계 회복 차원으로 지급한 2,000만 원도 아내의 적극재산에 편입시켜 판결을 완전히 뒤집었습니다.", result: "역전승 — 1,400만원 수령", image: "/images/hong case 1.png" },
      { type: "이혼·형사", summary: "불법촬영·스토킹 배우자 이혼 + 부동산 확보", icon: Gavel, title: "불법촬영·스토킹 배우자와 단 1회 조정으로 완전히 끊어냈습니다", desc: "배우자가 욕실에 몰카를 설치하고, 별거 후에는 스토킹·주거침입까지 저질렀습니다. 형사 고소를 협상 카드로 활용해 단 1회 조정 기일에 부동산 단독 소유권과 친권·양육권을 모두 확보하고, 법적으로 완벽하게 관계를 단절했습니다.", result: "부동산 단독 확보 + 단독 친권·양육권", image: "/images/hong case 2.png" },
      { type: "상간소송", summary: "성관계 증거 없이 위자료 2,400만원", icon: Heart, title: "성관계 증거 없이, 5개월 교제 정황만으로 위자료 2,400만원 판결", desc: "25년 혼인생활 중 아내의 부정행위를 발견했지만 직접적 성관계 증거가 없었습니다. 카카오톡·통화내역을 시간대별·빈도별로 패턴화하고, 근무표 대조로 동일 휴무일 장시간 연락을 입증했습니다. 포항 여행 정황과 허위 해명을 집중 공략해 상간남의 부정행위를 인정받아 위자료 2,400만 원을 판결받았습니다.", result: "위자료 2,400만원 (지연손해금·가집행 포함)", image: "/images/hong case 3.png" },
      { type: "이혼·양육권", summary: "위자료 1,000만원 + 양육비 월 100만원", icon: Users, title: "23년간 무관심·냉대한 남편과 이혼하고, 위자료·양육권·양육비를 모두 받아냈습니다", desc: "23년간 가부장적 태도와 무관심, 잦은 음주·야근 핑계의 늦은 귀가, 의뢰인에 대한 폭언으로 난청 진단까지 받게 된 사건입니다. 외도의 명백한 증거는 없었지만, 갑작스러운 행동 변화와 정황을 토대로 혼인 파탄의 유책성을 입증했습니다. 의뢰인이 홀로 양육해온 점과 남편의 양육 무관심을 부각하여 친권·양육권을 확보하고, 양육비 산정기준표에 따른 월 100만 원 지급까지 이끌어냈습니다.", result: "위자료 1,000만원 + 단독 친권·양육권 + 양육비 월 100만원", image: "/images/hong case 4.png" },
    ],
  },
  choi: {
    name: "최지연 변호사",
    specialty: "상간소송·양육권 전문",
    tag: "이혼 · 형사 전문",
    quote: "의뢰인에게는 가장 따뜻하게,<br/>상대방에게는 가장 냉정하게.",
    certs: ["대한변협 등록 이혼 전문", "대한변협 등록 형사법 전문"],
    education: "경북대 법학부 · 사법시험 53회 · 사법연수원 43기",
    image: "/images/profile_choi.jpg",
    videos: [
      { id: "9RXYRGrFRXY", url: "https://go.knp-law.com/4ajXzmx", title: "재판 없이 합의금 2,500만원 받은 사례", desc: "상간소송, 꼭 재판까지 갈 필요 없습니다. 합의서 작성만으로 해결한 실제 이야기", icon: Scale, lawyer: "최지연 변호사 단독 영상" },
      { id: "f-Mu2lEFppc", url: "https://go.knp-law.com/4kzHNas", title: "가정폭력 피해 시 대처법! 증거 수집부터 신고까지", desc: "가정폭력을 당했을 때 반드시 해야 할 대처법 — 신고 절차, 병원 기록, 증거 확보 방법까지", icon: Shield, lawyer: "최지연 변호사 단독 영상" },
      { id: "ZEDSdHkpgYk", url: "https://go.knp-law.com/3MCphBJ", title: "이런 사람, 절대 결혼하지 마세요", desc: "이혼 전문 변호사가 수백 건의 사건에서 발견한, 결혼하면 후회하는 5가지 유형", icon: Scale, lawyer: "공통 영상" },
    ],
    cases: [
      { type: "상간소송", summary: "상간 위자료 2,500만원 판결", icon: Gavel, title: "증거 없다고 발뺌하던 상간녀, 결국 위자료 2,500만원", desc: "남편 사망으로 직접 증언을 받을 수 없는 상황이었지만, 휴대폰 포렌식을 통해 장기간 외도와 악의적 협박 정황을 밝혀냈습니다. 의뢰인과 자녀가 입은 피해를 강력히 변론해 통상보다 높은 위자료를 이끌어냈습니다.", result: "위자료 2,500만원 인용", image: "/images/choi case 1.png" },
      { type: "이혼조정", summary: "조건부 혼인유지 위자료 1억 합의", icon: Scale, title: "이혼 대신 선택한 법적 안전장치 — 재발 시 위자료 1억 확정", desc: "배우자의 부정행위를 확인한 의뢰인이 어린 자녀를 위해 혼인 유지를 결정했습니다. 조정조서에 부정행위 재발 시 협의이혼 및 위자료 1억 원 지급 조항을 삽입해, 법적 구속력 있는 재발 방지책을 확보했습니다.", result: "혼인유지 + 재발 시 위자료 1억 확정", image: "/images/choi case 2.png" },
      { type: "친권 방어", summary: "친권상실 심판청구 전부 기각", icon: Shield, title: "친인척의 친권상실 심판, 전부 기각으로 방어 성공", desc: "남편 사망 후 단독 친권자가 된 의뢰인에게 고인의 가족이 재산관리 능력을 문제 삼아 친권상실 심판을 청구했습니다. 금전 사용처를 구체적으로 소명하고, 자녀의 심리치료·양육 실태·자녀 본인의 의사까지 입증해 청구를 전부 기각시켰습니다.", result: "심판청구 전부 기각 — 친권 유지", image: "/images/choi case 3.png" },
      { type: "양육권·양육비", summary: "단독 친권 + 양육비 월 150만원 확보", icon: Users, title: "가정폭력·경제적 유기 속에서 지켜낸 아이와 새 출발", desc: "임신 중 가정폭력, 출산 직후 가출과 생활비 방치. 남편은 고소득 전문직이면서도 소득을 은폐하며 양육비 월 80만 원만 주장했지만, 소득 은폐 정황을 입증해 월 150만 원을 확보하고 단독 친권·양육권까지 받아냈습니다.", result: "단독 친권·양육권 + 월 150만원 + 위자료 1,300만원", image: "/images/choi case 4.png" },
    ],
  },
} as const

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
        <span className={`${isOpen ? "font-bold" : "font-medium"} text-base md:text-base leading-relaxed transition-all duration-300`}>{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: isOpen ? COLORS.accent : COLORS.textMuted }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p
          className="px-5 md:px-6 pb-5 md:pb-6 text-base md:text-sm leading-relaxed"
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
  const [selectedLawyer, setSelectedLawyer] = useState<"hong" | "choi">("hong")
  const [matchedLawyer, setMatchedLawyer] = useState<"hong" | "choi" | null>(null)
  const [expandedCase, setExpandedCase] = useState<number | null>(null)
  const [expandedPractice, setExpandedPractice] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [formData, setFormData] = useState({
    caseTypes: [] as string[],
    preferredLawyer: "상관없음" as string,
    name: "",
    phone: "",
    content: "",
    reviewTimeAgree: true,
    privacyAgree: true,
  })
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert("성함과 연락처를 입력해 주세요.")
      return
    }
    if (!formData.reviewTimeAgree) {
      alert("변호사 직접 검토 안내에 동의해 주세요.")
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
          preferredLawyer: formData.preferredLawyer,
          name: formData.name,
          phone: formData.phone,
          content: formData.content,
        }),
      })

      if (!res.ok) throw new Error("발송 실패")

      setSubmitState("success")
      setFormData({ caseTypes: [], preferredLawyer: "상관없음", name: "", phone: "", content: "", reviewTimeAgree: true, privacyAgree: true })
    } catch {
      setSubmitState("error")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const mainQuestionCount = 5
  const matchQuestions = [
    {
      question: "어떤 고민이 있으신가요?",
      bonus: false,
      options: [
        { text: "재산분할, 위자료 등 경제적 문제", score: 0 },
        { text: "상간, 혼인 파탄 등 책임소재 문제", score: 1 },
        { text: "양육권, 면접교섭 등 자녀 관계 문제", score: 1 },
      ],
    },
    {
      question: "이혼과 엮인 법률문제가 있다면?",
      bonus: false,
      options: [
        { text: "가정폭력, 스토킹, 사기 등 형사 관련 쟁점", score: 0 },
        { text: "회생, 파산 등 경제 관련 쟁점", score: 0 },
        { text: "잘 모르겠어요", score: 0 },
      ],
    },
    {
      question: "처음 상담할 때 어떤 분위기를 원하시나요?",
      bonus: false,
      options: [
        { text: "눈물은 뚝! 법률과 판례를 바탕으로 한 객관적이고 전문적인 분위기", score: 0 },
        { text: "눈물 펑펑! 이야기를 충분히 듣고 공감하고 함께 방향을 찾아가는 따뜻한 분위기", score: 1 },
        { text: "둘 다 괜찮아요", score: 0 },
      ],
    },
    {
      question: "소송 동안 변호사에게 가장 바라는 것은?",
      bonus: false,
      options: [
        { text: "긴급한 상황에서의 빠른 대응", score: 0 },
        { text: "심리적 불안함을 안심시켜주는 대응", score: 1 },
        { text: "진행과정에 대한 친절한 대응", score: 1 },
        { text: "복잡한 상황을 깔끔하게 정리해주는 대응", score: 0 },
      ],
    },
    {
      question: "내가 만나고 싶은 변호사는?",
      bonus: false,
      options: [
        { text: "마음을 어루만져주는 변호사", score: 2 },
        { text: "속시원하게 이야기해주는 변호사", score: 0 },
        { text: "꼼꼼하고 섬세한 변호사", score: 1 },
        { text: "든든하게 기댈 수 있는 변호사", score: 0 },
      ],
    },
    {
      question: "상담 시 원하는 차는?",
      bonus: true,
      options: [
        { text: "커피", score: 0 },
        { text: "차", score: 0 },
        { text: "물", score: 0 },
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
      const total = newAnswers.reduce((a, b) => a + b, 0)
      const result = total >= 3 ? "choi" : "hong"
      setMatchedLawyer(result)
      setSelectedLawyer(result)
      setTimeout(() => scrollToSection("lawyers"), 600)
    }
  }

  const matchResult = matchAnswers.length === matchQuestions.length
    ? matchAnswers.reduce((a, b) => a + b, 0) >= 3
      ? LAWYERS.choi
      : LAWYERS.hong
    : null

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      caseTypes: prev.caseTypes.includes(value)
        ? prev.caseTypes.filter((v) => v !== value)
        : [...prev.caseTypes, value],
    }))
  }

  const currentLawyer = LAWYERS[selectedLawyer]

  const faqData = [
    {
      question: "이혼 소송 기간은 얼마나 걸리나요?",
      answer: `협의이혼은 <strong style="color:${COLORS.accent};">숙려기간 포함 약 1~3개월</strong>, 재판이혼은 사건 복잡도에 따라 <strong style="color:${COLORS.accent};">약 6개월~1년 이상</strong> 소요될 수 있습니다. 재산분할이나 양육권 다툼이 있는 경우 기간이 늘어날 수 있으며, 상담 시 예상 소요 기간을 구체적으로 안내드립니다.`,
    },
    {
      question: "이혼 변호사 비용은 얼마나 드나요?",
      answer: `사건의 유형과 난이도에 따라 달라지며, 착수금은 <strong style="color:${COLORS.accent};">XXX만 원부터</strong> 시작합니다. 상간소송·재산분할 등 복잡한 사건은 별도 산정되며, 초기 상담 시 사건 내용을 파악한 뒤 정확한 비용을 안내드립니다. 비용이 부담되시는 경우 분할 납부도 상담 가능합니다.`,
    },
    {
      question: "이혼 상담 비밀보장 되나요? 익명으로 상담받을 수 있나요?",
      answer: `모든 상담은 변호사법에 따라 <strong style="color:${COLORS.accent};">철저히 비밀이 보장</strong>됩니다. 상담 기록은 안전하게 관리되며, 가족이나 직장에 알려지지 않도록 안심하고 상담받으실 수 있습니다.`,
    },
    {
      question: "대구 이혼 전문 변호사를 찾아야 하는 이유가 있나요?",
      answer: `이혼·상간 소송은 지역 법원마다 판결 성향과 위자료 기준이 다릅니다. 저희는 <strong style="color:${COLORS.accent};">대구가정법원의 판결 경향을 가장 잘 이해</strong>하는 지역 밀착형 전문가로서, 대구 법원에 최적화된 전략을 제시합니다.`,
    },
    {
      question: "양육권은 어떤 기준으로 결정되나요?",
      answer: `법원은 <strong style="color:${COLORS.accent};">자녀의 복리(최선의 이익)</strong>를 최우선으로 판단합니다. 양육 환경의 안정성, 주 양육자가 누구였는지, 부모와 자녀의 유대관계, 자녀의 의사(만 13세 이상), 경제적 능력 등을 종합적으로 고려합니다. 전업주부라도 주 양육자였다면 양육권 확보에 유리하며, 양육비는 상대방의 소득에 따라 별도로 청구할 수 있습니다.`,
    },
    {
      question: "상간소송 증거 없을 때도 소송이 가능한가요?",
      answer: `물론입니다. 오히려 <strong style="color:${COLORS.accent};">증거가 부족할 때 전문가의 도움이 더 필요</strong>합니다. 카톡 대화, 카드 내역, 위치 기록 등 정황 증거만으로도 입증이 가능하며, 법원 사실조회·금융거래 추적·통신자료 조회 등 합법적인 방법으로 증거를 확보할 수 있습니다.`,
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
              { label: "변호사 소개", id: "lawyers" },
              { label: "전문분야", id: "practice" },
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
            비공개 상담 신청
          </button>
        </div>
      </nav>

      {/* ═══════════ S1. 히어로 ═══════════ */}
      <section className="relative" style={{ backgroundColor: COLORS.primary }}>
        {/* 16:9 이미지 영역 */}
        <div className="md:max-w-6xl md:mx-auto md:pt-10">
          <div className="relative w-full aspect-[16/9] md:rounded-2xl md:overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="홍민정·최지연 변호사"
              fill
              className="object-cover"
              priority
            />
            {/* 하단 그라데이션: 이미지 → 어두운 배경으로 자연스럽게 연결 */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(45,45,45,0.4) 70%, #2d2d2d 100%)",
              }}
            />
          </div>
        </div>

        {/* 텍스트 영역: 어두운 배경 위 */}
        <div style={{ backgroundColor: COLORS.primary }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-14 md:pt-12 md:pb-16">
            <span
              className="inline-block px-4 py-2 rounded-full text-xs font-medium tracking-wide mb-6"
              style={{
                color: COLORS.white,
                backgroundColor: "rgba(158,94,90,0.7)",
              }}
            >
              대한변협 등록 이혼전문변호사 · 대구
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
              대구 이혼소송,
              <br />
              <span style={{ color: "#e8b4b1" }}>
                대구에서 사건을 많이 해본
                <br />
                변호사는 다릅니다.
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-8 text-white/80">
              대한변협 등록 이혼전문변호사
              <br />
              <strong className="text-white">홍민정 · 최지연 변호사</strong>가
              <br />
              당신의 새로운 시작을 함께합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
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
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-white/10"
                style={{
                  backgroundColor: "transparent",
                  color: COLORS.white,
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <Phone size={18} />
                긴급 전화상담
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {["재산분할", "위자료", "양육권", "상간소송", "가정폭력", "이혼소송"].map(
                (tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S2. 나에게 맞는 변호사 찾기 ═══════════ */}
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
              5가지 질문 + 번외편으로,<br className="md:hidden" /> 내 상황에 딱 맞는 변호사를 알려드려요.
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
                      {matchQuestions[matchStep].bonus
                        ? `번외편 ${matchStep - mainQuestionCount + 1}`
                        : `${matchStep + 1} / ${mainQuestionCount}`}
                    </span>
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold mb-2"
                    style={{ color: COLORS.text }}
                  >
                    {matchQuestions[matchStep].question}
                  </h3>
                  <p
                    className="text-sm mb-8"
                    style={{ color: COLORS.textMuted }}
                  >
                    {matchQuestions[matchStep].bonus
                      ? "상담 때 참고할게요, 편하게 골라주세요!"
                      : "하나를 선택해 주세요."}
                  </p>
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
                        <span dangerouslySetInnerHTML={{ __html: `&ldquo;${matchResult.quote}&rdquo;` }} />
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={() => scrollToSection("lawyers")}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                      >
                        {matchResult.name} 자세히 보기
                      </button>
                      <button
                        onClick={() => { setMatchStep(0); setMatchAnswers([]); setMatchedLawyer(null) }}
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

      {/* ═══════════ S3. 변호사 탭 섹션 ═══════════ */}
      <section id="lawyers" className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* 탭 버튼 */}
          <div className="flex justify-center gap-3 mb-14">
            {(["hong", "choi"] as const).map((key) => {
              const lawyer = LAWYERS[key]
              const isSelected = selectedLawyer === key
              const isMatched = matchedLawyer === key
              return (
                <button
                  key={key}
                  onClick={() => { setSelectedLawyer(key); setExpandedCase(null) }}
                  className="relative px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? COLORS.accent : COLORS.white,
                    color: isSelected ? COLORS.white : COLORS.text,
                    border: `1px solid ${isSelected ? COLORS.accent : COLORS.border}`,
                  }}
                >
                  {lawyer.name}
                  {isMatched && (
                    <span
                      className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: COLORS.accent, color: COLORS.white, border: `2px solid ${COLORS.white}` }}
                    >
                      추천
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* ── 프로필 ── */}
          <div
            className="rounded-2xl overflow-hidden mb-16 transition-all duration-300"
            style={{
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div className="grid md:grid-cols-2">
              <div
                className="relative w-full aspect-[3/4] md:min-h-[560px] overflow-hidden"
                style={{ backgroundColor: COLORS.accentLight }}
              >
                <Image
                  src={currentLawyer.image}
                  alt={currentLawyer.name}
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
                    {currentLawyer.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white">{currentLawyer.name}</h3>
                  <p className="text-sm text-white/70">{currentLawyer.specialty}</p>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <p
                  className="text-lg md:text-xl leading-relaxed mb-6 font-bold"
                  style={{ color: COLORS.text }}
                >
                  <span dangerouslySetInnerHTML={{ __html: `&ldquo;${currentLawyer.quote}&rdquo;` }} />
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {currentLawyer.certs.map((cert, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: COLORS.accentLight, color: COLORS.accent }}
                    >
                      <BadgeCheck size={12} />
                      {cert}
                    </span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed mb-6" style={{ color: COLORS.textMuted }}>
                  {currentLawyer.education}
                </p>
                <button
                  onClick={() => scrollToSection("consultation")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90 w-full md:w-auto"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                >
                  <Lock size={16} />
                  {currentLawyer.name}에게 상담 신청
                </button>
              </div>
            </div>
          </div>

          {/* ── 영상 ── */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3
                className="text-xl md:text-2xl font-bold"
                style={{ color: COLORS.text }}
              >
                <span className="relative inline"><span className="relative z-10">{currentLawyer.name}</span><span className="absolute left-0 bottom-0 w-full z-0" style={{ height: "40%", backgroundColor: `${COLORS.accent}30` }} /></span>를 영상으로 만나보세요
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentLawyer.videos.map((video) => (
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
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{
                          backgroundColor: video.lawyer.startsWith("공통") ? `${COLORS.primary}15` : `${COLORS.accent}18`,
                          color: video.lawyer.startsWith("공통") ? COLORS.primary : COLORS.accent,
                          border: `1px solid ${video.lawyer.startsWith("공통") ? `${COLORS.primary}30` : `${COLORS.accent}30`}`,
                        }}
                      >
                        {video.lawyer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <video.icon size={16} style={{ color: COLORS.accent }} />
                      <span className="text-sm font-semibold" style={{ color: COLORS.text }}>
                        {video.title}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: COLORS.textLight }}>
                      {video.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
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

          {/* ── 성공사례 ── */}
          <div>
            <div className="text-center mb-8">
              <h3
                className="text-xl md:text-2xl font-bold"
                style={{ color: COLORS.text }}
              >
                <span className="relative inline"><span className="relative z-10">{currentLawyer.name}</span><span className="absolute left-0 bottom-0 w-full z-0" style={{ height: "40%", backgroundColor: `${COLORS.accent}30` }} /></span>의 성공사례
              </h3>
              <p className="text-sm mt-2" style={{ color: COLORS.textMuted }}>
                * 의뢰인 보호를 위해 개인정보는 비공개 처리되었습니다.
              </p>
            </div>

            {/* 컴팩트 카드 그리드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {currentLawyer.cases.map((caseItem, index) => {
                const isExpanded = expandedCase === index
                const isReal = !!caseItem.image
                return (
                  <button
                    key={index}
                    onClick={() => setExpandedCase(isExpanded ? null : index)}
                    className="text-left rounded-xl p-4 transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: isExpanded ? COLORS.accent : COLORS.white,
                      border: `1.5px solid ${isExpanded ? COLORS.accent : COLORS.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <caseItem.icon size={16} style={{ color: isExpanded ? COLORS.white : COLORS.accent }} />
                      <span
                        className="text-xs font-bold"
                        style={{ color: isExpanded ? `${COLORS.white}cc` : COLORS.accent }}
                      >
                        {caseItem.type}
                      </span>
                    </div>
                    <p
                      className="text-sm font-bold leading-snug mb-2"
                      style={{ color: isExpanded ? COLORS.white : COLORS.text }}
                    >
                      {caseItem.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs"
                        style={{ color: isExpanded ? `${COLORS.white}aa` : COLORS.textMuted }}
                      >
                        {isReal ? "판결문 보기" : "준비 중"}
                      </span>
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-300"
                        style={{
                          color: isExpanded ? COLORS.white : COLORS.textMuted,
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* 모달 팝업 */}
            {expandedCase !== null && (() => {
              const caseItem = currentLawyer.cases[expandedCase]
              return (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  onClick={() => setExpandedCase(null)}
                >
                  <div className="absolute inset-0 bg-black/60" />
                  <div
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl"
                    style={{ backgroundColor: COLORS.white }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* 헤더 */}
                    <div
                      className="sticky top-0 px-6 py-4 flex items-center justify-between z-10"
                      style={{ backgroundColor: COLORS.accentLight, borderBottom: `1px solid ${COLORS.border}` }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="px-2.5 py-1 rounded text-xs font-bold"
                          style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                        >
                          {currentLawyer.name} 담당
                        </span>
                        <span className="text-base font-bold" style={{ color: COLORS.text }}>
                          {caseItem.type}
                        </span>
                      </div>
                      <button
                        onClick={() => setExpandedCase(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                      >
                        <span className="text-lg" style={{ color: COLORS.textLight }}>✕</span>
                      </button>
                    </div>

                    {/* 판결문 이미지 */}
                    {caseItem.image && (
                      <div className="w-full">
                        <Image
                          src={caseItem.image}
                          alt={`${caseItem.type} 판결문`}
                          width={600}
                          height={800}
                          className="w-full h-auto"
                        />
                      </div>
                    )}

                    {/* 본문 */}
                    <div className="p-6">
                      <h4
                        className="text-lg font-bold mb-3 leading-snug"
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
                      <div
                        className="p-4 rounded-xl text-center"
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
                </div>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ═══════════ 긴급 CTA 띠 배너 ═══════════ */}
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
                혼자 고민하는 시간이 길어질수록 불리해집니다
              </p>
              <p
                className="text-base md:text-lg font-semibold"
                style={{ color: COLORS.white }}
              >
                다음 성공사례의 주인공은 당신입니다.
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
              지금 바로 상담하기
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
            {(() => {
              const practiceAreas = [
                {
                  icon: Scale,
                  title: "재산분할",
                  keyword: "대구 재산분할 변호사",
                  desc: "부동산·퇴직금·주식 등 은닉 재산 추적부터 기여도 산정까지, 정당한 몫을 확보합니다.",
                  type: "tips" as const,
                  tips: [
                    "혼인 중 취득한 부동산 등기부등본 확보",
                    "배우자 명의 예금·보험·주식 목록 정리",
                    "퇴직금·국민연금 분할 대상 여부 확인",
                    "은닉 재산 의심 시 계좌 이체 내역 확보",
                  ],
                },
                {
                  icon: Gavel,
                  title: "이혼소송",
                  keyword: "대구 이혼소송 변호사",
                  desc: "협의가 어려울 때, 재판을 통해 이혼과 함께 재산분할·위자료·양육권까지 한 번에 해결합니다.",
                  type: "tips" as const,
                  tips: [
                    "이혼 사유(외도·폭력·유기 등) 증거 확보",
                    "위자료 청구를 위한 유책 사유 정리",
                    "재산분할 대상 목록 및 기여도 자료 준비",
                    "양육권·양육비 관련 양육 환경 증빙",
                  ],
                },
                {
                  icon: Users,
                  title: "양육권·양육비",
                  keyword: "대구 양육권 변호사",
                  desc: "자녀의 안정적 양육 환경을 최우선으로, 친권·양육권·양육비를 확보합니다.",
                  type: "tips" as const,
                  tips: [
                    "자녀와의 일상 양육 기록 남기기 (사진·일지)",
                    "안정적인 주거 환경 및 소득 증빙 준비",
                    "상대방 양육 부적격 사유 정리 (폭력·방임 등)",
                    "양육비 산정을 위한 상대방 소득 자료 확보",
                  ],
                },
                {
                  icon: Shield,
                  title: "가정폭력",
                  keyword: "대구 가정폭력 변호사",
                  desc: "피해 입증부터 접근금지·보호명령까지, 당신과 자녀의 안전을 지켜냅니다.",
                  type: "faq" as const,
                  faq: [
                    { q: "신고하면 오히려 불리해지지 않나요?", a: "가정폭력 신고는 피해 입증의 핵심 증거가 되며, 보호명령 신청의 기초가 됩니다." },
                    { q: "진단서가 없어도 되나요?", a: "목격자 진술, 112 신고 기록, 사진 등으로도 보호처분을 받을 수 있습니다." },
                  ],
                },
                {
                  icon: Heart,
                  title: "상간소송",
                  keyword: "대구 상간소송 변호사",
                  desc: "부정행위 증거 확보와 위자료 청구. 포렌식·SNS·카드 내역 등 체계적으로 입증합니다.",
                  type: "faq" as const,
                  faq: [
                    { q: "증거가 없어도 소송할 수 있나요?", a: "카톡·카드내역·위치기록 등 정황증거만으로도 입증이 가능합니다. 변호사 상담을 통해 증거 수집 방법을 구체적으로 안내드립니다." },
                    { q: "상간녀/상간남도 배우자가 있을 때는 어떻게 되나요?", a: "상대방에게도 배우자가 있다면 쌍방 위자료 청구가 가능하며, 유리한 협상 카드가 될 수 있습니다." },
                  ],
                },
                {
                  icon: FileText,
                  title: "협의이혼",
                  keyword: "대구 협의이혼 변호사",
                  desc: "합의서 작성부터 재산분할·양육 조건까지, 불리한 합의 없이 마무리합니다.",
                  type: "tips" as const,
                  tips: [
                    "재산분할 비율·대상 목록 사전 정리",
                    "양육권·양육비·면접교섭 조건 확인",
                    "합의서 공증 여부 반드시 확인",
                    "숙려기간(자녀有 3개월, 無 1개월) 고려",
                  ],
                },
              ]
              return (
                <>
                  {practiceAreas.map((area, i) => (
                    <div
                      key={i}
                      className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer"
                      style={{
                        backgroundColor: COLORS.bg,
                        border: `1px solid ${COLORS.border}`,
                      }}
                      onClick={() => setExpandedPractice(i)}
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
                        {area.type === "tips" ? "실전 체크리스트 보기 →" : "자주 묻는 질문 보기 →"}
                      </span>
                    </div>
                  ))}

                  {/* 팝업 */}
                  {expandedPractice !== null && (() => {
                    const area = practiceAreas[expandedPractice]
                    return (
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setExpandedPractice(null)}
                      >
                        <div className="absolute inset-0 bg-black/60" />
                        <div
                          className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl"
                          style={{ backgroundColor: COLORS.white }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* 헤더 */}
                          <div
                            className="sticky top-0 px-6 py-4 flex items-center justify-between z-10"
                            style={{ backgroundColor: COLORS.accentLight, borderBottom: `1px solid ${COLORS.border}` }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: COLORS.accent }}
                              >
                                <area.icon size={18} style={{ color: COLORS.white }} />
                              </div>
                              <span className="text-base font-bold" style={{ color: COLORS.text }}>
                                {area.title}
                              </span>
                            </div>
                            <button
                              onClick={() => setExpandedPractice(null)}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                            >
                              <span className="text-lg" style={{ color: COLORS.textLight }}>✕</span>
                            </button>
                          </div>

                          {/* 본문 */}
                          <div className="p-6">
                            <p className="text-sm leading-relaxed mb-6" style={{ color: COLORS.textLight }}>
                              {area.desc}
                            </p>

                            {area.type === "tips" ? (
                              <div>
                                <p className="text-xs font-bold mb-4" style={{ color: COLORS.accent }}>
                                  소송 전 꼭 확인하세요
                                </p>
                                <div className="space-y-3">
                                  {area.tips.map((tip, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                      <div
                                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ backgroundColor: COLORS.accentLight }}
                                      >
                                        <Check size={14} style={{ color: COLORS.accent }} />
                                      </div>
                                      <span className="text-sm leading-relaxed" style={{ color: COLORS.text }}>
                                        {tip}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {area.faq.map((item, j) => (
                                  <div
                                    key={j}
                                    className="p-4 rounded-xl"
                                    style={{ backgroundColor: COLORS.bg }}
                                  >
                                    <p className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>
                                      Q. {item.q}
                                    </p>
                                    <p className="text-sm leading-relaxed" style={{ color: COLORS.textLight }}>
                                      A. {item.a}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            <button
                              onClick={() => { setExpandedPractice(null); scrollToSection("consultation") }}
                              className="w-full flex items-center justify-center gap-2 mt-6 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90"
                              style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                            >
                              <Lock size={16} />
                              {area.title} 비공개 상담 신청
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ═══════════ Local Trust ═══════════ */}
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
              대구가정법원 사건,<br className="md:hidden" /> 이만큼 해봤습니다
            </h2>
            <p className="text-base mt-3" style={{ color: COLORS.textLight }}>
              수많은 대구가정법원 사건 경험이 곧 전략입니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                title: "두 변호사 합산 경력 24년",
                desc: "홍민정·최지연 변호사가 대구가정법원에서 합산 24년간 이혼·양육권·재산분할 사건을 직접 수행해왔습니다. 판결 성향과 기준을 정확히 파악하고 있어, 대구 법원에 최적화된 전략을 세워드립니다.",
              },
              {
                icon: MapPin,
                title: "범어동 사무실",
                desc: "대구가정법원 인근, 접근성 좋은 범어동 중심에 위치하여 언제든 편하게 방문하실 수 있습니다.",
              },
              {
                icon: Users,
                title: "대구·경북 전 지역 수임",
                desc: "대구는 물론 경산, 구미, 포항, 김천, 영천, 칠곡 등 경북 주변 소도시 사건까지 모두 수임합니다. 멀리 계셔도 전화·카카오톡 상담으로 편하게 시작하실 수 있습니다.",
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

      {/* ═══════════ FAQ ═══════════ */}
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

      {/* ═══════════ 상담 폼 ═══════════ */}
      <section
        id="consultation"
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="max-w-xl mx-auto px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 mb-8 mx-auto text-sm transition-all duration-300 hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ChevronDown size={14} className="rotate-180" />
            위로 돌아가기
          </button>
          <div className="text-center mb-10">
            <h2
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ color: COLORS.white }}
            >
              변호사가 직접 검토하는 1:1 상담
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              법무법인 김앤파트너스는
              <br />
              변호사와의 직접 상담을
              <br />
              원칙으로 합니다.
              <br />
              <br />
              재판이나 상담 스케줄에 따라
              <br />
              답변이 다소 늦을 수 있지만,
              <br />
              기다리신 만큼 정확한 법적 전략을
              <br />
              안내드리겠습니다.
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
                  "이혼소송",
                  "상간소송",
                  "재산분할",
                  "위자료",
                  "양육권/양육비",
                  "가정폭력",
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

            {/* 선호 변호사 */}
            <div className="mb-6">
              <p
                className="text-sm mb-3 font-medium"
                style={{ color: COLORS.textLight }}
              >
                1:1 상담을 원하는 변호사
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["홍민정 변호사", "최지연 변호사", "상관없음"].map((option) => {
                  const isLawyer = option.includes("변호사");
                  const lawyerName = isLawyer ? option.replace(" 변호사", "") : null;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredLawyer: option })}
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: formData.preferredLawyer === option ? COLORS.accentLight : COLORS.bg,
                        border: formData.preferredLawyer === option ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
                        color: formData.preferredLawyer === option ? COLORS.accent : COLORS.text,
                      }}
                    >
                      <span className="hidden md:inline">{option}</span>
                      {isLawyer ? (
                        <span className="md:hidden flex flex-col items-center leading-tight">
                          <span className="text-base font-bold">{lawyerName}</span>
                          <span className="text-xs font-normal">변호사</span>
                        </span>
                      ) : (
                        <span className="md:hidden">{option}</span>
                      )}
                    </button>
                  );
                })}
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
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.accent}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.border}
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
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.accent}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.border}
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
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.accent}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.border}
              />
            </div>

            {/* 동의 체크박스 */}
            <div className="mb-5 space-y-1">
              <label className="flex items-center gap-2.5 px-1 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.reviewTimeAgree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewTimeAgree: e.target.checked,
                    })
                  }
                />
                <span
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: formData.reviewTimeAgree
                      ? COLORS.accent
                      : "transparent",
                    border: formData.reviewTimeAgree
                      ? "none"
                      : `2px solid ${COLORS.border}`,
                  }}
                >
                  {formData.reviewTimeAgree && (
                    <Check size={12} style={{ color: COLORS.white }} />
                  )}
                </span>
                <span
                  className="text-sm"
                  style={{ color: COLORS.textLight }}
                >
                  [필수] 변호사 직접 검토로 답변에 시간이 소요될 수 있음을 확인합니다.
                </span>
              </label>
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
                  [필수] 개인정보는 상담 목적으로만 사용되며 종료 후 파기됨에 동의합니다.
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
                  담당 변호사가 사연을 검토한 뒤 직접 연락드리겠습니다.
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
                  {submitState === "loading" ? "발송 중..." : "변호사에게 직접 검토 요청하기"}
                </button>

                {submitState === "error" && (
                  <p className="text-center text-sm mt-3" style={{ color: "#e74c3c" }}>
                    발송에 실패했습니다.{" "}
                    <a href={`tel:${PHONE}`} className="underline font-semibold">{PHONE}</a>으로 전화 문의해 주세요.
                  </p>
                )}

              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ 오시는 길 (네이버 지도) ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              LOCATION
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: COLORS.text }}
            >
              오시는 길
            </h2>
            <p className="text-sm" style={{ color: COLORS.textLight }}>
              {OFFICE_ADDRESS}
            </p>
          </div>
          <a
            href="https://go.knp-law.com/3Mr8em6"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg group"
            style={{ border: `1px solid ${COLORS.border}` }}
          >
            <Image
              src="/images/map.jpg"
              alt="법무법인 김앤파트너스 약도"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
            <div
              className="flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300 group-hover:opacity-90"
              style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
            >
              <MapPin size={16} />
              네이버 지도에서 보기
            </div>
          </a>
        </div>
      </section>

      {/* ═══════════ 감성 CTA 섹션 ═══════════ */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(158,94,90,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(158,94,90,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p
            className="text-sm font-medium tracking-widest mb-6"
            style={{ color: `${COLORS.accent}` }}
          >
            WITH YOU
          </p>
          <h2
            className="text-2xl md:text-4xl font-bold mb-4 leading-snug"
            style={{ color: COLORS.white }}
          >
            이 페이지를 찾아오신 것만으로,
            <br />
            가장 어려운 한 걸음을
            <br />
            이미 내디디신 겁니다.
          </h2>
          <p
            className="text-sm md:text-base mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            이제부터는 저희가 맡겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.white,
              }}
            >
              <Phone size={18} />
              전화상담
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#FEE500",
                color: "#3C1E1E",
              }}
            >
              <MessageSquare size={18} />
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 푸터 ═══════════ */}
      <footer
        className="py-12"
        style={{
          backgroundColor: COLORS.primaryBg,
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">

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

          <p className="text-xs mb-2" style={{ color: COLORS.textMuted }}>
            광고책임변호사: 김민수
          </p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © 2026. 법무법인 김앤파트너스 All rights reserved.
          </p>
        </div>
      </footer>

      {/* ═══════════ 플로팅 버튼 ═══════════ */}
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

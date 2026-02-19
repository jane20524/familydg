import Link from "next/link"
import Image from "next/image"
import { getPosts } from "@/lib/wordpress"
import { COLORS } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "블로그 | 대구 이혼 전문 변호사",
  description:
    "대구 이혼 전문 변호사 홍민정·최지연의 법률 칼럼. 재산분할, 위자료, 양육권, 상간소송 등 실질적인 법률 정보를 전합니다.",
}

export const revalidate = 3600

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim()
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>
      {/* 헤더 */}
      <header
        className="border-b"
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.border,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-bold transition-opacity hover:opacity-70"
            style={{ color: COLORS.text }}
          >
            법무법인 김앤파트너스
          </Link>
          <span
            className="text-sm font-medium"
            style={{ color: COLORS.accent }}
          >
            블로그
          </span>
        </div>
      </header>

      {/* 타이틀 */}
      <section className="py-14 md:py-20" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p
            className="text-sm font-medium mb-2"
            style={{ color: COLORS.accent }}
          >
            BLOG
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: COLORS.text }}
          >
            법률 칼럼
          </h1>
          <p
            className="mt-3 text-base"
            style={{ color: COLORS.textLight }}
          >
            이혼·가사 분야의 실질적인 법률 정보를 전합니다
          </p>
        </div>
      </section>

      {/* 글 목록 */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          {posts.length === 0 ? (
            <p
              className="text-center py-20 text-base"
              style={{ color: COLORS.textMuted }}
            >
              아직 게시된 글이 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  {/* 대표 이미지 */}
                  {post.featuredImage ? (
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full aspect-[16/9] flex items-center justify-center"
                      style={{ backgroundColor: COLORS.primaryBg }}
                    >
                      <span
                        className="text-3xl font-bold opacity-20"
                        style={{ color: COLORS.accent }}
                      >
                        KNP
                      </span>
                    </div>
                  )}

                  {/* 텍스트 */}
                  <div className="p-5 md:p-6">
                    {post.categories.nodes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.nodes
                          .filter((cat) => cat.slug !== "uncategorized")
                          .map((cat) => (
                            <span
                              key={cat.slug}
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: COLORS.accentLight,
                                color: COLORS.accent,
                              }}
                            >
                              {cat.name}
                            </span>
                          ))}
                      </div>
                    )}
                    <h2
                      className="text-lg font-bold mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity"
                      style={{ color: COLORS.text }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-sm line-clamp-2 mb-4 leading-relaxed"
                      style={{ color: COLORS.textLight }}
                    >
                      {stripHtml(post.excerpt)}
                    </p>
                    <time
                      className="text-xs"
                      style={{ color: COLORS.textMuted }}
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer
        className="py-8 border-t text-center"
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.border,
        }}
      >
        <Link
          href="/"
          className="text-sm transition-opacity hover:opacity-70"
          style={{ color: COLORS.textLight }}
        >
          ← 메인 페이지로 돌아가기
        </Link>
      </footer>
    </div>
  )
}

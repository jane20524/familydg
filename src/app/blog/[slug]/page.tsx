import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllSlugs } from "@/lib/wordpress"
import { COLORS, PHONE } from "@/lib/constants"
import type { Metadata } from "next"

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "글을 찾을 수 없습니다" }

  const description = post.excerpt.replace(/<[^>]*>/g, "").trim().slice(0, 155)

  return {
    title: `${post.title} | 대구 이혼 전문 변호사`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage.node.sourceUrl }],
      }),
    },
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

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
          <Link
            href="/blog"
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: COLORS.accent }}
          >
            블로그
          </Link>
        </div>
      </header>

      {/* 글 본문 */}
      <article style={{ backgroundColor: COLORS.white }}>
        {/* 대표 이미지 */}
        {post.featuredImage && (
          <div className="relative w-full max-w-4xl mx-auto aspect-[16/9]">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
          {/* 카테고리 */}
          {post.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.nodes
                .filter((cat) => cat.slug !== "uncategorized")
                .map((cat) => (
                  <span
                    key={cat.slug}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
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

          {/* 제목 */}
          <h1
            className="text-2xl md:text-3xl font-bold leading-snug mb-4"
            style={{ color: COLORS.text }}
          >
            {post.title}
          </h1>

          {/* 날짜 */}
          <time
            className="block text-sm mb-10 pb-8 border-b"
            style={{ color: COLORS.textMuted, borderColor: COLORS.border }}
          >
            {formatDate(post.date)}
          </time>

          {/* 본문 */}
          <div
            className="wp-content leading-relaxed text-base md:text-lg"
            style={{ color: COLORS.textLight }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* 상담 CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="rounded-2xl p-8 md:p-10 text-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">
              비슷한 상황으로 고민 중이신가요?
            </h3>
            <p className="text-sm text-white/70 mb-6">
              대구 이혼 전문 변호사에게 무료 상담을 받아보세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
              >
                전화 상담: {PHONE}
              </a>
              <Link
                href="/#consultation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: COLORS.white }}
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 네비 */}
      <footer
        className="py-8 border-t text-center"
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.border,
        }}
      >
        <Link
          href="/blog"
          className="text-sm transition-opacity hover:opacity-70"
          style={{ color: COLORS.textLight }}
        >
          ← 목록으로 돌아가기
        </Link>
      </footer>

      {/* WordPress 본문 스타일 */}
      <style>{`
        .wp-content h1, .wp-content h2, .wp-content h3,
        .wp-content h4, .wp-content h5, .wp-content h6 {
          color: ${COLORS.text};
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.4;
        }
        .wp-content h2 { font-size: 1.5em; }
        .wp-content h3 { font-size: 1.25em; }
        .wp-content p {
          margin-bottom: 1.25em;
          line-height: 1.8;
        }
        .wp-content a {
          color: ${COLORS.accent};
          text-decoration: underline;
        }
        .wp-content ul, .wp-content ol {
          margin-bottom: 1.25em;
          padding-left: 1.5em;
        }
        .wp-content li {
          margin-bottom: 0.5em;
          line-height: 1.8;
        }
        .wp-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5em 0;
        }
        .wp-content blockquote {
          border-left: 3px solid ${COLORS.accent};
          padding: 0.5em 1em;
          margin: 1.5em 0;
          color: ${COLORS.textLight};
          background-color: ${COLORS.bg};
          border-radius: 0 8px 8px 0;
        }
        .wp-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        .wp-content th, .wp-content td {
          padding: 0.75em;
          border: 1px solid ${COLORS.border};
          text-align: left;
        }
        .wp-content th {
          background-color: ${COLORS.bg};
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

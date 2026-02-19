const WP_GRAPHQL_URL =
  "https://wordpress-1568541-6224097.cloudwaysapps.com/graphql"

/* ── 타입 ── */
export interface WPPost {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  featuredImage: {
    node: {
      sourceUrl: string
      altText: string
    }
  } | null
  categories: {
    nodes: { name: string; slug: string }[]
  }
}

/* ── GraphQL fetch ── */
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  })

  const json = await res.json()

  if (json.errors) {
    console.error("WPGraphQL Error:", json.errors)
    throw new Error(json.errors[0]?.message || "GraphQL Error")
  }

  return json.data
}

/* ── 글 목록 ── */
export async function getPosts(first = 20): Promise<WPPost[]> {
  const data = await fetchGraphQL<{
    posts: { nodes: WPPost[] }
  }>(
    `
    query GetPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
    `,
    { first }
  )

  return data.posts.nodes
}

/* ── 단일 글 ── */
export async function getPostBySlug(
  slug: string
): Promise<WPPost | null> {
  const data = await fetchGraphQL<{
    post: WPPost | null
  }>(
    `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        slug
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    `,
    { slug }
  )

  return data.post
}

/* ── 모든 슬러그 (정적 생성용) ── */
export async function getAllSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{
    posts: { nodes: { slug: string }[] }
  }>(`
    query GetAllSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `)

  return data.posts.nodes.map((node) => node.slug)
}

import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import BlogContainer from 'components/BlogContainer'
import Navbar from 'components/Navbar'

interface PostsPageProps {
  posts: Post[]
  settings: Settings
}

export default function PostsPage({ posts, settings }: PostsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogContainer>
        <div className="py-20">
          <h1 className="mb-12 text-4xl font-bold">Cloud Solutions</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link 
                key={post._id} 
                href={`/posts/${post.slug}`}
                className="block rounded-lg border border-gray-200 p-6 hover:border-gray-300"
              >
                <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </BlogContainer>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  const client = getClient()
  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ])

  return {
    props: {
      posts,
      settings,
    },
    revalidate: 60, // Revalidate every minute
  }
}

import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import BlogContainer from 'components/BlogContainer'
import Navbar from 'components/Navbar'
import { useState } from 'react'
import TagList from 'components/TagList'

interface PostsPageProps {
  posts: Post[]
  settings: Settings
}

export default function PostsPage({ posts, settings }: PostsPageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const router = useRouter()
  const postType = router.query.type as string || 'cloud'
  
  const filteredPosts = posts.filter(post => {
    if (selectedTag) {
      return post.type === postType && post.tags?.includes(selectedTag)
    }
    return post.type === postType
  })

  const getPageTitle = () => {
    switch(postType) {
      case 'cloud':
        return 'Cloud Solutions'
      case 'blog':
        return 'Blog Posts'
      case 'tools':
        return 'Web Development Tools'
      default:
        return 'Posts'
    }
  }

  const getTagOptions = () => {
    switch(postType) {
      case 'cloud':
        return ['cloud', 'web-hosting', 'vps', 'managed', 'wordpress', 'reseller']
      case 'blog':
        return ['tutorial', 'guide', 'opinion', 'news']
      case 'tools':
        return ['development', 'testing', 'deployment', 'monitoring']
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <BlogContainer>
        <div className="py-20">
          <h1 className="mb-8 text-4xl font-bold text-primary">{getPageTitle()}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg ${
                selectedTag === null ? 'bg-primary text-dark' : 'bg-dark border border-primary/20 text-secondary'
              }`}
            >
              All
            </button>
            {getTagOptions().map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg ${
                  selectedTag === tag ? 'bg-primary text-dark' : 'bg-dark border border-primary/20 text-secondary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link 
                key={post._id} 
                href={`/posts/${post.slug}`}
                className="block rounded-lg border border-primary/20 p-6 hover:border-primary/40 bg-dark/50"
              >
                <h2 className="mb-2 text-xl font-semibold text-primary">{post.title}</h2>
                <p className="text-secondary">{post.excerpt}</p>
                <TagList tags={post.tags} />
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

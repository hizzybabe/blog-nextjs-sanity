import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  const postType = (router.query.type as string) ?? 'cloud'
  
  const filteredPosts = posts.filter(post => {
    const filter = router.query.filter as string
    
    // First check post type
    const typeMatch = (
      (postType === 'tools' && post.type === 'webdev tools') || 
      (postType === 'cloud' && post.type === 'cloud provider profile') ||
      (postType === 'blog' && post.type === 'blog post')
    )

    if (!typeMatch) return false

    // Then check for special filters
    if (filter === 'vps-under-5' && !post.hasVPSUnder5) return false
    if (filter === 'hosting-under-3' && !post.hasHostingUnder3) return false

    // Finally check for tag filter
    if (selectedTag) {
      return post.tags?.includes(selectedTag)
    }

    return true
  })

  const getPageTitle = () => {
    switch(postType) {
      case 'tools':
        return 'WebDev Tools'
      case 'blog':
        return 'Blog Posts'
      default:
        return 'Cloud Solutions'
    }
  }

  const getTagOptions = () => {
    switch(postType) {
      case 'tools':
        return ['AI', 'IDE', 'API', 'Control Panel', 'CMS', 'Email', 'Security', 'Storage', 'CDN', 'Monitoring', 'Backup', 'Headless']
      case 'blog':
        return ['tutorial', 'guide', 'opinion', 'news']
      default:
        return ['cloud', 'web-hosting', 'vps', 'managed', 'wordpress', 'reseller']
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

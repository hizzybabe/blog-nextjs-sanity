import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

export interface Post {
  slug: string
  title: string
  excerpt: string
  coverImage: any
}

export interface FeaturedSectionProps {
  posts: Post[]
}

export default function FeaturedSection({ posts }: FeaturedSectionProps) {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null)

  useEffect(() => {
    // Function to select random post
    const selectRandomPost = () => {
      if (posts.length === 0) return
      const randomIndex = Math.floor(Math.random() * posts.length)
      setFeaturedPost(posts[randomIndex])
    }

    // Select initial post
    selectRandomPost()

    // Update featured post every 30 seconds
    const interval = setInterval(selectRandomPost, 30000)

    return () => clearInterval(interval)
  }, [posts])

  if (!featuredPost) return null

  return (
    <div className="py-16">
      <div className="mb-8 flex items-center">
        <h2 className="text-2xl font-bold">Featured today</h2>
        <span className="ml-2 text-gray-500">Updates every 30s</span>
      </div>
      <Link 
        href={`/posts/${featuredPost.slug}`}
        className="block rounded-lg border border-gray-200 p-6 hover:border-gray-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {featuredPost.coverImage && (
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  src={urlForImage(featuredPost.coverImage)
                    .width(64)
                    .height(64)
                    .url()}
                  alt={featuredPost.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold">{featuredPost.title}</h3>
              <p className="text-gray-600 line-clamp-2">
                {featuredPost.excerpt}
              </p>
            </div>
          </div>
          <div className="ml-4">
            <span className="rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50">
              Read more
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
} 
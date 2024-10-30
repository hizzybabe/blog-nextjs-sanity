import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'

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
  // Use current date as seed for pseudo-random selection
  const today = new Date()
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))
  
  const getFeaturePosts = () => {
    if (posts.length === 0) return []
    const firstIndex = daysSinceEpoch % posts.length
    const secondIndex = (firstIndex + 1) % posts.length
    return [posts[firstIndex], posts[secondIndex]]
  }

  const featuredPosts = getFeaturePosts()
  
  if (featuredPosts.length === 0) return null

  return (
    <div className="py-16">
      <div className="mb-8 flex items-center">
        <h2 className="text-2xl font-bold text-primary">Featured providers</h2>
        <span className="ml-2 text-secondary">Updates every 2 days</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredPosts.map((post) => (
          <Link 
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block rounded-lg border border-primary/20 p-6 hover:border-primary/40 bg-dark/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                {post.coverImage && (
                  <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={urlForImage(post.coverImage)
                        .width(64)
                        .height(64)
                        .url()}
                      alt={post.title}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-primary truncate">{post.title}</h3>
                  <p className="text-secondary line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span className="whitespace-nowrap rounded-lg border border-primary/20 px-4 py-2 text-primary hover:bg-primary/10">
                  Read more
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 
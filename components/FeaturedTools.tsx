import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'

export interface Tool {
  slug: string
  title: string
  excerpt: string
  coverImage: any
}

export interface FeaturedToolsProps {
  tools: Tool[]
}

export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  const today = new Date()
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))

  const getFeaturedTools = () => {
    if (tools.length === 0) return []
    const firstIndex = daysSinceEpoch % tools.length
    const secondIndex = (firstIndex + 1) % tools.length
    return [tools[firstIndex], tools[secondIndex]]
  }

  const featuredTools = getFeaturedTools()

  if (featuredTools.length === 0) return null

  return (
    <div className="py-16">
      <div className="mb-8 flex items-center">
        <h2 className="text-2xl font-bold text-primary">Featured Tools</h2>
        <span className="ml-2 text-secondary">Updates every 2 days</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredTools.map((tool) => (
          <Link 
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block rounded-lg border border-primary/20 p-6 hover:border-primary/40 bg-dark/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                {tool.coverImage && (
                  <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={urlForImage(tool.coverImage)
                        .width(64)
                        .height(64)
                        .url()}
                      alt={tool.title}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-primary truncate">{tool.title}</h3>
                  <p className="text-secondary line-clamp-2">
                    {tool.excerpt}
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
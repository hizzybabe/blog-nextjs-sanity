import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
  type,
  tags,
  keyFeatures,
  pricing,
  serverRegions,
  hasVPSUnder5,
  hasHostingUnder3,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title: string
  slug: string
  type: 'cloud provider profile' | 'blog post' | 'webdev tools'
  coverImage?: any
  date: string
  excerpt?: string
  author?: Author
  tags?: string[]
  keyFeatures?: string[]
  pricing?: {
    configuration: string
    pricePerMonth: number
  }[]
  serverRegions?: string[]
  hasVPSUnder5?: boolean
  hasHostingUnder3?: boolean
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

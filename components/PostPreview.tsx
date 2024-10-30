import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  keyFeatures,
}: Omit<Post, '_id'>) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h3 className="mb-3 text-3xl leading-snug text-balance">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
      {excerpt && (
        <p className="mb-4 text-lg leading-relaxed text-pretty">{excerpt}</p>
      )}
      {keyFeatures && keyFeatures.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
          <ul className="list-disc pl-5">
            {keyFeatures.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}

function TagList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null
  
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

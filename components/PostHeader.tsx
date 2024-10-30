import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug' | 'tags'>,
) {
  const { title, coverImage, date, author, slug, tags } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
        <TagList tags={tags} />
      </div>
    </>
  )
}

function TagList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null
  
  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
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

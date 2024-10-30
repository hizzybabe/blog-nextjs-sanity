import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority } = props
  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small max-w-3xl mx-auto relative', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
    >
      <div className="aspect-[16/9] relative">
        <Image
          className="object-contain"
          fill
          alt={title || 'Cover Image'}
          src={urlForImage(source)
            .width(1200)
            .height(675)
            .fit('max')
            .url()}
          sizes="(max-width: 768px) 100vw, 48rem"
          priority={priority}
        />
      </div>
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

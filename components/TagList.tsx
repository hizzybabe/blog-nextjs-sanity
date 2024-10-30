interface TagListProps {
  tags?: string[]
}

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

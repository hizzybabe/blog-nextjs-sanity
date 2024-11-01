import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MoreStories from 'components/MoreStories'
import PostBody from 'components/PostBody'
import PostHeader from 'components/PostHeader'
import PostPageHead from 'components/PostPageHead'
import PostTitle from 'components/PostTitle'
import SectionSeparator from 'components/SectionSeparator'
import Navbar from 'components/Navbar'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import Error from 'next/error'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings: Settings
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props
  const { title = demo.title } = settings || {}

  const slug = post?.slug

  if (!slug && !preview) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />
      <div className="flex min-h-screen flex-col bg-dark">
        <Navbar />
        <Layout preview={preview} loading={loading}>
          <Container>
            <div className="text-light">
              <BlogHeader title={title} level={2} />
              {preview && !post ? (
                <PostTitle>Loading…</PostTitle>
              ) : (
                <>
                  <article>
                    <PostHeader
                      title={post.title}
                      coverImage={post.coverImage}
                      date={post.date}
                      author={post.author}
                      slug={post.slug}
                      tags={post.tags}
                    />
                    <PostBody 
                      content={post.content} 
                      keyFeatures={post.keyFeatures}
                      pricing={post.pricing}
                    />
                  </article>
                  <SectionSeparator />
                  {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
                </>
              )}
            </div>
          </Container>
        </Layout>
      </div>
    </>
  )
}

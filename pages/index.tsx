import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings, getAllTools } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  tools: Tool[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, tools, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage posts={posts} settings={settings} tools={tools} />
  }

  return <IndexPage posts={posts} settings={settings} tools={tools.length > 0 ? tools : []} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = [], tools = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    getAllTools(client),
  ])

  console.log('Fetched settings:', settings)
  console.log('Fetched posts:', posts)
  console.log('Fetched tools:', tools)

  return {
    props: {
      posts,
      settings,
      tools,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 172800, // Revalidate every 2 days (in seconds)
  }
}

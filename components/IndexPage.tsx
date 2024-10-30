import BlogContainer from 'components/BlogContainer'
import Navbar from 'components/Navbar'
import HeroSection from 'components/HeroSection'
import FeaturedSection from 'components/FeaturedSection'
import { Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, settings } = props
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <BlogContainer>
          <HeroSection />
          <FeaturedSection />
        </BlogContainer>
      </main>
    </div>
  )
} 
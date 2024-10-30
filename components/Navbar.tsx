import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-primary/20">
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              💻 TechFocus.Pro
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/posts?type=cloud" className="text-secondary hover:text-primary transition-colors">
                Cloud Solutions
              </Link>
              <Link href="/posts?type=blog" className="text-secondary hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/posts?type=tools" className="text-secondary hover:text-primary transition-colors">
                Tools
              </Link>
              <Link href="/add-service" className="text-secondary hover:text-primary transition-colors">
                Add Your Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              💻 TechFocus.Pro
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/posts" className="text-gray-700 hover:text-gray-900">
                Cloud Solutions
              </Link>
              <Link href="/add-service" className="text-gray-700 hover:text-gray-900">
                Add Your Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 
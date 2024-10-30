import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              GetDeploying
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/cloud-index" className="text-gray-700 hover:text-gray-900">
                Cloud Index
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-gray-900">
                Services
              </Link>
              <Link href="/regions" className="text-gray-700 hover:text-gray-900">
                Regions
              </Link>
              <Link href="/storage" className="text-gray-700 hover:text-gray-900">
                Object Storage
              </Link>
              <Link href="/compute" className="text-gray-700 hover:text-gray-900">
                Compute Prices
              </Link>
              <Link href="/egress" className="text-gray-700 hover:text-gray-900">
                Egress Costs
              </Link>
              <Link href="/gpus" className="text-gray-700 hover:text-gray-900">
                Cloud GPUs
              </Link>
              <Link href="/compare" className="text-gray-700 hover:text-gray-900">
                Compare
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 
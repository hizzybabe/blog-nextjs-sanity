import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
              {/* Cloud Provider Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-secondary hover:text-primary transition-colors"
                >
                  Cloud Solutions
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark border border-primary/20">
                    <div className="py-1">
                      <Link 
                        href="/posts?type=cloud" 
                        className="block px-4 py-2 text-secondary hover:bg-primary/10"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        All Providers
                      </Link>
                      <Link 
                        href="/posts?type=cloud&filter=vps-under-5" 
                        className="block px-4 py-2 text-secondary hover:bg-primary/10"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        VPS Under $5
                      </Link>
                      <Link 
                        href="/posts?type=cloud&filter=hosting-under-3" 
                        className="block px-4 py-2 text-secondary hover:bg-primary/10"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Hosting Under $3
                      </Link>
                    </div>
                  </div>
                )}
              </div>

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
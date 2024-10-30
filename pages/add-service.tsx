import Navbar from 'components/Navbar'
import BlogContainer from 'components/BlogContainer'

export default function AddServicePage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <BlogContainer>
        <div className="py-20">
          <h1 className="mb-8 text-6xl font-bold text-primary">Get Your Cloud Company Featured!</h1>
          
          <p className="mb-12 text-xl text-secondary">
          Ready to reach thousands of developers and businesses searching for the perfect cloud provider? We can help you get noticed.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Cloud Provider Card */}
            <div className="rounded-lg border border-primary/20 p-8 bg-dark/50">
              <h2 className="text-2xl font-bold text-primary mb-4">Cloud Provider</h2>
              <p className="text-secondary mb-6">
              Submit your company information (services, pricing, data center locations) and join our waitlist.
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">Free</span>
                <span className="text-secondary ml-2">Just submit your information to us!</span>
              </div>
              <button className="w-full bg-primary text-dark py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Request listing
              </button>
            </div>

            {/* Sponsor Card */}
            <div className="rounded-lg border border-primary/20 p-8 bg-dark/50">
              <h2 className="text-2xl font-bold text-primary mb-4">Sponsor Us!</h2>
              <p className="text-secondary mb-6">
                Feature your company on our homepage and throughout the site. With over 12,000 monthly visitors, you'll have access to a massive audience.
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$39</span>
                <span className="text-secondary ml-2">/mo</span>
              </div>
              <button className="w-full bg-primary text-dark py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Reserve your slot
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-secondary mt-8">
            All prices are in USD and exclude applicable taxes
          </p>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">43</div>
              <div className="text-secondary">Providers already here</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12,000+</div>
              <div className="text-secondary">Visitors per month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-secondary">Impressions on social media</div>
            </div>
          </div>
        </div>
      </BlogContainer>
    </div>
  )
} 
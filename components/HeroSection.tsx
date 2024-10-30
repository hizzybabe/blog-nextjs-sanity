export default function HeroSection() {
  return (
    <div className="py-20">
      <h1 className="mb-8 text-6xl font-bold tracking-tight text-gray-900">
      Choosing the Right Cloud Provider<br />
        for your next project
      </h1>
      <p className="mb-8 text-xl text-gray-600"> 
      Are you overwhelmed by the choice of cloud providers? Let us help you make an informed decision for your next project! Our platform allows you to:
      </p>
      <ul className="space-y-4 text-lg">
        <li className="flex items-center">
          <span className="mr-3">🔎</span>
          Explore a wide range of cloud providers across different regions.
        </li>
        <li className="flex items-center">
          <span className="mr-3">📊</span>
          Filter providers based on your project's specific needs.
        </li>
        <li className="flex items-center">
          <span className="mr-3">✅</span>
          Compare top contenders side-by-side for clear decision-making.
        </li>
        <li className="flex items-center">
          <span className="mr-3">💰</span>
          Estimate costs for key components like egress, GPUs, and object storage.
        </li>
      </ul>
      <p className="mb-8 text-xl text-gray-600"> 
      Trusted by thousands of developers and organizations, we empower you to find the perfect cloud solution for your project.
      </p>
    </div>
  )
} 
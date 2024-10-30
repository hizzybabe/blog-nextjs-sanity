export default function HeroSection() {
  return (
    <div className="py-20">
      <h1 className="mb-8 text-6xl font-bold tracking-tight text-gray-900">
        Compare cloud providers<br />
        for your next project
      </h1>
      <p className="mb-8 text-xl text-gray-600">
        Trusted by thousands of developers and organizations to:
      </p>
      <ul className="space-y-4 text-lg">
        <li className="flex items-center">
          <span className="mr-3">🔎</span>
          Discover regional cloud providers
        </li>
        <li className="flex items-center">
          <span className="mr-3">📊</span>
          Filter by project requirements
        </li>
        <li className="flex items-center">
          <span className="mr-3">✅</span>
          Compare alternatives side by side
        </li>
        <li className="flex items-center">
          <span className="mr-3">💰</span>
          Estimate costs for egress, GPUs, object storage and more
        </li>
      </ul>
    </div>
  )
} 
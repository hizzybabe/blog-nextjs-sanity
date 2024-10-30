export default function FeaturedSection() {
  return (
    <div className="py-16">
      <div className="mb-8 flex items-center">
        <h2 className="text-2xl font-bold">Featured today</h2>
        <span className="ml-2 text-gray-500">ⓘ</span>
      </div>
      <div className="rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 h-10 w-10 rounded-lg bg-purple-100 p-2">
              <div className="h-full w-full rounded bg-purple-500"></div>
            </div>
            <div>
              <h3 className="font-semibold">UpCloud</h3>
              <p className="text-gray-600">
                European cloud specialized in affordable, managed infrastructure
              </p>
            </div>
          </div>
          <button className="rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50">
            Learn more
          </button>
        </div>
      </div>
    </div>
  )
} 
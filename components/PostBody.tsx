/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText, type PortableTextReactComponents } from 'next-sanity'
import { Post } from 'lib/sanity.queries'
import styles from './PostBody.module.css'
import { SanityImage } from './SanityImage'

interface PostBodyProps {
  content: any
  keyFeatures?: string[]
  pricing?: {
    configuration: string
    pricePerMonth: number
  }[]
}

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function PostBody({ content, keyFeatures, pricing }: PostBodyProps) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      {keyFeatures && keyFeatures.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            {keyFeatures.map((feature, index) => (
              <li key={index} className="text-lg">{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {pricing && pricing.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Configuration</th>
                  <th className="border p-3 text-left">Price per Month</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((price, index) => (
                  <tr key={index}>
                    <td className="border p-3">{price.configuration}</td>
                    <td className="border p-3">${price.pricePerMonth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}

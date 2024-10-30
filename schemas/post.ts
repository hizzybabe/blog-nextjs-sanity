import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import authorType from './author'

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),
    defineField({
      name: 'type',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Cloud Provider Profile', value: 'cloud' },
          { title: 'Blog Post', value: 'blog' },
          { title: 'Web Development Tool', value: 'tools' }
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: 'cloud'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: async (props) => {
          const { parent } = props
          const postType = parent?.type

          switch(postType) {
            case 'cloud':
              return [
                { title: 'Cloud', value: 'cloud' },
                { title: 'Web Hosting', value: 'web-hosting' },
                { title: 'VPS', value: 'vps' },
                { title: 'Managed', value: 'managed' },
                { title: 'WordPress', value: 'wordpress' },
                { title: 'Reseller', value: 'reseller' },
              ]
            case 'blog':
              return [
                { title: 'Tutorial', value: 'tutorial' },
                { title: 'Guide', value: 'guide' },
                { title: 'Opinion', value: 'opinion' },
                { title: 'News', value: 'news' },
              ]
            case 'tools':
              return [
                { title: 'Development', value: 'development' },
                { title: 'Testing', value: 'testing' },
                { title: 'Deployment', value: 'deployment' },
                { title: 'Monitoring', value: 'monitoring' },
              ]
            default:
              return []
          }
        }
      },
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(3).error('Maximum of 3 key features allowed'),
      description: 'Add up to 3 key features of this cloud service',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'configuration',
              title: 'Configuration',
              type: 'string',
              description: 'e.g., "2 CPU, 4GB RAM, 80GB SSD"'
            },
            {
              name: 'pricePerMonth',
              title: 'Price per Month',
              type: 'number',
              description: 'Price in USD'
            }
          ]
        }
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})

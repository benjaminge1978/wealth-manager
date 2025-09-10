import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description for listing pages',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional - automated posts may not have images',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: Rule => Rule.positive(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredImageUrl',
      title: 'Featured Image URL',
      type: 'url',
      description: 'External URL for featured image (used by automated posts)',
    }),
    
    // SEO and Meta Tag Settings
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Custom SEO and meta tag settings (optional - if empty, AI will generate)',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Custom title for <title> tag (50-60 characters recommended)',
          validation: Rule => Rule.max(60).warning('Keep meta title under 60 characters for better SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Custom meta description for search engines and social media (120-160 characters)',
          validation: Rule => Rule.min(120).max(160).warning('Meta description should be 120-160 characters for optimal display'),
        }),
        defineField({
          name: 'ogTitle',
          title: 'Open Graph Title',
          type: 'string',
          description: 'Custom title for social media sharing (Facebook, LinkedIn)',
          validation: Rule => Rule.max(100).warning('Keep OG title under 100 characters'),
        }),
        defineField({
          name: 'ogDescription',
          title: 'Open Graph Description',
          type: 'text',
          rows: 2,
          description: 'Custom description for social media sharing',
          validation: Rule => Rule.max(160).warning('Keep OG description under 160 characters'),
        }),
        defineField({
          name: 'twitterTitle',
          title: 'Twitter Title',
          type: 'string',
          description: 'Custom title for Twitter sharing (70 characters max)',
          validation: Rule => Rule.max(70).warning('Keep Twitter title under 70 characters'),
        }),
        defineField({
          name: 'seoKeywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Specific keywords for meta tags (separate from post tags)',
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
          description: 'Primary keyword this post should rank for',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
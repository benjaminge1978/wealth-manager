import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'mainContent',
      title: 'Main Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'number', type: 'string', title: 'Number/Value'},
          {name: 'label', type: 'string', title: 'Label'},
          {name: 'description', type: 'string', title: 'Description'},
        ]
      }],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications & Awards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Certification Title'},
          {name: 'issuer', type: 'string', title: 'Issuing Organization'},
          {name: 'year', type: 'string', title: 'Year'},
          {name: 'logo', type: 'image', title: 'Logo'},
        ]
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
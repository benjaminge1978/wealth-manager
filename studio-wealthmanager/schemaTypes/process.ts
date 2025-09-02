import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'processStep',
  title: 'Process Steps',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name',
    }),
  ],
  orderings: [
    {
      title: 'Step Number',
      name: 'stepNumberAsc',
      by: [
        {field: 'stepNumber', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
    },
    prepare(selection) {
      const {title, stepNumber} = selection
      return {
        title: `Step ${stepNumber}: ${title}`,
      }
    }
  },
})
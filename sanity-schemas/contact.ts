import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
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
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {name: 'street', type: 'string', title: 'Street Address'},
        {name: 'city', type: 'string', title: 'City'},
        {name: 'state', type: 'string', title: 'State/Province'},
        {name: 'zip', type: 'string', title: 'ZIP/Postal Code'},
        {name: 'country', type: 'string', title: 'Country'},
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'days', type: 'string', title: 'Days'},
          {name: 'hours', type: 'string', title: 'Hours'},
        ]
      }],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'platform', type: 'string', title: 'Platform'},
          {name: 'url', type: 'url', title: 'URL'},
          {name: 'icon', type: 'string', title: 'Icon Name'},
        ]
      }],
    }),
    defineField({
      name: 'formTitle',
      title: 'Contact Form Title',
      type: 'string',
      initialValue: 'Send us a message',
    }),
    defineField({
      name: 'formDescription',
      title: 'Contact Form Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'email',
    },
  },
})
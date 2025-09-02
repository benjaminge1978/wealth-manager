import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
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
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: '📊 Pie Chart (Wealth Management)', value: 'PieChart'},
          {title: '📋 File Text (Financial Planning)', value: 'FileText'},
          {title: '🛡️ Shield (Risk Management)', value: 'Shield'},
          {title: '📈 Trending Up (Investment Advisory)', value: 'TrendingUp'},
          {title: '🎓 Graduation Cap (Education Planning)', value: 'GraduationCap'},
          {title: '❤️ Heart (Retirement Planning)', value: 'Heart'},
          {title: '💰 Dollar Sign', value: 'DollarSign'},
          {title: '🏦 Building (Bank)', value: 'Building'},
          {title: '📊 Bar Chart', value: 'BarChart'},
          {title: '🎯 Target', value: 'Target'},
          {title: '💼 Briefcase', value: 'Briefcase'},
          {title: '🏠 Home', value: 'Home'},
          {title: '⚖️ Scale', value: 'Scale'},
          {title: '🔒 Lock', value: 'Lock'},
          {title: '💎 Gem', value: 'Gem'},
          {title: '📱 Smartphone', value: 'Smartphone'},
          {title: '🌟 Star', value: 'Star'},
          {title: '⚡ Zap', value: 'Zap'},
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Learn More Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'uvt95dbx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN, // You'll need to get this from sanity.io/manage
})

async function populateSampleData() {
  try {
    console.log('Creating sample data...')

    // Create Hero Section
    const hero = await client.create({
      _type: 'hero',
      headline: 'Find the right financial advisor for you',
      highlightedText: 'right financial advisor',
      subheadline: 'We help you achieve financial success through personalized, goals-based planning and regulated investment advice. Build the wealth you need for the life you want.',
      primaryButtonText: 'Schedule Consultation',
      secondaryButtonText: 'Learn Our Process',
      features: [
        { icon: 'Shield', text: 'Regulated Advice' },
        { icon: 'Target', text: 'Goals-Based Planning' },
        { icon: 'TrendingUp', text: 'Wealth Growth' }
      ]
    })
    console.log('✓ Hero section created')

    // Create Services
    const services = [
      {
        _type: 'service',
        title: 'Investment Planning',
        description: 'Build a diversified portfolio tailored to your risk tolerance and financial goals.',
        icon: 'TrendingUp',
        order: 1
      },
      {
        _type: 'service', 
        title: 'Retirement Planning',
        description: 'Secure your future with comprehensive retirement strategies and pension optimization.',
        icon: 'Target',
        order: 2
      },
      {
        _type: 'service',
        title: 'Tax Optimization',
        description: 'Minimize your tax burden through strategic planning and efficient investment structures.',
        icon: 'Shield',
        order: 3
      }
    ]

    for (const service of services) {
      await client.create(service)
    }
    console.log('✓ Services created')

    // Create Process Steps
    const processSteps = [
      {
        _type: 'processStep',
        stepNumber: 1,
        title: 'Initial Consultation',
        description: 'We start by understanding your current financial situation, goals, and risk tolerance.',
        icon: 'MessageCircle'
      },
      {
        _type: 'processStep',
        stepNumber: 2,
        title: 'Strategic Planning',
        description: 'Our experts develop a personalized financial strategy tailored to your unique needs.',
        icon: 'FileText'
      },
      {
        _type: 'processStep',
        stepNumber: 3,
        title: 'Implementation',
        description: 'We put your plan into action and monitor your progress towards your financial goals.',
        icon: 'CheckCircle'
      }
    ]

    for (const step of processSteps) {
      await client.create(step)
    }
    console.log('✓ Process steps created')

    // Create Testimonials
    const testimonials = [
      {
        _type: 'testimonial',
        name: 'Sarah Johnson',
        role: 'Business Owner',
        testimonial: 'The team helped me restructure my investments and I\'ve seen a 15% improvement in my portfolio performance.',
        rating: 5,
        order: 1
      },
      {
        _type: 'testimonial',
        name: 'Michael Chen',
        role: 'Engineer',
        testimonial: 'Professional, knowledgeable, and always available when I have questions. Highly recommended!',
        rating: 5,
        order: 2
      }
    ]

    for (const testimonial of testimonials) {
      await client.create(testimonial)
    }
    console.log('✓ Testimonials created')

    // Create Contact Info
    const contact = await client.create({
      _type: 'contact',
      title: 'Get In Touch',
      subtitle: 'Ready to take control of your financial future? Contact us today for a free consultation.',
      email: 'info@wealthmanagement.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Financial District',
        city: 'London',
        state: 'England',
        zip: 'EC2V 8RF',
        country: 'United Kingdom'
      },
      businessHours: [
        { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
        { days: 'Saturday', hours: '10:00 AM - 2:00 PM' }
      ],
      formTitle: 'Send us a message',
      formDescription: 'Fill out the form below and we\'ll get back to you within 24 hours.'
    })
    console.log('✓ Contact info created')

    console.log('\n🎉 Sample data created successfully!')
    console.log('Visit http://localhost:3333 to see your content in Sanity Studio')
    console.log('Visit http://localhost:3001 to see your website with CMS data')

  } catch (error) {
    console.error('Error creating sample data:', error)
  }
}

populateSampleData()
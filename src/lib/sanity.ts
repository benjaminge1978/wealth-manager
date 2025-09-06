import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'uvt95dbx',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: import.meta.env.PROD, // Enable CDN in production for better performance, disable in dev to avoid CORS issues
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-05-03',
  perspective: 'published',
  stega: {
    enabled: false,
  },
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Helper function to use the url builder
export const urlFor = (source: any) => builder.image(source)

// Helper function to get optimized image URL
export const getImageUrl = (source: any, width?: number, height?: number, format?: 'webp' | 'avif' | 'auto') => {
  let imageBuilder = urlFor(source)
  
  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }
  
  // Add format optimization
  if (format === 'webp') {
    imageBuilder = imageBuilder.format('webp')
  } else if (format === 'avif') {
    imageBuilder = imageBuilder.format('avif')
  } else if (format === 'auto') {
    // Let Sanity decide the best format
    imageBuilder = imageBuilder.auto('format')
  }
  
  // Add quality optimization
  imageBuilder = imageBuilder.quality(85)
  
  return imageBuilder.url()
}

// Helper to get responsive image URLs
export const getResponsiveImageUrls = (source: any, sizes: number[], format?: 'webp' | 'avif' | 'auto') => {
  return sizes.map(size => ({
    url: getImageUrl(source, size, undefined, format),
    width: size
  }))
}

// GROQ queries for fetching content
export const queries = {
  // Get all blog posts (E-E-A-T enhanced)
  allPosts: `*[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    tags,
    featured,
    readTime,
    author->{name, role, bio},
    mainImage,
    featuredImageUrl
  }`,

  // Get hero section content
  hero: `*[_type == "hero"][0]{
    headline,
    highlightedText,
    subheadline,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    heroImage,
    features
  }`,

  // Get all services
  services: `*[_type == "service"] | order(order asc){
    title,
    description,
    icon,
    order,
    link
  }`,

  // Get process steps
  processSteps: `*[_type == "processStep"] | order(stepNumber asc){
    stepNumber,
    title,
    description,
    icon
  }`,

  // Get testimonials
  testimonials: `*[_type == "testimonial"] | order(order asc){
    name,
    role,
    testimonial,
    rating,
    image,
    featured
  }`,

  // Get about section
  about: `*[_type == "about"][0]{
    title,
    subtitle,
    mainContent,
    image,
    statistics,
    certifications
  }`,

  // Get contact information
  contact: `*[_type == "contact"][0]{
    title,
    subtitle,
    email,
    phone,
    address,
    businessHours,
    socialMedia,
    formTitle,
    formDescription
  }`,

  // Get featured blog posts
  featuredBlogPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3]{
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{name, image},
    categories[]->{title, color}
  }`,

  // Get all blog posts
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author->{name, image},
    categories[]->{title, color}
  }`,

  // Get single blog post by slug
  blogPost: `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    body,
    author->{name, image, bio},
    categories[]->{title, color},
    tags
  }`,
}
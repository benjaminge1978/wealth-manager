// Sanity image type
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

// Hero section
export interface HeroData {
  headline: string
  highlightedText?: string
  subheadline: string
  primaryButtonText: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  heroImage: SanityImage
  features?: Array<{
    icon: string
    text: string
  }>
}

// Service
export interface Service {
  title: string
  description: string
  icon: string
  order: number
  link?: string
}

// Process step
export interface ProcessStep {
  stepNumber: number
  title: string
  description: string
  icon?: string
}

// Testimonial
export interface Testimonial {
  name: string
  role: string
  testimonial: string
  rating: number
  image?: SanityImage
  featured?: boolean
}

// About section
export interface AboutData {
  title: string
  subtitle?: string
  mainContent: any[] // Rich text blocks
  image?: SanityImage
  statistics?: Array<{
    number: string
    label: string
    description?: string
  }>
  certifications?: Array<{
    title: string
    issuer: string
    year: string
    logo?: SanityImage
  }>
}

// Contact information
export interface ContactData {
  title: string
  subtitle?: string
  email: string
  phone: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  businessHours?: Array<{
    days: string
    hours: string
  }>
  socialMedia?: Array<{
    platform: string
    url: string
    icon: string
  }>
  formTitle?: string
  formDescription?: string
}

// Blog post author
export interface Author {
  name: string
  image?: SanityImage
  bio?: string
}

// Blog post category
export interface Category {
  title: string
  color?: string
}

// Blog post
export interface BlogPost {
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage: SanityImage
  publishedAt: string
  readTime?: number
  body?: any[] // Rich text blocks
  author: Author
  categories?: Category[]
  tags?: string[]
}
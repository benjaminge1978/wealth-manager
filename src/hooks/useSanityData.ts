import { useState, useEffect } from 'react'
import { client, queries } from '../lib/sanity'

// Generic hook for fetching Sanity data
export function useSanityData<T>(query: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await client.fetch<T>(query)
        setData(result)
        setError(null)
      } catch (err) {
        console.error('Sanity fetch error:', err)
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  return { data, loading, error }
}

// Specific hooks for each content type
export function useHeroData() {
  return useSanityData(queries.hero)
}

export function useServicesData() {
  return useSanityData(queries.services)
}

export function useProcessStepsData() {
  return useSanityData(queries.processSteps)
}

export function useTestimonialsData() {
  return useSanityData(queries.testimonials)
}

export function useAboutData() {
  return useSanityData(queries.about)
}

export function useContactData() {
  return useSanityData(queries.contact)
}

export function useFeaturedBlogPosts() {
  return useSanityData(queries.featuredBlogPosts)
}

export function useBlogPosts() {
  return useSanityData(queries.blogPosts)
}

export function useBlogPost(slug: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await client.fetch(queries.blogPost, { slug })
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  return { data, loading, error }
}
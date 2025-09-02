# Sanity CMS Integration Guide

## 1. Schema Files Created

I've created comprehensive Sanity schemas for your wealth management website:

### Content Types:
- **Hero Section** (`hero.ts`) - Homepage hero with headline, CTA buttons, and features
- **Services** (`service.ts`) - Service offerings with icons and descriptions
- **Process Steps** (`process.ts`) - Step-by-step process explanation
- **Testimonials** (`testimonial.ts`) - Client testimonials with ratings
- **About Section** (`about.ts`) - About content with statistics and certifications
- **Contact Info** (`contact.ts`) - Contact details, hours, and form settings
- **Blog Posts** (`blogPost.ts`) - Full blog functionality with categories and tags
- **Authors** (`author.ts`) - Blog post authors
- **Categories** (`category.ts`) - Blog post categories

## 2. Next Steps After Studio Setup

### A. Move Schema Files to Studio
Once your Sanity Studio is created:
```bash
# Copy schema files to your studio
cp -r sanity-schemas/* studio-wealthmanager/schemaTypes/
```

### B. Update Studio Configuration
In your `studio-wealthmanager/sanity.config.ts`, import the schemas:
```typescript
import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  // ... existing config
  schema: {
    types: schemaTypes,
  },
})
```

### C. Install Sanity Client in React App
```bash
npm install @sanity/client @sanity/image-url
```

### D. Create Sanity Client Configuration
I'll create a `lib/sanity.ts` file with the client setup.

### E. Update Components
Transform your static components to fetch content from Sanity CMS.

## 3. Content Structure

Each schema is designed to match your current website structure:
- Single-instance content (Hero, About, Contact)
- Multi-instance content (Services, Testimonials, Blog Posts)
- Hierarchical content (Blog Categories, Process Steps)

## 4. Benefits
- Easy content editing through Sanity Studio
- Image optimization and CDN
- Real-time content updates
- Multi-user content management
- Content versioning and drafts
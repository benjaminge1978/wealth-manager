# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Wealth Management Homepage built with React, TypeScript, and Vite. The project uses Tailwind CSS for styling and Radix UI components for UI primitives. It was originally designed in Figma and converted to code.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production (outputs to build/ directory)
npm run build
```

## Architecture

### Core Stack
- **React 18.3** with TypeScript
- **Vite** as build tool with SWC for fast compilation
- **Tailwind CSS** with custom utility classes via `tailwind-merge` and `clsx`
- **Radix UI** components for accessible, unstyled UI primitives
- **Shadcn/ui** pattern for component structure in `src/components/ui/`

### Project Structure

The application follows a component-based architecture with clear separation of concerns:

- **Main App**: Single-page application with multiple sections rendered in `App.tsx`
- **Component Organization**: 
  - UI primitives in `src/components/ui/` (Radix-based components)
  - Feature components in `src/components/` (business logic sections)
  - Calculator components in `src/components/calculators/`
  
### Key Architectural Patterns

1. **Image Handling**: Uses custom `ImageWithFallback` component for reliable image loading
2. **Styling**: Combines Tailwind utilities with `class-variance-authority` for variant management
3. **Forms**: Leverages `react-hook-form` for form state management
4. **Icons**: Uses `lucide-react` for consistent iconography

### Asset Management

Images should be imported as ES modules:
```typescript
import heroImage from "../assets/image-name.jpg";
```

TypeScript declarations for image imports are defined in `src/vite-env.d.ts`.

### Vite Configuration

The project uses extensive path aliasing in `vite.config.ts` for package version management and includes:
- Custom resolver for Figma asset imports
- Build output to `build/` directory
- Dev server configured for port 3000 with auto-open

## Component Guidelines

When modifying components:
1. Maintain the existing Radix UI + Tailwind pattern
2. Use the pre-built UI components from `src/components/ui/`
3. Follow the established section structure (Hero, Services, Process, Calculator, About, Testimonials, Contact)
4. Preserve responsive design patterns using Tailwind's responsive prefixes

## Design Review Requirements

**IMPORTANT**: When making UI changes, creating new components, or modifying user interfaces, you should proactively use the ux-ui-designer agent to:
- Review design changes before implementation
- Ensure consistency with the existing design system
- Validate UX patterns and user flows
- Get recommendations for visual improvements
- Maintain accessibility standards

This applies to:
- Creating new sections or components
- Modifying layouts or visual styles
- Changing color schemes or typography
- Adding interactive elements
- Restructuring user flows or navigation

## Important Notes

- The project originated from a Figma design export
- No testing framework is currently configured
- No linting or formatting tools are set up
- Images in `src/assets/` use specific naming conventions that should be preserved

## ⚠️ CRITICAL DEV NOTE - SANITY CONFIGURATION

**DO NOT MODIFY THE SANITY HOOK OR CLIENT CONFIGURATION**

The Sanity CMS integration has specific CORS limitations:
- Sanity project (uvt95dbx) does NOT allow localhost:3000 in CORS origins
- Attempting to add localhost:3000 to CORS settings results in "NOT ALLOWED" error
- The site works perfectly on the hosted/production version with live Sanity data
- On localhost, Sanity calls will fail with 403/CORS errors and fallback to static data
- This is EXPECTED BEHAVIOR - do not attempt to "fix" the CORS errors
- The current setup ensures fast local development with static fallback data

**What NOT to do:**
- Do not modify `src/hooks/useSanityData.ts` to "fix" CORS
- Do not change the Sanity client configuration in `src/lib/sanity.ts`  
- Do not try to bypass or disable Sanity calls on localhost
- Do not modify loading states or error handling for Sanity

**The current behavior is correct:** Localhost uses fast static fallback data, production uses live Sanity data.

## ⚠️ CRITICAL DEV NOTE - STATIC BLOG PAGE GENERATION SYSTEM

**DO NOT BREAK THE LINKEDIN/SOCIAL MEDIA META TAG SYSTEM**

This project uses a custom build-time static HTML generation system for social media crawlers:

### How It Works:
- **Build Process**: Custom Vite plugin (`scripts/vite-plugin-static-blog-pages.js`) runs during `npm run build`
- **Static Generation**: Creates individual HTML files at `dist/insights/[slug]/index.html` for each Sanity blog post
- **Meta Tags**: Each generated HTML contains blog-specific `og:title`, `og:description`, `article:published_time`, etc.
- **SPA Compatibility**: Generated HTML includes full SPA JavaScript bundles for user navigation
- **LinkedIn/Facebook**: Social media crawlers read static meta tags, users get SPA experience

### Critical Files - DO NOT MODIFY WITHOUT UNDERSTANDING:
- `scripts/vite-plugin-static-blog-pages.js` - Core plugin that fetches Sanity posts and generates HTML
- `vite.config.ts` - Contains `staticBlogPages()` plugin registration
- `scripts/test-static-blog-plugin.js` - Test suite that verifies system functionality

### What This System Solves:
- LinkedIn Post Inspector showing generic site meta instead of blog-specific data
- Facebook/Twitter sharing showing wrong titles/descriptions  
- Social media crawlers can't read JavaScript-generated meta tags (react-helmet-async)
- SEO issues where crawlers see initial HTML without dynamic content

### What NOT to do:
- Do not remove `staticBlogPages()` from vite.config.ts plugins array
- Do not delete or modify the plugin files without testing social media sharing
- Do not change Netlify build command away from `npm run build:no-snap` without ensuring static files generate
- Do not modify the plugin's Sanity query without ensuring all required fields are included
- Do not move or rename the generated HTML files in dist/insights/[slug]/

### Testing the System:
```bash
# Run build and test
npm run build:no-snap
node scripts/test-static-blog-plugin.js

# Check generated files exist
ls dist/insights/*/index.html

# Verify meta tags in generated HTML
cat dist/insights/some-post-slug/index.html | grep "og:title"
```

### How to Verify After Changes:
1. Run build: `npm run build:no-snap`
2. Check console shows: "🚀 Generating static blog pages with meta tags..."
3. Verify files exist in `dist/insights/[slug]/index.html`
4. Test LinkedIn Post Inspector with live URLs after deployment
5. Run the test suite: `node scripts/test-static-blog-plugin.js`

**Breaking this system will cause LinkedIn/social media sharing to revert to generic site metadata instead of blog-specific content.**
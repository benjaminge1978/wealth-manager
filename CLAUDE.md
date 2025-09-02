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
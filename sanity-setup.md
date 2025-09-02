# Sanity CMS Setup Instructions

## 1. First, authenticate with Sanity:
```bash
npx sanity login
```

## 2. Create the Sanity Studio:
```bash
npm create sanity@latest -- --project uvt95dbx --dataset production --template clean --typescript --output-path studio-wealthmanager
cd studio-wealthmanager
npm install
```

## 3. After the studio is created, you'll need to:
- Configure schemas for your content
- Install Sanity client in your React app
- Update components to fetch from Sanity

## Content Types Needed:
- Hero Section (headline, subheadline, CTA buttons)
- Services (service cards with titles, descriptions, icons)
- Process Steps
- Calculator configurations
- About section content
- Testimonials
- Contact information
- Blog posts

## Next Steps:
Once you've logged in and created the studio, I can help you:
1. Create all the necessary schemas
2. Set up the Sanity client in your React app
3. Migrate your components to use CMS data
# Deployment Guide

## 🚀 Quick Start Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `wealth-management-website`
3. Keep it public or private (your choice)
4. **Don't** initialize with README (we already have files)

### Step 2: Connect Local Repository to GitHub

```bash
# Add GitHub as remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/wealth-management-website.git

# Push your code to GitHub
git add .
git commit -m "Initial deployment setup"
git push -u origin main
```

### Step 3: Deploy to Netlify

1. **Go to [Netlify](https://netlify.com)** and sign up/login
2. **Click "New site from Git"**
3. **Connect to GitHub** and select your repository
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18`

5. **Environment Variables** (Site settings → Environment variables):
   ```
   VITE_SANITY_PROJECT_ID = uvt95dbx
   VITE_SANITY_DATASET = production  
   VITE_SANITY_API_VERSION = 2023-05-03
   VITE_SANITY_USE_CDN = true
   ```

6. **Click Deploy!**

### Step 4: Deploy Sanity Studio

```bash
# From your project root
cd studio-wealthmanager

# Deploy studio to sanity.studio
npm run deploy
```

This will give you a URL like: `https://yourproject.sanity.studio`

### Step 5: Update CORS Settings

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings → API → CORS Origins**
4. Add your Netlify domain (e.g., `https://yoursite.netlify.app`)
5. Add your custom domain when you set it up

## 🔧 Custom Domain Setup

### On Netlify:
1. Go to **Site settings → Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `yourwealth.com`)

### On Your Domain Registrar:
1. Add DNS records:
   ```
   Type: A     Name: @         Value: 75.2.60.5
   Type: CNAME Name: www       Value: yoursite.netlify.app
   ```

## 🔄 Workflow After Setup

### Making Changes to Your Website:
1. Edit files locally
2. Test with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update website content"
   git push
   ```
4. Netlify automatically builds and deploys (1-2 minutes)

### Making Content Changes:
1. Go to your Sanity Studio URL
2. Edit content and click **Publish**
3. Changes appear on your website immediately

## 📊 Expected Timeline

- **GitHub setup**: 5 minutes
- **Netlify deployment**: 10 minutes  
- **Domain setup**: 20 minutes (+ DNS propagation time)
- **Sanity Studio**: 5 minutes
- **Total**: ~40 minutes to go live

## 💰 Costs

- **Netlify**: Free (up to 100GB bandwidth)
- **Sanity**: Free (up to 3 users, 500K API requests)
- **Domain**: $10-15/year
- **Total**: ~$1/month

## 🆘 Troubleshooting

### Build Fails on Netlify:
- Check environment variables are set correctly
- Ensure Node version is 18+
- Check build logs for specific errors

### Sanity Content Not Loading:
- Verify CORS settings include your live domain
- Check environment variables match your project ID
- Ensure content is published (not just saved as draft)

### Domain Not Working:
- DNS changes can take up to 24 hours
- Verify DNS records are correct
- Check domain registrar settings

## 🔗 Useful Links

- **Your Netlify Dashboard**: https://app.netlify.com
- **Sanity Management**: https://sanity.io/manage  
- **Your Studio**: https://yourproject.sanity.studio
- **GitHub Repository**: Your repo URL

## 🎯 Next Steps After Deployment

1. **Set up Google Analytics**
2. **Add contact form handling**  
3. **Configure SEO meta tags**
4. **Set up monitoring/alerts**
5. **Create backup strategy**
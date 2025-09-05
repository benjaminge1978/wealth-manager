# 🚀 Deploy Content Automation to Railway

## Quick Setup (5 minutes)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended) or email
3. Verify your account

### Step 2: Deploy from GitHub
1. **Click "New Project"** on Railway dashboard
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository**: `benjaminge1978/wealth-manager`
4. **Railway will auto-detect** the Node.js project

### Step 3: Set Environment Variables
In Railway project settings → Variables, add:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_from_console.anthropic.com

SANITY_TOKEN=your_sanity_write_token_from_sanity.io_manage

VITE_SANITY_PROJECT_ID=uvt95dbx

VITE_SANITY_DATASET=production

ADMIN_PASSWORD=SecurePassword123

NODE_ENV=production

PORT=3000
```

**Note:** Use the same API keys from your local `.env` file.

### Step 4: Get Your Server URL
1. **After deployment**, Railway will give you a URL like:
   `https://your-project-name.railway.app`
2. **Copy this URL** - we need it for Step 5

### Step 5: Update Frontend (One-time)
Replace the server URL in the admin dashboard:

1. In `src/components/admin/AdminDashboard.tsx`, line 44:
```typescript
: 'https://your-actual-railway-url.railway.app'; // Replace with your Railway URL
```

2. Commit and push this change

### Step 6: Test the System
1. Go to `https://netfin.co.uk/admin`
2. Login with: `admin` / `SecurePassword123`
3. Click **"Start Automation"**
4. Test **"Generate Content"** with a topic

## 🎯 Alternative: One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

## Expected Costs
- **Railway**: Free tier includes 500 hours/month
- **Claude API**: £20-50/month (as planned)
- **Total**: £20-50/month (within budget!)

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Ensure `NODE_ENV=production` is set

### CORS Errors
- Verify your Railway URL is added to CORS origins in `server/index.js`
- Check that the frontend points to the correct Railway URL

### API Errors  
- Verify ANTHROPIC_API_KEY and SANITY_TOKEN are correctly set
- Check Railway logs for detailed error messages

## Next Steps After Deployment

1. **Start Automation**: Login and click "Start Automation"
2. **Schedule Content**: System will generate posts Mon-Fri at 9 AM
3. **Monitor**: Check admin dashboard for system health
4. **Content**: New posts appear in Sanity CMS and on your blog

**Your automation system will then generate daily financial content with AEO-optimized FAQs automatically! 🎯**
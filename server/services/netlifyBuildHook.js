import { env } from '../config/environment.js';

class NetlifyBuildHook {
  constructor() {
    this.buildHookUrl = env.NETLIFY_BUILD_HOOK_URL;
  }

  /**
   * Trigger a Netlify build to regenerate static HTML with new blog posts
   * @param {string} reason - Reason for triggering the build
   * @returns {Promise<boolean>} Success status
   */
  async triggerBuild(reason = 'New blog post created') {
    if (!this.buildHookUrl) {
      console.warn('⚠️ NETLIFY_BUILD_HOOK_URL not configured - skipping build trigger');
      return false;
    }

    try {
      console.log(`🔄 Triggering Netlify build: ${reason}`);
      
      const response = await fetch(this.buildHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trigger_title: reason,
          trigger_description: `Automated build triggered from Railway server: ${reason}`,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        console.log(`✅ Netlify build triggered successfully`);
        console.log(`🔗 Build ID: ${result.id || 'Unknown'}`);
        return true;
      } else {
        console.error(`❌ Failed to trigger Netlify build: ${response.status} ${response.statusText}`);
        return false;
      }

    } catch (error) {
      console.error('❌ Error triggering Netlify build:', error.message);
      return false;
    }
  }

  /**
   * Trigger build for new blog post with specific metadata
   * @param {Object} postData - Blog post data
   * @returns {Promise<boolean>} Success status
   */
  async triggerBuildForPost(postData) {
    const reason = `New blog post: "${postData.title}" (${postData.slug || 'no-slug'})`;
    return await this.triggerBuild(reason);
  }

  /**
   * Check if build hook is configured
   * @returns {boolean} Whether build hook URL is available
   */
  isConfigured() {
    return Boolean(this.buildHookUrl);
  }
}

export default NetlifyBuildHook;
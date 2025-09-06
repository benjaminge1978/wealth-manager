#!/bin/bash

echo "🚀 Testing E-E-A-T Content Automation System"
echo "=========================================="

# Basic auth credentials (change if different)
ADMIN_USER="admin"
ADMIN_PASS="changeme123"  # Update this to match your .env ADMIN_PASSWORD
BASE_URL="http://localhost:3000"

echo ""
echo "1️⃣  Starting backend server..."
echo "   Run this in a separate terminal:"
echo "   cd server && node index.js"
echo ""
echo "2️⃣  Once server is running, test these endpoints:"
echo ""

echo "🔍 System Health Check:"
echo "curl -u ${ADMIN_USER}:${ADMIN_PASS} ${BASE_URL}/api/admin/system-health"
echo ""

echo "🧪 Test Full E-E-A-T Pipeline (creates draft post):"
echo "curl -u ${ADMIN_USER}:${ADMIN_PASS} -X POST ${BASE_URL}/api/admin/test-eeat-pipeline -H 'Content-Type: application/json' -d '{\"day\":\"monday\"}'"
echo ""

echo "🚀 Test 9am Daily Generation Process:"
echo "curl -u ${ADMIN_USER}:${ADMIN_PASS} -X POST ${BASE_URL}/api/admin/trigger-daily-generation"
echo ""

echo "📊 View E-E-A-T Dashboard:"
echo "curl -u ${ADMIN_USER}:${ADMIN_PASS} ${BASE_URL}/api/admin/eeat-dashboard/daily"
echo ""

echo "🎯 Test Niche Topics:"
echo "curl -u ${ADMIN_USER}:${ADMIN_PASS} -X POST ${BASE_URL}/api/admin/test-niche-topics -H 'Content-Type: application/json' -d '{\"day\":\"monday\"}'"
echo ""

echo "📝 View Generated Posts:"
echo "curl -u ${ADMIN_USER}:${ADMIN_PASS} ${BASE_URL}/api/admin/posts"
echo ""

echo "⚠️  Remember to:"
echo "   - Set ANTHROPIC_API_KEY in your .env file"
echo "   - Set SANITY_TOKEN in your .env file" 
echo "   - Update ADMIN_PASSWORD if different from 'changeme123'"
echo ""

echo "🎉 Your enhanced E-E-A-T system is ready to test!"
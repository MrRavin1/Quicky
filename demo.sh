#!/bin/bash

# Quicky Demo Launcher
# Usage: bash demo.sh

cd /home/rabin/Quicky

echo "🔨 Building assets..."
npm run build
rm -f public/hot

echo "🚀 Starting Laravel..."
pkill -f "artisan serve" 2>/dev/null
nohup php artisan serve --port=8000 > /tmp/laravel.log 2>&1 &
sleep 2

echo "🌐 Starting Cloudflare tunnel..."
pkill -f "cloudflared" 2>/dev/null
nohup cloudflared tunnel --url http://localhost:8000 > /tmp/tunnel.log 2>&1 &

echo "⏳ Waiting for tunnel URL..."
sleep 8

URL=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' /tmp/tunnel.log | head -1)

if [ -z "$URL" ]; then
    echo "❌ Could not get tunnel URL. Check /tmp/tunnel.log"
    exit 1
fi

echo "✅ Tunnel URL: $URL"

# Update APP_URL in .env
sed -i "s|APP_URL=.*|APP_URL=$URL|" .env
php artisan config:clear > /dev/null

echo ""
echo "========================================"
echo "  Send this link to your client:"
echo "  $URL"
echo "========================================"
echo ""
echo "Laravel log: tail -f /tmp/laravel.log"
echo "Tunnel log:  tail -f /tmp/tunnel.log"

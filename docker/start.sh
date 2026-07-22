#!/bin/sh
set -e

cd /var/www/html

# Cache config/routes for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Test the app boots and catch any errors
echo "==> Testing app boot..."
php artisan about --no-ansi 2>&1 || true
echo "==> Boot test done"

# Start supervisor (runs nginx + php-fpm + queue)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

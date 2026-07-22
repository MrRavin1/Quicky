#!/bin/sh
set -e

cd /var/www/html

# Clear any stale cached config first
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Re-cache with current environment
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Start supervisor (runs nginx + php-fpm + queue)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

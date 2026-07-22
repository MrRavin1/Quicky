#!/bin/sh
set -e

cd /var/www/html

# Clear file-based caches only (no DB needed)
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Re-cache with current environment
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations first (creates the cache/sessions tables)
php artisan migrate --force

# Now clear DB cache safely
php artisan cache:clear

# Start supervisor (runs nginx + php-fpm + queue)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

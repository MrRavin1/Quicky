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

# Seed initial data if stores table is empty
php artisan tinker --execute="
if (\App\Models\Store::count() === 0) {
    \Artisan::call('db:seed', ['--class' => 'StoresTableSeeder', '--force' => true]);
    \Artisan::call('db:seed', ['--class' => 'ProductsTableSeeder', '--force' => true]);
    echo 'Seeded stores and products.' . PHP_EOL;
} else {
    echo 'Data already exists, skipping seed.' . PHP_EOL;
}
" 2>&1 || true

# Now clear DB cache safely
php artisan cache:clear

# Create admin user if it doesn't exist
php artisan tinker --execute="
use App\Models\User;
if (!User::where('email', env('ADMIN_EMAIL', 'admin@quicky.com'))->exists()) {
    User::create([
        'name' => 'Admin',
        'email' => env('ADMIN_EMAIL', 'admin@quicky.com'),
        'password' => bcrypt(env('ADMIN_PASSWORD', 'admin123')),
        'role' => 'admin',
    ]);
    echo 'Admin user created.' . PHP_EOL;
} else {
    echo 'Admin user already exists.' . PHP_EOL;
}
" 2>&1 || true

# Start supervisor (runs nginx + php-fpm + queue)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

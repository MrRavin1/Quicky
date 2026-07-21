<?php

use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Admin\StoreController as AdminStore;
use App\Http\Controllers\Admin\ProductController as AdminProduct;
use App\Http\Controllers\Admin\UserController as AdminUser;
use App\Http\Controllers\Admin\RiderController as AdminRider;
use App\Http\Controllers\Admin\OrderController as AdminOrder;
use App\Http\Controllers\Admin\CouponController as AdminCoupon;
use App\Http\Controllers\Admin\ReportController as AdminReport;
use App\Http\Controllers\Admin\SettingsController as AdminSettings;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'auth' => ['user' => auth()->user()],
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Admin Login (guest-only)
Route::prefix('admin')
    ->name('admin.')
    ->middleware('guest')
    ->group(function () {
        Route::get('/login', [AdminLoginController::class, 'create'])->name('login');
        Route::post('/login', [AdminLoginController::class, 'store'])->name('login.store');
    });

// Admin Logout (auth)
Route::post('/admin/logout', [AdminLoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('admin.logout');

// Admin Routes
Route::prefix('admin')
    ->name('admin.')
    ->middleware(['admin'])
    ->group(function () {
        Route::get('/', [AdminDashboard::class, 'index'])->name('dashboard');

        // Stores
        Route::get('/stores', [AdminStore::class, 'index'])->name('stores.index');
        Route::get('/stores/create', [AdminStore::class, 'create'])->name('stores.create');
        Route::post('/stores', [AdminStore::class, 'store'])->name('stores.store');
        Route::get('/stores/{store}/edit', [AdminStore::class, 'edit'])->name('stores.edit');
        Route::put('/stores/{store}', [AdminStore::class, 'update'])->name('stores.update');
        Route::delete('/stores/{store}', [AdminStore::class, 'destroy'])->name('stores.destroy');
        Route::patch('/stores/{store}/toggle-status', [AdminStore::class, 'toggleStatus'])->name('stores.toggle-status');

        // Products (nested under store)
        Route::get('/stores/{store}/products', [AdminProduct::class, 'index'])->name('stores.products.index');
        Route::get('/stores/{store}/products/create', [AdminProduct::class, 'create'])->name('stores.products.create');
        Route::post('/stores/{store}/products', [AdminProduct::class, 'store'])->name('stores.products.store');
        Route::get('/stores/{store}/products/{product}/edit', [AdminProduct::class, 'edit'])->name('stores.products.edit');
        Route::put('/stores/{store}/products/{product}', [AdminProduct::class, 'update'])->name('stores.products.update');
        Route::delete('/stores/{store}/products/{product}', [AdminProduct::class, 'destroy'])->name('stores.products.destroy');
        Route::patch('/stores/{store}/products/{product}/toggle', [AdminProduct::class, 'toggleAvailability'])->name('stores.products.toggle');

        // Users
        Route::get('/users', [AdminUser::class, 'index'])->name('users.index');
        Route::delete('/users/{user}', [AdminUser::class, 'destroy'])->name('users.destroy');

        // Riders
        Route::get('/riders', [AdminRider::class, 'index'])->name('riders.index');
        Route::get('/riders/create', [AdminRider::class, 'create'])->name('riders.create');
        Route::post('/riders', [AdminRider::class, 'store'])->name('riders.store');
        Route::patch('/riders/{rider}/approve', [AdminRider::class, 'approve'])->name('riders.approve');
        Route::patch('/riders/{rider}/reject', [AdminRider::class, 'reject'])->name('riders.reject');
        Route::patch('/riders/{rider}/toggle-active', [AdminRider::class, 'toggleActive'])->name('riders.toggle-active');

        // Orders
        Route::get('/orders', [AdminOrder::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [AdminOrder::class, 'show'])->name('orders.show');
        Route::patch('/orders/{order}/status', [AdminOrder::class, 'updateStatus'])->name('orders.update-status');

        // Coupons
        Route::get('/coupons', [AdminCoupon::class, 'index'])->name('coupons.index');
        Route::get('/coupons/create', [AdminCoupon::class, 'create'])->name('coupons.create');
        Route::post('/coupons', [AdminCoupon::class, 'store'])->name('coupons.store');
        Route::get('/coupons/{coupon}/edit', [AdminCoupon::class, 'edit'])->name('coupons.edit');
        Route::put('/coupons/{coupon}', [AdminCoupon::class, 'update'])->name('coupons.update');
        Route::delete('/coupons/{coupon}', [AdminCoupon::class, 'destroy'])->name('coupons.destroy');
        Route::patch('/coupons/{coupon}/toggle', [AdminCoupon::class, 'toggle'])->name('coupons.toggle');

        // Reports
        Route::get('/reports', [AdminReport::class, 'index'])->name('reports');

        // Settings
        Route::get('/settings', [AdminSettings::class, 'index'])->name('settings');
        Route::post('/settings', [AdminSettings::class, 'update'])->name('settings.update');
    });


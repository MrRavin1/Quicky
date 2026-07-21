<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::prefix('v1')->group(function () {
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}/popular', [CategoryController::class, 'popular']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);

    // Stores — static/named segments MUST come before {store} wildcard
    Route::get('/stores', [StoreController::class, 'index']);
    Route::get('/stores/featured', [StoreController::class, 'featured']);
    Route::get('/stores/category/{category}', [StoreController::class, 'byCategory']);
    Route::get('/search', [StoreController::class, 'search']);
    Route::get('/stores/{store}', [StoreController::class, 'show']);

    // Products — static/named segments MUST come before {product} wildcard
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/category/{category}', [ProductController::class, 'byCategory']);
    Route::get('/products/store/{store}', [ProductController::class, 'byStore']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    // User profile
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::put('/profile/password', [UserController::class, 'updatePassword']);
    Route::post('/profile/avatar', [UserController::class, 'uploadAvatar']);
    Route::get('/profile/stats', [UserController::class, 'stats']);
    Route::delete('/profile', [UserController::class, 'deleteAccount']);

    // Addresses
    Route::apiResource('addresses', AddressController::class);
    Route::post('/addresses/{address}/set-default', [AddressController::class, 'setDefault']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
    Route::get('/orders/{order}/track', [OrderController::class, 'track']);

    // Cart functionality (if you want to implement server-side cart)
    // Route::get('/cart', [CartController::class, 'index']);
    // Route::post('/cart/add', [CartController::class, 'add']);
    // Route::put('/cart/update/{item}', [CartController::class, 'update']);
    // Route::delete('/cart/remove/{item}', [CartController::class, 'remove']);
    // Route::delete('/cart/clear', [CartController::class, 'clear']);
});

// Admin routes (for store management, rider management, etc.)
Route::middleware(['auth:sanctum', 'admin.api'])->prefix('admin/v1')->group(function () {
    Route::get('/dashboard/stats', [AdminDashboard::class, 'apiStats']);
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});

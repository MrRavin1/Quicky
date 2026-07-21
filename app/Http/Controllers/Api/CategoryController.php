<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Get all categories with store counts
     */
    public function index()
    {
        $categories = [
            'food'        => 'Food',
            'groceries'   => 'Groceries',
            'medicine'    => 'Medicine',
            'parcel'      => 'Parcel',
            'pet'         => 'Pet',
            'flowers'     => 'Flowers',
            'electronics' => 'Electronics',
        ];

        // Aggregate both counts in two queries instead of 14
        $storeCounts = Store::where('is_active', true)
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category');

        $productCounts = Product::where('is_available', true)
            ->whereHas('store', fn($q) => $q->where('is_active', true))
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category');

        $categoriesWithCounts = [];
        foreach ($categories as $key => $name) {
            $categoriesWithCounts[] = [
                'id'            => $key,
                'name'          => $name,
                'store_count'   => $storeCounts[$key] ?? 0,
                'product_count' => $productCounts[$key] ?? 0,
                'icon'          => $this->getCategoryIcon($key),
            ];
        }

        return response()->json($categoriesWithCounts);
    }

    /**
     * Get stores and products for a specific category
     */
    public function show($category)
    {
        $validCategories = ['food', 'groceries', 'medicine', 'parcel', 'pet', 'flowers', 'electronics'];
        
        if (!in_array($category, $validCategories)) {
            return response()->json(['message' => 'Invalid category'], 404);
        }

        $stores = Store::where('category', $category)
            ->where('is_active', true)
            ->withCount('products')
            ->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->paginate(20);

        return response()->json([
            'category' => $category,
            'stores'   => $stores,
        ]);
    }

    /**
     * Get popular items by category
     */
    public function popular($category)
    {
        $validCategories = ['food', 'groceries', 'medicine', 'parcel', 'pet', 'flowers', 'electronics'];
        
        if (!in_array($category, $validCategories)) {
            return response()->json(['message' => 'Invalid category'], 404);
        }

        // Get popular products in this category (could be based on order count)
        $products = Product::where('category', $category)
            ->where('is_available', true)
            ->whereHas('store', function($q) {
                $q->where('is_active', true);
            })
            ->with('store')
            ->inRandomOrder() // For now, random. Could be based on actual popularity
            ->take(10)
            ->get();

        return response()->json([
            'category' => $category,
            'popular_products' => $products
        ]);
    }

    /**
     * Get category icon mapping
     */
    private function getCategoryIcon($category)
    {
        $icons = [
            'food' => 'utensils-crossed',
            'groceries' => 'shopping-cart',
            'medicine' => 'pill',
            'parcel' => 'package',
            'pet' => 'heart',
            'flowers' => 'sparkles',
            'electronics' => 'zap',
        ];

        return $icons[$category] ?? 'circle';
    }
}

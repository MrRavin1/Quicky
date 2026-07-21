<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get all available products with filtering
     */
    public function index(Request $request)
    {
        $query = Product::where('is_available', true);

        // Filter by store
        if ($request->has('store_id')) {
            $query->where('store_id', $request->store_id);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $products = $query->with('store')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(20);

        return response()->json($products);
    }

    /**
     * Get single product
     */
    public function show(Product $product)
    {
        if (!$product->is_available) {
            return response()->json(['message' => 'Product not available'], 404);
        }

        $product->load('store');
        return response()->json($product);
    }

    /**
     * Get products by category
     */
    public function byCategory($category)
    {
        $products = Product::where('is_available', true)
            ->where('category', $category)
            ->with('store')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(20);

        return response()->json($products);
    }

    /**
     * Get featured/popular products
     */
    public function featured()
    {
        // This could be based on order count, ratings, or manual selection
        $products = Product::where('is_available', true)
            ->whereHas('store', function($q) {
                $q->where('is_active', true);
            })
            ->with('store')
            ->inRandomOrder() // For now, random selection
            ->take(20)
            ->get();

        return response()->json($products);
    }

    /**
     * Get products from a specific store
     */
    public function byStore($storeId)
    {
        $products = Product::where('is_available', true)
            ->where('store_id', $storeId)
            ->whereHas('store', function($q) {
                $q->where('is_active', true);
            })
            ->with('store')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json($products);
    }
}

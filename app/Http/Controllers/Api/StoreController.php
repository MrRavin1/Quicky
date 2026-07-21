<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    /**
     * Get all active stores with optional filtering
     */
    public function index(Request $request)
    {
        $query = Store::where('is_active', true);

        // Filter by category if provided
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by city if provided
        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        // Filter by featured
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $stores = $query
            ->withCount('products')
            ->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->paginate(20);

        return response()->json($stores);
    }

    /**
     * Get single store with products
     */
    public function show(Store $store)
    {
        if (!$store->is_active) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        $store->load(['products' => function($q) {
            $q->where('is_available', true)
              ->orderBy('sort_order')
              ->orderBy('name');
        }]);

        return response()->json($store);
    }

    /**
     * Get stores by category
     */
    public function byCategory($category)
    {
        $stores = Store::where('is_active', true)
            ->where('category', $category)
            ->withCount('products')
            ->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->paginate(20);

        return response()->json($stores);
    }

    /**
     * Get featured stores
     */
    public function featured()
    {
        $stores = Store::where('is_active', true)
            ->where('is_featured', true)
            ->withCount('products')
            ->orderBy('name')
            ->take(10)
            ->get();

        return response()->json($stores);
    }

    /**
     * Search stores and products
     */
    public function search(Request $request)
    {
        $query = $request->get('q');
        
        if (!$query) {
            return response()->json(['message' => 'Search query required'], 400);
        }

        // Search stores
        $stores = Store::where('is_active', true)
            ->where(function($q) use ($query) {
                $q->where('name', 'LIKE', '%' . $query . '%')
                  ->orWhere('category', 'LIKE', '%' . $query . '%')
                  ->orWhere('description', 'LIKE', '%' . $query . '%');
            })
            ->withCount('products')
            ->take(10)
            ->get();

        // Search products
        $products = \App\Models\Product::where('is_available', true)
            ->where(function($q) use ($query) {
                $q->where('name', 'LIKE', '%' . $query . '%')
                  ->orWhere('category', 'LIKE', '%' . $query . '%')
                  ->orWhere('description', 'LIKE', '%' . $query . '%');
            })
            ->with('store')
            ->take(20)
            ->get();

        return response()->json([
            'stores' => $stores,
            'products' => $products,
            'query' => $query
        ]);
    }
}

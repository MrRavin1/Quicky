<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Store $store, Request $request)
    {
        $products = $store->products()
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->when($request->category, fn($q) => $q->where('category', $request->category))
            ->orderBy('sort_order')
            ->orderBy('category')
            ->paginate(20)
            ->withQueryString()
            ->through(fn($p) => [
                'id'           => $p->id,
                'name'         => $p->name,
                'description'  => $p->description,
                'price'        => $p->price,
                'category'     => $p->category,
                'is_available' => $p->is_available,
                'sort_order'   => $p->sort_order,
                'image_url'    => $p->image ? Storage::url($p->image) : null,
                'created_at'   => $p->created_at->format('d M Y'),
            ]);

        return Inertia::render('Admin/Products/Index', [
            'store'    => ['id' => $store->id, 'name' => $store->name, 'category' => $store->category],
            'products' => $products,
            'filters'  => $request->only(['search', 'category']),
        ]);
    }

    public function create(Store $store)
    {
        return Inertia::render('Admin/Products/Form', [
            'store'   => ['id' => $store->id, 'name' => $store->name],
            'product' => null,
        ]);
    }

    public function store(Request $request, Store $store)
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'price'        => 'required|numeric|min:0',
            'category'     => 'nullable|string|max:100',
            'image'        => 'nullable|image|max:2048',
            'is_available' => 'boolean',
            'sort_order'   => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $data['store_id'] = $store->id;
        Product::create($data);

        return redirect()->route('admin.stores.products.index', $store)
            ->with('success', 'Product added successfully.');
    }

    public function edit(Store $store, Product $product)
    {
        return Inertia::render('Admin/Products/Form', [
            'store'   => ['id' => $store->id, 'name' => $store->name],
            'product' => array_merge($product->toArray(), [
                'image_url' => $product->image ? Storage::url($product->image) : null,
            ]),
        ]);
    }

    public function update(Request $request, Store $store, Product $product)
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'price'        => 'required|numeric|min:0',
            'category'     => 'nullable|string|max:100',
            'image'        => 'nullable|image|max:2048',
            'is_available' => 'boolean',
            'sort_order'   => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) Storage::disk('public')->delete($product->image);
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return redirect()->route('admin.stores.products.index', $store)
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Store $store, Product $product)
    {
        if ($product->image) Storage::disk('public')->delete($product->image);
        $product->delete();

        return back()->with('success', 'Product deleted.');
    }

    public function toggleAvailability(Store $store, Product $product)
    {
        $product->update(['is_available' => ! $product->is_available]);
        return back()->with('success', 'Availability updated.');
    }
}

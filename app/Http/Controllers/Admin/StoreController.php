<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $stores = Store::withCount('products')
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->when($request->category, fn($q) => $q->where('category', $request->category))
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn($s) => [
                'id'           => $s->id,
                'name'         => $s->name,
                'category'     => $s->category,
                'address'      => $s->address,
                'city'         => $s->city,
                'is_open'      => $s->is_open,
                'is_featured'  => $s->is_featured,
                'is_active'    => $s->is_active,
                'products_count' => $s->products_count,
                'delivery_fee' => $s->delivery_fee,
                'estimated_delivery_minutes' => $s->estimated_delivery_minutes,
                'logo'         => $s->logo ? Storage::url($s->logo) : null,
                'created_at'   => $s->created_at->format('d M Y'),
            ]);

        return Inertia::render('Admin/Stores/Index', [
            'stores'   => $stores,
            'filters'  => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Stores/Form', ['store' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'                        => 'required|string|max:255',
            'category'                    => 'required|in:food,grocery,medicine',
            'description'                 => 'nullable|string',
            'address'                     => 'required|string',
            'city'                        => 'nullable|string|max:100',
            'phone'                       => 'nullable|string|max:20',
            'logo'                        => 'nullable|image|max:2048',
            'cover_image'                 => 'nullable|image|max:4096',
            'is_open'                     => 'boolean',
            'is_featured'                 => 'boolean',
            'is_active'                   => 'boolean',
            'delivery_fee'                => 'required|numeric|min:0',
            'estimated_delivery_minutes'  => 'required|integer|min:1',
        ]);

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('stores/logos', 'public');
        }
        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('stores/covers', 'public');
        }

        $data['created_by'] = $request->user()->id;

        Store::create($data);

        return redirect()->route('admin.stores.index')
            ->with('success', 'Store created successfully.');
    }

    public function edit(Store $store)
    {
        return Inertia::render('Admin/Stores/Form', [
            'store' => array_merge($store->toArray(), [
                'logo_url'         => $store->logo ? Storage::url($store->logo) : null,
                'cover_image_url'  => $store->cover_image ? Storage::url($store->cover_image) : null,
            ]),
        ]);
    }

    public function update(Request $request, Store $store)
    {
        $data = $request->validate([
            'name'                        => 'required|string|max:255',
            'category'                    => 'required|in:food,grocery,medicine',
            'description'                 => 'nullable|string',
            'address'                     => 'required|string',
            'city'                        => 'nullable|string|max:100',
            'phone'                       => 'nullable|string|max:20',
            'logo'                        => 'nullable|image|max:2048',
            'cover_image'                 => 'nullable|image|max:4096',
            'is_open'                     => 'boolean',
            'is_featured'                 => 'boolean',
            'is_active'                   => 'boolean',
            'delivery_fee'                => 'required|numeric|min:0',
            'estimated_delivery_minutes'  => 'required|integer|min:1',
        ]);

        if ($request->hasFile('logo')) {
            if ($store->logo) Storage::disk('public')->delete($store->logo);
            $data['logo'] = $request->file('logo')->store('stores/logos', 'public');
        }
        if ($request->hasFile('cover_image')) {
            if ($store->cover_image) Storage::disk('public')->delete($store->cover_image);
            $data['cover_image'] = $request->file('cover_image')->store('stores/covers', 'public');
        }

        $store->update($data);

        return redirect()->route('admin.stores.index')
            ->with('success', 'Store updated successfully.');
    }

    public function destroy(Store $store)
    {
        if ($store->logo) Storage::disk('public')->delete($store->logo);
        if ($store->cover_image) Storage::disk('public')->delete($store->cover_image);
        $store->delete();

        return redirect()->route('admin.stores.index')
            ->with('success', 'Store deleted.');
    }

    public function toggleStatus(Store $store)
    {
        $store->update(['is_active' => ! $store->is_active]);
        return back()->with('success', 'Store status updated.');
    }
}

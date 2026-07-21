<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Get user addresses
     */
    public function index()
    {
        $addresses = Address::where('user_id', Auth::id())
            ->orderBy('is_default', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($addresses);
    }

    /**
     * Store new address
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:home,work,other',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'address_line' => 'required|string|max:500',
            'landmark' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'area' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'is_default' => 'nullable|boolean',
        ]);

        // If this is set as default, remove default from other addresses
        if ($request->boolean('is_default')) {
            Address::where('user_id', Auth::id())
                ->update(['is_default' => false]);
        }

        $address = Address::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'name' => $request->name,
            'phone' => $request->phone,
            'address_line' => $request->address_line,
            'landmark' => $request->landmark,
            'city' => $request->city,
            'area' => $request->area,
            'postal_code' => $request->postal_code,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'is_default' => $request->boolean('is_default'),
        ]);

        return response()->json($address, 201);
    }

    /**
     * Get single address
     */
    public function show(Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($address);
    }

    /**
     * Update address
     */
    public function update(Request $request, Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'type' => 'required|in:home,work,other',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'address_line' => 'required|string|max:500',
            'landmark' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'area' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'is_default' => 'nullable|boolean',
        ]);

        // If this is set as default, remove default from other addresses
        if ($request->boolean('is_default')) {
            Address::where('user_id', Auth::id())
                ->where('id', '!=', $address->id)
                ->update(['is_default' => false]);
        }

        $address->update($request->validated());

        return response()->json($address);
    }

    /**
     * Delete address
     */
    public function destroy(Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $address->delete();

        return response()->json(['message' => 'Address deleted successfully']);
    }

    /**
     * Set default address
     */
    public function setDefault(Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Remove default from all addresses
        Address::where('user_id', Auth::id())
            ->update(['is_default' => false]);

        // Set this address as default
        $address->update(['is_default' => true]);

        return response()->json(['message' => 'Default address updated']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Get user profile
     */
    public function profile()
    {
        $user = Auth::user();
        $user->load('addresses');
        
        return response()->json($user);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:15',
            'language_pref' => 'nullable|in:en,ne',
        ]);

        $user->update($request->only(['name', 'email', 'phone', 'language_pref']));

        return response()->json($user);
    }

    /**
     * Update password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    /**
     * Upload avatar
     */
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            
            // Delete old avatar if exists
            if ($user->avatar) {
                \Storage::disk('public')->delete($user->avatar);
            }

            $user->update(['avatar' => $avatarPath]);
        }

        return response()->json($user);
    }

    /**
     * Get user statistics
     */
    public function stats()
    {
        $user = Auth::user();

        $stats = [
            'total_orders'     => $user->orders()->count(),
            'completed_orders' => $user->orders()->where('status', 'delivered')->count(),
            'total_spent'      => $user->orders()->where('status', 'delivered')->sum('total_amount'),
            'favorite_stores'  => $user->orders()
                ->select('store_id', DB::raw('COUNT(*) as order_count'))
                ->groupBy('store_id')
                ->orderBy('order_count', 'desc')
                ->take(5)
                ->pluck('order_count', 'store_id')
                ->pipe(function ($storeCountMap) {
                    $stores = \App\Models\Store::whereIn('id', $storeCountMap->keys())->get();
                    return $stores->map(fn($s) => [
                        'store'       => $s,
                        'order_count' => $storeCountMap[$s->id],
                    ])->sortByDesc('order_count')->values();
                }),
            'recent_orders'    => $user->orders()
                ->with(['store', 'items.product'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get(),
        ];

        return response()->json($stats);
    }

    /**
     * Delete account
     */
    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Password is incorrect'], 422);
        }

        // Check for active orders
        $activeOrders = $user->orders()->whereNotIn('status', ['delivered', 'cancelled'])->count();
        
        if ($activeOrders > 0) {
            return response()->json(['message' => 'Cannot delete account with active orders'], 422);
        }

        // Delete avatar if exists
        if ($user->avatar) {
            \Storage::disk('public')->delete($user->avatar);
        }

        // Revoke all API tokens so soft-deleted sessions can't authenticate
        $user->tokens()->delete();

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $coupons = Coupon::query()
            ->when($request->search, fn($q) => $q->where('code', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(20)
            ->withQueryString()
            ->through(fn($c) => [
                'id'              => $c->id,
                'code'            => $c->code,
                'type'            => $c->type,
                'value'           => $c->value,
                'min_order'       => $c->min_order_amount,
                'max_discount'    => $c->max_discount_amount,
                'usage_limit'     => $c->usage_limit,
                'used_count'      => $c->used_count,
                'is_active'       => $c->is_active,
                'expires_at'      => $c->expires_at?->format('d M Y'),
                'created_at'      => $c->created_at->format('d M Y'),
            ]);

        return Inertia::render('Admin/Coupons/Index', [
            'coupons' => $coupons,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Coupons/Form', ['coupon' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code'                => 'required|string|max:50|unique:coupons,code',
            'type'                => 'required|in:percentage,fixed',
            'value'               => 'required|numeric|min:0',
            'min_order_amount'    => 'nullable|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'usage_limit'         => 'nullable|integer|min:1',
            'is_active'           => 'boolean',
            'expires_at'          => 'nullable|date|after:today',
        ]);

        Coupon::create($data);

        return redirect()->route('admin.coupons.index')
            ->with('success', 'Coupon created successfully.');
    }

    public function edit(Coupon $coupon)
    {
        return Inertia::render('Admin/Coupons/Form', ['coupon' => $coupon]);
    }

    public function update(Request $request, Coupon $coupon)
    {
        $data = $request->validate([
            'code'                => "required|string|max:50|unique:coupons,code,{$coupon->id}",
            'type'                => 'required|in:percentage,fixed',
            'value'               => 'required|numeric|min:0',
            'min_order_amount'    => 'nullable|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'usage_limit'         => 'nullable|integer|min:1',
            'is_active'           => 'boolean',
            'expires_at'          => 'nullable|date',
        ]);

        $coupon->update($data);

        return redirect()->route('admin.coupons.index')
            ->with('success', 'Coupon updated.');
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return back()->with('success', 'Coupon deleted.');
    }

    public function toggle(Coupon $coupon)
    {
        $coupon->update(['is_active' => !$coupon->is_active]);
        return back()->with('success', 'Coupon status updated.');
    }
}

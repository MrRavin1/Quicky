<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Store;
use App\Models\User;
use App\Models\Rider;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_orders'     => Order::count(),
            'pending_orders'   => Order::where('status', 'placed')->count(),
            'active_riders'    => Rider::where('is_active', true)->count(),
            'total_stores'     => Store::where('is_active', true)->count(),
            'total_customers'  => User::where('role', 'customer')->count(),
            'todays_orders'    => Order::whereDate('created_at', today())->count(),
            'todays_revenue'   => Order::whereDate('created_at', today())
                                       ->where('payment_status', 'paid')
                                       ->sum('total_amount'),
            'pending_riders'   => Rider::where('verification_status', 'pending')->count(),
        ];

        $recent_orders = Order::with(['customer:id,name', 'store:id,name'])
            ->latest()
            ->take(8)
            ->get()
            ->map(fn($o) => [
                'id'           => $o->id,
                'customer'     => $o->customer?->name,
                'store'        => $o->store?->name,
                'type'         => $o->type,
                'status'       => $o->status,
                'total_amount' => $o->total_amount,
                'created_at'   => $o->created_at->diffForHumans(),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats'         => $stats,
            'recent_orders' => $recent_orders,
        ]);
    }

    /**
     * API stats endpoint — used by admin/v1/dashboard/stats
     */
    public function apiStats()
    {
        return response()->json([
            'total_orders'  => Order::count(),
            'total_users'   => User::where('role', 'customer')->count(),
            'total_stores'  => Store::count(),
            'total_riders'  => Rider::count(),
            'today_orders'  => Order::whereDate('created_at', today())->count(),
            'revenue_today' => Order::whereDate('created_at', today())
                ->where('status', 'delivered')
                ->sum('total_amount'),
        ]);
    }
}

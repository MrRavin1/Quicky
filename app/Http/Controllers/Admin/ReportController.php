<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->get('period', '7'); // days

        // Revenue over time
        $revenue = Order::query()
            ->where('payment_status', 'paid')
            ->where('created_at', '>=', now()->subDays((int)$period))
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as revenue, COUNT(*) as orders')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($r) => [
                'date'    => $r->date,
                'revenue' => (float) $r->revenue,
                'orders'  => (int) $r->orders,
            ]);

        // Orders by status
        $ordersByStatus = Order::query()
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        // Orders by type
        $ordersByType = Order::query()
            ->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->pluck('count', 'type');

        // Top stores by revenue
        $topStores = Order::query()
            ->with('store:id,name')
            ->where('payment_status', 'paid')
            ->whereNotNull('store_id')
            ->selectRaw('store_id, SUM(total_amount) as revenue, COUNT(*) as orders')
            ->groupBy('store_id')
            ->orderByDesc('revenue')
            ->take(5)
            ->get()
            ->map(fn($o) => [
                'store'   => $o->store?->name ?? 'Unknown',
                'revenue' => (float) $o->revenue,
                'orders'  => (int) $o->orders,
            ]);

        // Summary totals
        $summary = [
            'total_revenue'    => (float) Order::where('payment_status', 'paid')->sum('total_amount'),
            'total_orders'     => Order::count(),
            'delivered_orders' => Order::where('status', 'delivered')->count(),
            'cancelled_orders' => Order::where('status', 'cancelled')->count(),
            'new_users'        => User::where('created_at', '>=', now()->subDays((int)$period))->count(),
            'total_customers'  => User::where('role', 'customer')->count(),
        ];

        return Inertia::render('Admin/Reports', [
            'revenue'        => $revenue,
            'ordersByStatus' => $ordersByStatus,
            'ordersByType'   => $ordersByType,
            'topStores'      => $topStores,
            'summary'        => $summary,
            'period'         => $period,
        ]);
    }
}

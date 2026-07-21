<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with(['customer:id,name', 'store:id,name', 'rider.user:id,name'])
            ->when($request->search, fn($q) =>
                $q->whereHas('customer', fn($u) =>
                    $u->where('name', 'like', "%{$request->search}%")
                )
            )
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->type, fn($q) => $q->where('type', $request->type))
            ->latest()
            ->paginate(20)
            ->withQueryString()
            ->through(fn($o) => [
                'id'             => $o->id,
                'customer'       => $o->customer?->name,
                'store'          => $o->store?->name,
                'rider'          => $o->rider?->user?->name,
                'type'           => $o->type,
                'status'         => $o->status,
                'total_amount'   => $o->total_amount,
                'payment_method' => $o->payment_method,
                'payment_status' => $o->payment_status,
                'delivery_address' => $o->delivery_address,
                'created_at'     => $o->created_at->format('d M Y H:i'),
            ]);

        return Inertia::render('Admin/Orders/Index', [
            'orders'  => $orders,
            'filters' => $request->only(['search', 'status', 'type']),
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'customer:id,name,email,phone',
            'store:id,name,address',
            'rider.user:id,name',
            'items.product:id,name',
        ]);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:placed,confirmed,preparing,picked_up,on_the_way,delivered,cancelled',
        ]);

        $timestamps = [
            'confirmed'  => 'confirmed_at',
            'picked_up'  => 'picked_up_at',
            'delivered'  => 'delivered_at',
        ];

        $data = ['status' => $request->status];
        if (isset($timestamps[$request->status])) {
            $data[$timestamps[$request->status]] = now();
        }

        $order->update($data);

        return back()->with('success', 'Order status updated.');
    }
}

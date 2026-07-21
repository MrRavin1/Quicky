<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Get user's orders
     */
    public function index(Request $request)
    {
        $orders = Order::where('customer_id', Auth::id())
            ->with(['store', 'items.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($orders);
    }

    /**
     * Create new order
     */
    public function store(Request $request)
    {
        $request->validate([
            'store_id' => 'required|exists:stores,id',
            'type' => 'required|in:delivery,pickup',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
            'delivery_address' => 'required_if:type,delivery|string',
            'delivery_lat' => 'nullable|numeric',
            'delivery_lng' => 'nullable|numeric',
            'payment_method' => 'required|in:cash,card,digital_wallet',
            'coupon_code' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Calculate order totals
            $subtotal = 0;
            $orderItems = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if (!$product->is_available) {
                    DB::rollBack();
                    return response()->json(['message' => "Product {$product->name} is not available"], 400);
                }

                $itemSubtotal = $product->price * $item['quantity'];
                $subtotal += $itemSubtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $itemSubtotal,
                    'notes' => $item['notes'] ?? null,
                ];
            }

            // Get store delivery fee
            $store = \App\Models\Store::findOrFail($request->store_id);
            $deliveryFee = $request->type === 'delivery' ? $store->delivery_fee : 0;

            // Apply coupon if provided
            $discount = 0;
            if ($request->coupon_code) {
                $coupon = \App\Models\Coupon::where('code', $request->coupon_code)
                    ->where('is_active', true)
                    ->where('valid_from', '<=', now())
                    ->where('valid_to', '>=', now())
                    ->lockForUpdate()
                    ->first();

                if (
                    $coupon
                    && $subtotal >= $coupon->min_order_amount
                    && ($coupon->usage_limit === null || $coupon->used_count < $coupon->usage_limit)
                ) {
                    if ($coupon->type === 'percentage') {
                        $discount = ($subtotal * $coupon->value) / 100;
                    } else {
                        $discount = $coupon->value;
                    }

                    // Atomic increment inside the transaction — safe from race condition
                    $coupon->increment('used_count');
                }
            }

            $totalAmount = $subtotal + $deliveryFee - $discount;

            // Create order
            $order = Order::create([
                'customer_id' => Auth::id(),
                'store_id' => $request->store_id,
                'type' => $request->type,
                'status' => 'pending',
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'discount' => $discount,
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'delivery_address' => $request->delivery_address,
                'delivery_lat' => $request->delivery_lat,
                'delivery_lng' => $request->delivery_lng,
                'coupon_code' => $request->coupon_code,
                'notes' => $request->notes,
            ]);

            // Create order items
            foreach ($orderItems as $item) {
                $item['order_id'] = $order->id;
                OrderItem::create($item);
            }

            DB::commit();

            $order->load(['store', 'items.product']);
            
            return response()->json($order, 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Failed to create order',
                'error'   => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Get single order
     */
    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load(['store', 'items.product', 'rider.user']);
        return response()->json($order);
    }

    /**
     * Cancel order
     */
    public function cancel(Order $order)
    {
        $this->authorize('cancel', $order);

        if (!in_array($order->status, ['pending', 'confirmed'])) {
            return response()->json(['message' => 'Order cannot be cancelled'], 400);
        }

        $order->update(['status' => 'cancelled']);
        
        return response()->json(['message' => 'Order cancelled successfully']);
    }

    /**
     * Track order
     */
    public function track(Order $order)
    {
        $this->authorize('track', $order);

        $trackingData = [
            'order' => $order->load(['store', 'rider.user']),
            'status' => $order->status,
            'estimated_delivery' => $order->created_at->addMinutes($order->store->estimated_delivery_minutes ?? 30),
            'rider_location' => null
        ];

        // Add rider location if order is being delivered
        if ($order->rider && in_array($order->status, ['picked_up', 'in_transit'])) {
            $trackingData['rider_location'] = [
                'lat' => $order->rider->current_lat,
                'lng' => $order->rider->current_lng
            ];
        }

        return response()->json($trackingData);
    }
}

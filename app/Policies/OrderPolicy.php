<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    /**
     * Allow admin to do anything.
     */
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ? true : null;
    }

    /**
     * View an order.
     */
    public function view(User $user, Order $order): bool
    {
        return $order->customer_id === $user->id;
    }

    /**
     * Cancel an order.
     */
    public function cancel(User $user, Order $order): bool
    {
        return $order->customer_id === $user->id;
    }

    /**
     * Track an order.
     */
    public function track(User $user, Order $order): bool
    {
        return $order->customer_id === $user->id;
    }
}

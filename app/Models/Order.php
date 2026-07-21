<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_id',
        'store_id',
        'rider_id',
        'type',
        'status',
        'subtotal',
        'delivery_fee',
        'discount',
        'total_amount',
        'payment_method',
        'payment_status',
        'delivery_address',
        'delivery_lat',
        'delivery_lng',
        'coupon_code',
        'notes',
        'confirmed_at',
        'picked_up_at',
        'delivered_at',
    ];

    protected $casts = [
        'subtotal'      => 'decimal:2',
        'delivery_fee'  => 'decimal:2',
        'discount'      => 'decimal:2',
        'total_amount'  => 'decimal:2',
        'confirmed_at'  => 'datetime',
        'picked_up_at'  => 'datetime',
        'delivered_at'  => 'datetime',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function rider()
    {
        return $this->belongsTo(Rider::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->morphOne(Payment::class, 'payable');
    }
}

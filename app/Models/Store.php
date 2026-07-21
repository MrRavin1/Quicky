<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'description',
        'address',
        'city',
        'lat',
        'lng',
        'phone',
        'logo',
        'cover_image',
        'opening_hours',
        'is_open',
        'is_featured',
        'is_active',
        'delivery_fee',
        'estimated_delivery_minutes',
        'created_by',
    ];

    protected $casts = [
        'opening_hours' => 'array',
        'is_open'       => 'boolean',
        'is_featured'   => 'boolean',
        'is_active'     => 'boolean',
        'delivery_fee'  => 'decimal:2',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

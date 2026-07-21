<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rider extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'vehicle_type',
        'license_no',
        'id_document',
        'source',
        'verification_status',
        'is_active',
        'is_online',
        'current_lat',
        'current_lng',
        'rejection_reason',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_online' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

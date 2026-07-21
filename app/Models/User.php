<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar',
        'otp',
        'otp_expires_at',
        'language_pref',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'otp',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'otp_expires_at'    => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // Role helpers
    public function isAdmin(): bool    { return $this->role === 'admin'; }
    public function isRider(): bool    { return $this->role === 'rider'; }
    public function isCustomer(): bool { return $this->role === 'customer'; }

    // Relationships
    public function rider()    { return $this->hasOne(Rider::class); }
    public function orders()   { return $this->hasMany(Order::class, 'customer_id'); }
    public function addresses(){ return $this->hasMany(Address::class); }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Store;

class StoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminId = \App\Models\User::where('role', 'admin')->first()?->id ?? 1;

        $stores = [
            [
                'name' => 'Pizza Palace',
                'category' => 'food',
                'description' => 'Authentic Italian pizzas with fresh ingredients',
                'address' => 'Durbar Marg, Kathmandu',
                'city' => 'Kathmandu',
                'lat' => 27.7021,
                'lng' => 85.3157,
                'phone' => '+977-1-4444444',
                'opening_hours' => ['monday' => '10:00-22:00', 'tuesday' => '10:00-22:00'],
                'is_open' => true,
                'is_featured' => true,
                'is_active' => true,
                'delivery_fee' => 50.00,
                'estimated_delivery_minutes' => 30,
                'created_by' => $adminId,
            ],
            [
                'name' => 'Burger King',
                'category' => 'food', 
                'description' => 'Flame-grilled burgers and fast food',
                'address' => 'New Road, Kathmandu',
                'city' => 'Kathmandu',
                'lat' => 27.7001,
                'lng' => 85.3140,
                'phone' => '+977-1-5555555',
                'opening_hours' => ['monday' => '09:00-23:00', 'tuesday' => '09:00-23:00'],
                'is_open' => true,
                'is_featured' => true,
                'is_active' => true,
                'delivery_fee' => 40.00,
                'estimated_delivery_minutes' => 25,
                'created_by' => $adminId,
            ],
            [
                'name' => 'Big Mart',
                'category' => 'groceries',
                'description' => 'Fresh groceries and daily essentials',
                'address' => 'Thamel, Kathmandu',
                'city' => 'Kathmandu',
                'lat' => 27.7156,
                'lng' => 85.3124,
                'phone' => '+977-1-6666666',
                'opening_hours' => ['monday' => '06:00-22:00', 'tuesday' => '06:00-22:00'],
                'is_open' => true,
                'is_featured' => true,
                'is_active' => true,
                'delivery_fee' => 30.00,
                'estimated_delivery_minutes' => 20,
                'created_by' => $adminId,
            ],
            [
                'name' => 'Med Plus Pharmacy',
                'category' => 'medicine',
                'description' => '24/7 pharmacy with prescription medicines',
                'address' => 'Maharajgunj, Kathmandu',
                'city' => 'Kathmandu',
                'lat' => 27.7394,
                'lng' => 85.3342,
                'phone' => '+977-1-7777777',
                'opening_hours' => ['monday' => '00:00-23:59', 'tuesday' => '00:00-23:59'],
                'is_open' => true,
                'is_featured' => false,
                'is_active' => true,
                'delivery_fee' => 25.00,
                'estimated_delivery_minutes' => 15,
                'created_by' => $adminId,
            ],
        ];

        foreach ($stores as $store) {
            Store::create($store);
        }
    }
}

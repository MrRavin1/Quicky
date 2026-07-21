<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Store;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stores = Store::all();
        
        if ($stores->isEmpty()) {
            $this->command->error('No stores found. Please run StoresTableSeeder first.');
            return;
        }

        $products = [
            // Pizza Palace products
            [
                'store_category' => 'food',
                'store_name' => 'Pizza Palace',
                'products' => [
                    [
                        'name' => 'Margherita Pizza',
                        'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
                        'price' => 899.00,
                        'category' => 'food',
                        'is_available' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Pepperoni Pizza',
                        'description' => 'Pizza with spicy pepperoni and mozzarella cheese',
                        'price' => 1199.00,
                        'category' => 'food',
                        'is_available' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'name' => 'Garlic Bread',
                        'description' => 'Crispy bread with garlic butter and herbs',
                        'price' => 299.00,
                        'category' => 'food',
                        'is_available' => true,
                        'sort_order' => 3,
                    ],
                ]
            ],
            
            // Burger King products
            [
                'store_category' => 'food',
                'store_name' => 'Burger King',
                'products' => [
                    [
                        'name' => 'Whopper Burger',
                        'description' => 'Flame-grilled beef patty with lettuce, tomato, onion, and mayo',
                        'price' => 649.00,
                        'category' => 'food',
                        'is_available' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Chicken Burger',
                        'description' => 'Crispy chicken breast with fresh vegetables',
                        'price' => 549.00,
                        'category' => 'food',
                        'is_available' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'name' => 'French Fries',
                        'description' => 'Crispy golden fries with special seasoning',
                        'price' => 199.00,
                        'category' => 'food',
                        'is_available' => true,
                        'sort_order' => 3,
                    ],
                ]
            ],
            
            // Big Mart products
            [
                'store_category' => 'groceries',
                'store_name' => 'Big Mart',
                'products' => [
                    [
                        'name' => 'Fresh Milk (1L)',
                        'description' => 'Pure cow milk, pasteurized and homogenized',
                        'price' => 85.00,
                        'category' => 'groceries',
                        'is_available' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'White Bread',
                        'description' => 'Fresh baked white bread loaf',
                        'price' => 65.00,
                        'category' => 'groceries',
                        'is_available' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'name' => 'Basmati Rice (5kg)',
                        'description' => 'Premium quality basmati rice',
                        'price' => 899.00,
                        'category' => 'groceries',
                        'is_available' => true,
                        'sort_order' => 3,
                    ],
                ]
            ],
            
            // Med Plus products
            [
                'store_category' => 'medicine',
                'store_name' => 'Med Plus Pharmacy',
                'products' => [
                    [
                        'name' => 'Paracetamol 500mg',
                        'description' => 'Pain relief and fever reduction tablets (10 tablets)',
                        'price' => 25.00,
                        'category' => 'medicine',
                        'is_available' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Vitamin C Tablets',
                        'description' => 'Immune system support (30 tablets)',
                        'price' => 150.00,
                        'category' => 'medicine',
                        'is_available' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'name' => 'Hand Sanitizer',
                        'description' => '70% alcohol-based hand sanitizer (100ml)',
                        'price' => 85.00,
                        'category' => 'medicine',
                        'is_available' => true,
                        'sort_order' => 3,
                    ],
                ]
            ],
        ];

        foreach ($products as $storeProducts) {
            $store = $stores->where('name', $storeProducts['store_name'])->first();
            
            if (!$store) {
                continue;
            }

            foreach ($storeProducts['products'] as $productData) {
                $productData['store_id'] = $store->id;
                Product::create($productData);
            }
        }
    }
}

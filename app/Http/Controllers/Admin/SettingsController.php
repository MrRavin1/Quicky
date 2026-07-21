<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        // In a real app, pull from database or env/config
        $settings = [
            'app_name'            => config('app.name'),
            'app_url'             => config('app.url'),
            'delivery_fee'        => 50,
            'min_order_amount'    => 100,
            'max_delivery_radius' => 10, // km
            'commission_rate'     => 10, // %
            'push_notifications'  => true,
            'maintenance_mode'    => false,
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        // Validate
        $request->validate([
            'delivery_fee'        => 'nullable|numeric|min:0',
            'min_order_amount'    => 'nullable|numeric|min:0',
            'max_delivery_radius' => 'nullable|numeric|min:1',
            'commission_rate'     => 'nullable|numeric|min:0|max:100',
        ]);

        // In production: save to DB or update .env via Laravel helpers
        // For now, just return success

        return back()->with('success', 'Settings updated successfully.');
    }
}

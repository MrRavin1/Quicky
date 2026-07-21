#!/bin/bash

echo "📱 Quicky Mobile-First Delivery Platform"
echo "========================================="
echo ""
echo "🔧 MOBILE OPTIMIZATIONS APPLIED:"
echo ""
echo "✅ Fixed missing food image - Now shows appetizing burger/food"
echo "✅ Updated tobacco 18+ image - White background with clear signage"
echo "✅ Added red 18+ badge overlay for tobacco category"
echo "✅ Optimized image dimensions (300x200px) for sharp display"
echo "✅ Mobile-first responsive design with proper image fitting"
echo ""
echo "📐 MOBILE RESPONSIVE FEATURES:"
echo "• Touch-friendly 48px+ tap targets"
echo "• Optimized spacing for small screens"
echo "• Responsive text sizes (xs on mobile, sm on desktop)"
echo "• Properly fitted category card images"
echo "• Mobile-optimized icon sizes and positioning"
echo "• Reduced gaps and margins for mobile density"
echo ""
echo "🎨 CATEGORY CARDS:"
echo "• Food: High-quality burger image with chef hat icon"
echo "• Grocery: Fresh vegetables with basket icon"
echo "• Beauty: Cosmetics with sparkles icon"
echo "• Tobacco 18+: White background + red 18+ badge"
echo "• Pharmacy: Pills with medical icon"
echo "• Drinks: Coffee/beverages with cup icon"
echo "• Parcel: Package delivery with package icon"
echo "• Pet Care: Pet supplies with paw icon"
echo ""
echo "🚀 Starting development server..."

# Start Laravel development server
php artisan serve --port=8000 &
SERVER_PID=$!

echo ""
echo "📱 View at: http://localhost:8000"
echo "📖 Test on mobile device or browser dev tools"
echo "🎯 Production-ready mobile delivery app experience!"
echo ""
echo "Press Ctrl+C to stop"

wait $SERVER_PID

#!/bin/bash

echo "🚀 Starting Quicky Delivery Platform..."
echo "📱 Production-ready mobile-first design"
echo "🎨 Premium yellow brand identity"
echo "⚡ Professional SVG icons from Lucide React"
echo ""

# Start Laravel development server
php artisan serve --port=8000 &
SERVER_PID=$!

echo "🌟 Quicky is now running at: http://localhost:8000"
echo ""
echo "✨ NEW HERO SECTION FEATURES:"
echo "• Premium layered yellow background with soft gradients"
echo "• Professional SVG icons (no emojis)"
echo "• Mobile-first responsive design"
echo "• Inter font for premium typography"
echo "• Live order tracking card with real-time animations"
echo "• Floating service buttons with smooth animations"
echo "• Production-ready glassmorphism effects"
echo "• Touch-friendly 48px+ tap targets"
echo ""
echo "📱 CATEGORIES WITH REAL PRODUCT IMAGES:"
echo "• Food - Pizza & burgers with chef hat icon"
echo "• Grocery - Fresh vegetables with basket icon"  
echo "• Beauty - Cosmetics & makeup with sparkles icon"
echo "• Tobacco 18+ - Cigarettes with cigarette icon"
echo "• Pharmacy - Pills & medicine with pill icon"
echo "• Drinks - Coffee & beverages with cup icon"
echo "• Parcel - Package delivery with package icon"
echo "• Pet Care - Pet supplies with paw icon"
echo ""
echo "🎯 Ready for production deployment!"
echo "Press Ctrl+C to stop the server"

# Wait for interrupt
wait $SERVER_PID

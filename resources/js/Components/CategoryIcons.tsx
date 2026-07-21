import React from 'react';

// Custom, premium flat illustration SVG icons with soft gradients.
// All icons have viewBox="0 0 32 32" to ensure details are sharp and clear.

export function FoodIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="burger-bun" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="burger-patty" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#78350F" />
                    <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
                <linearGradient id="burger-cheese" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="burger-lettuce" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="burger-tomato" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F87171" />
                    <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
            </defs>
            {/* Bun Top */}
            <path d="M4 14C4 8 9 6 16 6S28 8 28 14H4Z" fill="url(#burger-bun)" />
            {/* Sesame Seeds */}
            <circle cx="10" cy="9" r="0.7" fill="#FFF" opacity="0.8" />
            <circle cx="16" cy="8" r="0.7" fill="#FFF" opacity="0.8" />
            <circle cx="22" cy="10" r="0.7" fill="#FFF" opacity="0.8" />
            <circle cx="13" cy="11" r="0.7" fill="#FFF" opacity="0.8" />
            <circle cx="19" cy="11" r="0.7" fill="#FFF" opacity="0.8" />
            
            {/* Tomato Slices */}
            <rect x="5" y="14" width="22" height="2" rx="1" fill="url(#burger-tomato)" />
            
            {/* Lettuce */}
            <path d="M4 16C5 15.5 6 15.5 7 16C8 16.5 9 16.5 10 16C11 15.5 12 15.5 13 16C14 16.5 15 16.5 16 16C17 15.5 18 15.5 19 16C20 16.5 21 16.5 22 16C23 15.5 24 15.5 25 16C26 16.5 27 16.5 28 16V17.5H4V16Z" fill="url(#burger-lettuce)" />
            
            {/* Cheese */}
            <path d="M5 17.5L16 22L27 17.5V18.5L16 23L5 18.5V17.5Z" fill="url(#burger-cheese)" />
            
            {/* Patty */}
            <rect x="4" y="19" width="24" height="4" rx="2" fill="url(#burger-patty)" />
            
            {/* Bun Bottom */}
            <path d="M5 23C5 23 5 27 16 27S27 23 27 23H5Z" fill="url(#burger-bun)" />
        </svg>
    );
}

export function GroceryIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="basket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="apple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>
                <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                </linearGradient>
            </defs>
            {/* Grocery items inside */}
            {/* Apple */}
            <circle cx="12" cy="13" r="5" fill="url(#apple-grad)" />
            <path d="M12 8C12 8 13 6 15 6" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 6.5C13.5 5.5 12 5.5 11 6" fill="url(#leaf-grad)" />

            {/* Banana/Orange */}
            <circle cx="20" cy="14" r="4.5" fill="#FBBF24" />
            <circle cx="16" cy="15" r="4" fill="#F97316" />

            {/* Basket Base */}
            <path d="M4 14H28L25 27H7L4 14Z" fill="url(#basket-grad)" />
            {/* Basket Rim */}
            <rect x="3" y="12" width="26" height="3" rx="1.5" fill="#1E40AF" />
            {/* Grid Pattern Details */}
            <path d="M8 15L10 26M12 15L13.5 26M16 15V26M20 15L18.5 26M24 15L22 26" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <path d="M5.5 18H26.5M6.5 22H25.5" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            
            {/* Basket Handle */}
            <path d="M7 12C7 12 7 4 16 4S25 12 25 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function CigarettesIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pack-base" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4B5563" />
                    <stop offset="100%" stopColor="#1F2937" />
                </linearGradient>
                <linearGradient id="pack-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="ciga-filter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#C2410C" />
                </linearGradient>
            </defs>
            {/* Cigarettes emerging */}
            <rect x="10" y="4" width="3" height="12" rx="1" fill="#FFFFFF" />
            <rect x="10" y="4" width="3" height="4" rx="0.5" fill="url(#ciga-filter)" />
            <rect x="14" y="2" width="3" height="14" rx="1" fill="#FFFFFF" />
            <rect x="14" y="2" width="3" height="4.5" rx="0.5" fill="url(#ciga-filter)" />
            <rect x="18" y="5" width="3" height="11" rx="1" fill="#FFFFFF" />
            <rect x="18" y="5" width="3" height="3.5" rx="0.5" fill="url(#ciga-filter)" />

            {/* Pack Base */}
            <path d="M7 10H25V28H7V10Z" fill="url(#pack-base)" />
            {/* Pack Lid Flip Line */}
            <path d="M7 15H25" stroke="#111827" strokeWidth="1.5" />
            {/* Gold Stripe Accent */}
            <rect x="7" y="17" width="18" height="3" fill="url(#pack-gold)" />
            
            {/* Warning Label Badge / Crest */}
            <circle cx="16" cy="23" r="3" fill="url(#pack-gold)" />
            <circle cx="16" cy="23" r="1.5" fill="#1F2937" />
        </svg>
    );
}

export function CosmeticsIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lipstick-bullet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="lipstick-case-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="50%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
                <linearGradient id="lipstick-case-black" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="100%" stopColor="#111827" />
                </linearGradient>
            </defs>
            {/* Lipstick Bullet */}
            <path d="M12 14V8.5C12 7 13.5 6 15 6C16.5 6 18 7 18 8.5V14H12Z" fill="url(#lipstick-bullet)" />
            {/* Angle Top Reflection */}
            <path d="M12.5 8C13 6.5 15.5 6.5 17.5 8" stroke="#FFAEAE" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            
            {/* Inner Metallic Gold Rim */}
            <rect x="11" y="13" width="8" height="4" fill="url(#lipstick-case-gold)" />

            {/* Base Case */}
            <rect x="9" y="17" width="12" height="11" rx="1.5" fill="url(#lipstick-case-black)" />
            {/* Gold Ribbon Accent */}
            <rect x="9" y="20" width="12" height="2" fill="url(#lipstick-case-gold)" />
            
            {/* Highlight Sparkle */}
            <path d="M22 6L23 9L26 10L23 11L22 14L21 11L18 10L21 9L22 6Z" fill="#FDE047" opacity="0.8" />
        </svg>
    );
}

export function PharmacyIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="capsule-red" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
                <linearGradient id="capsule-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2DD4BF" />
                    <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
            </defs>
            {/* Medicine Bottle */}
            <rect x="5" y="13" width="12" height="14" rx="2" fill="#E5E7EB" />
            <rect x="5" y="13" width="12" height="3" fill="#3B82F6" />
            <rect x="8" y="10" width="6" height="3" rx="0.5" fill="#9CA3AF" />
            {/* Cross Symbol on Bottle */}
            <path d="M11 17V23M8 20H14" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />

            {/* Capsule 1 (Diagonal) */}
            <g transform="translate(14, 5) rotate(45)">
                {/* Top Half */}
                <path d="M4 2C4 2 4 8 8 8S12 8 12 2H4Z" fill="url(#capsule-red)" />
                {/* Bottom Half */}
                <path d="M4 2C4 2 4 -4 8 -4S12 -4 12 2H4Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.5" />
                {/* Band */}
                <rect x="4" y="1.5" width="8" height="1" fill="#374151" />
            </g>

            {/* Capsule 2 (Behind/Small) */}
            <g transform="translate(23, 18) rotate(-30)">
                <path d="M3 1.5C3 1.5 3 6 6 6S9 6 9 1.5H3Z" fill="url(#capsule-teal)" />
                <path d="M3 1.5C3 1.5 3 -3 6 -3S9 -3 9 1.5H3Z" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="0.5" />
            </g>
        </svg>
    );
}

export function AlcoholIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="wine-bottle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#065F46" />
                    <stop offset="100%" stopColor="#022C22" />
                </linearGradient>
                <linearGradient id="wine-liquid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#991B1B" />
                    <stop offset="100%" stopColor="#581C87" />
                </linearGradient>
                <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
            </defs>
            {/* Wine Bottle */}
            <path d="M9 13C9 13 11 11 11 7V4H13V7C13 11 15 13 15 13V28H9V13Z" fill="url(#wine-bottle)" />
            {/* Neck Foil */}
            <path d="M11 4H13V7H11V4Z" fill="url(#gold-foil)" />
            {/* Cream Label */}
            <rect x="9.5" y="16" width="5" height="7" rx="0.5" fill="#FEF3C7" />
            <rect x="11" y="18" width="2" height="2" fill="#D97706" />

            {/* Wine Glass */}
            <path d="M19 16C19 21 25 21 25 16H19Z" fill="url(#wine-liquid)" />
            <path d="M19 14H25V16C25 19.3 22.3 22 19 22V14Z" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
            {/* Glass Stem and Base */}
            <path d="M22 21.5V27.5M19.5 27.5H24.5" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function DrinksIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cup-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="straw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F87171" />
                    <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
            </defs>
            {/* Straw */}
            <path d="M19 12L23 3" stroke="url(#straw-grad)" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Cup Body */}
            <path d="M8 12L11 28H21L24 12H8Z" fill="url(#cup-grad)" />
            
            {/* White Cup Lid */}
            <path d="M7 11C7 9.5 9 8 16 8S25 9.5 25 11H7Z" fill="#F3F4F6" />
            <rect x="6.5" y="10.5" width="19" height="2" rx="1" fill="#E5E7EB" />
            
            {/* Logo Stripe */}
            <circle cx="16" cy="20" r="3.5" fill="#FFFFFF" opacity="0.9" />
            <path d="M14.5 20H17.5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function ParcelIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="box-top" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="box-left" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="box-right" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
            </defs>
            {/* Isometric cardboard box */}
            {/* Top Flap */}
            <path d="M16 4L27 10L16 16L5 10L16 4Z" fill="url(#box-top)" />
            {/* Left Face */}
            <path d="M5 10V22L16 28V16L5 10Z" fill="url(#box-left)" />
            {/* Right Face */}
            <path d="M16 16V28L27 22V10L16 16Z" fill="url(#box-right)" />
            
            {/* White Shipping Label */}
            <path d="M19 12L23 14L20 16L16 14L19 12Z" fill="#FFFFFF" opacity="0.9" />
            
            {/* Grey Packaging Tape */}
            <path d="M16 4L11 7L16 10L21 7L16 4Z" fill="#9CA3AF" opacity="0.3" />
            <path d="M16 10V18" stroke="#4B5563" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

export function PetCareIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="paw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A16207" />
                    <stop offset="100%" stopColor="#713F12" />
                </linearGradient>
            </defs>
            {/* Dog Paw Print */}
            {/* Central Pad */}
            <path d="M16 14C12 14 9 17 9 21C9 25 12 28 16 28S23 25 23 21C23 17 20 14 16 14Z" fill="url(#paw-grad)" />
            
            {/* 4 Toe Pads */}
            <circle cx="8" cy="11" r="3" fill="url(#paw-grad)" />
            <circle cx="13" cy="7" r="3.2" fill="url(#paw-grad)" />
            <circle cx="19" cy="7" r="3.2" fill="url(#paw-grad)" />
            <circle cx="24" cy="11" r="3" fill="url(#paw-grad)" />
        </svg>
    );
}

export function FlowersIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="flower-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#BE185D" />
                </linearGradient>
                <linearGradient id="flower-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#C2410C" />
                </linearGradient>
                <linearGradient id="wrap-paper" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5E0C3" />
                    <stop offset="100%" stopColor="#DDB382" />
                </linearGradient>
            </defs>
            {/* Stems */}
            <path d="M13 18L16 28M19 18L16 28M16 18V28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

            {/* Bouquet Wrap Paper */}
            <path d="M7 16L16 29L25 16H7Z" fill="url(#wrap-paper)" />
            <path d="M12 20C12 20 15 22 16 22S20 20 20 20" stroke="#B45309" strokeWidth="1.5" />

            {/* Flowers */}
            {/* Tulip 1 (Pink) */}
            <circle cx="12" cy="11" r="4.5" fill="url(#flower-pink)" />
            <path d="M12 6.5C11 8.5 13 11 12 13" stroke="#FFF" strokeWidth="0.5" opacity="0.3" />

            {/* Tulip 2 (Orange) */}
            <circle cx="20" cy="11" r="4.5" fill="url(#flower-orange)" />
            <path d="M20 6.5C19 8.5 21 11 20 13" stroke="#FFF" strokeWidth="0.5" opacity="0.3" />

            {/* Center Flower (Yellow) */}
            <circle cx="16" cy="14" r="3.5" fill="#FBBF24" />
            <circle cx="16" cy="14" r="1.5" fill="#D97706" />
        </svg>
    );
}

export function ElectronicsIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="plug-body" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9CA3AF" />
                    <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
                <linearGradient id="lightning-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
            </defs>
            {/* Plug Body */}
            <rect x="11" y="16" width="10" height="9" rx="2.5" fill="url(#plug-body)" />
            {/* Prongs */}
            <rect x="13" y="10" width="2" height="6" fill="#D1D5DB" />
            <rect x="17" y="10" width="2" height="6" fill="#D1D5DB" />
            {/* Cord */}
            <path d="M16 25V29" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />

            {/* Glowing Lightning Bolt overlay */}
            <path d="M17 3L11 11H16L14 17L21 9H16L17 3Z" fill="url(#lightning-bolt)" filter="drop-shadow(0px 1px 3px rgba(234, 179, 8, 0.4))" />
        </svg>
    );
}

export function SnacksIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="chocolate-bar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#78350F" />
                    <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
                <linearGradient id="snack-wrapper" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>
            </defs>
            {/* Chocolate Bar chunks showing */}
            <rect x="10" y="5" width="12" height="12" rx="1.5" fill="url(#chocolate-bar)" />
            {/* Chunk Lines */}
            <path d="M14 5V17M18 5V17M10 9H22M10 13H22" stroke="#3F1A04" strokeWidth="1" />

            {/* Red Foil Wrapper partially peeled */}
            <path d="M8 12H24V27H8V12Z" fill="url(#snack-wrapper)" />
            {/* Crumpled peel details */}
            <path d="M8 12L12 15L16 11L20 15L24 12" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="0.5" />
            
            {/* Gold Stripe on Wrapper */}
            <rect x="8" y="18" width="16" height="2" fill="#FBBF24" />
        </svg>
    );
}

export function ExpressIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="express-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5B800" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
            </defs>
            {/* Double Lightning Bolt (Speedy/Express) */}
            {/* Main Lightning Bolt */}
            <path d="M20 3L9 15H17L14 29L25 17H17L20 3Z" fill="url(#express-bolt)" filter="drop-shadow(0px 2px 8px rgba(245, 184, 0, 0.5))" />
            
            {/* Smaller Speed Lines / Shadow Bolt */}
            <path d="M7 11L4 15H7L5 21L9 16H6L7 11Z" fill="#FBBF24" opacity="0.7" />
        </svg>
    );
}

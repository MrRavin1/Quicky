import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Props {
    auth: PageProps['auth'];
    canRegister: boolean;
}

const popularSearches = ['Pizza', 'Milk', 'Medicine', 'Coffee', 'Flowers', 'Parcel'];

const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '500+', label: 'Stores' },
    { value: '30 min', label: 'Avg Delivery' },
];

export default function Hero({ auth, canRegister }: Props) {
    const [search, setSearch] = useState('');

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-quicky-yellow via-yellow-400 to-amber-400">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/20 blur-3xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl"
                    animate={{ scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 sm:py-16 lg:py-20">

                    {/* Left: Copy + Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="order-2 lg:order-1"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                        >
                            <TrendingUp className="h-3.5 w-3.5 text-black/70" />
                            <span className="text-xs sm:text-sm font-semibold text-black/80 uppercase tracking-wide">
                                Now delivering across Nepal
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.7 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.92] tracking-tight text-black"
                        >
                            Everything
                            <br />
                            <span className="text-black/80">delivered</span>
                            <br />
                            in minutes.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-5 text-base sm:text-lg text-black/70 font-medium max-w-md"
                        >
                            Food, groceries, medicine, parcels — one app for everything.
                            Fast delivery to your door.
                        </motion.p>

                        {/* Search box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="mt-8"
                        >
                            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl px-4 sm:px-5 py-3.5 sm:py-4 border border-white/50">
                                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search restaurants, grocery, pharmacy…"
                                    className="flex-1 text-sm sm:text-base text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent font-medium min-w-0"
                                />
                                <Link href={`/search?q=${encodeURIComponent(search)}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="shrink-0 bg-black text-white text-sm font-bold px-4 sm:px-6 py-2.5 rounded-xl hover:bg-black/85 transition-colors"
                                    >
                                        Search
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Trending searches */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-5 flex flex-wrap items-center gap-2"
                        >
                            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide mr-1">
                                Trending:
                            </span>
                            {popularSearches.map((term, i) => (
                                <motion.button
                                    key={term}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.75 + i * 0.06 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1.5 text-xs sm:text-sm font-medium text-black/70 bg-white/60 hover:bg-white/90 rounded-full backdrop-blur-sm transition-colors"
                                >
                                    {term}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85 }}
                            className="mt-10 flex items-center gap-6 sm:gap-8"
                        >
                            {stats.map((stat, i) => (
                                <div key={stat.label}>
                                    <p className="text-xl sm:text-2xl font-black text-black">{stat.value}</p>
                                    <p className="text-xs text-black/60 font-medium mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Order tracking card */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6">
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-gray-900">Your Order</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs font-semibold text-green-600">Live</span>
                                </div>
                            </div>

                            {/* Progress steps */}
                            <div className="relative flex items-center justify-between mb-6">
                                {['Placed', 'Preparing', 'On Way', 'Delivered'].map((step, i) => (
                                    <div key={step} className="relative flex flex-col items-center gap-1.5 z-10">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                            i < 3
                                                ? 'bg-quicky-yellow border-quicky-yellow text-black'
                                                : 'bg-white border-gray-200 text-gray-400'
                                        }`}>
                                            {i < 3 ? '✓' : i + 1}
                                        </div>
                                        <span className={`text-[10px] font-medium ${i < 3 ? 'text-gray-700' : 'text-gray-400'}`}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                                {/* Connector line */}
                                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 -z-0">
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: '66%' }}
                                        transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                                        className="h-full bg-quicky-yellow"
                                    />
                                </div>
                            </div>

                            {/* ETA */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm font-medium">Arriving in</span>
                                    </div>
                                    <span className="text-2xl font-black text-gray-900">8 min</span>
                                </div>
                            </div>

                            {/* Rider */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-12 w-12 bg-gradient-to-br from-quicky-yellow to-amber-500 rounded-2xl flex items-center justify-center shrink-0">
                                    <span className="text-lg font-black text-black">R</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 text-sm">Raj Kumar</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs text-gray-500">4.9 · Delivery partner</span>
                                    </div>
                                </div>
                                <button className="shrink-0 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100 transition-colors">
                                    Call
                                </button>
                            </div>

                            {/* Order summary */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">#QK-2025-1847</p>
                                    <p className="text-xs text-gray-500 mt-0.5">2 items · Rs. 485</p>
                                </div>
                                {canRegister && !auth?.user && (
                                    <Link href="/register">
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            className="flex items-center gap-1.5 text-xs font-bold text-black bg-quicky-yellow px-4 py-2 rounded-xl hover:bg-quicky-yellow-dark transition-colors"
                                        >
                                            Order now
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </motion.button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

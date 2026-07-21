import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useCategories } from '@/hooks/useData';

export default function Categories() {
    const [active, setActive] = useState<string | null>(null);
    const { data: categories } = useCategories();

    return (
        <section className="py-10 sm:py-14 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        What are you looking for?
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        Browse by category and get it delivered fast
                    </p>
                </div>

                {/* Scrollable on mobile, wrapping grid on desktop */}
                <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 scrollbar-hide">
                    {categories.map((cat, i) => {
                        const Icon = cat.icon;
                        const isActive = active === cat.id;

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <Link
                                    href={cat.href}
                                    onClick={() => setActive(cat.id)}
                                    className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border-2 shrink-0 min-w-[80px] sm:min-w-[96px] transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'border-quicky-yellow bg-quicky-yellow/10'
                                            : 'border-gray-100 bg-gray-50 hover:border-quicky-yellow/50 hover:bg-quicky-yellow/5'
                                    }`}
                                >
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                                        isActive ? 'bg-quicky-yellow' : 'bg-white shadow-sm'
                                    }`}>
                                        <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-gray-700'}`} />
                                    </div>
                                    <span className={`text-xs font-semibold text-center leading-tight ${
                                        isActive ? 'text-black' : 'text-gray-600'
                                    }`}>
                                        {cat.label}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

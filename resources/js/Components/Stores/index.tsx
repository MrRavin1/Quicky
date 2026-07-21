import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useStores } from '@/hooks/useData';

export default function Stores() {
    const { data: stores } = useStores();
    return (
        <section className="py-10 sm:py-14 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                            Popular Stores
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Trusted local shops, fast delivery
                        </p>
                    </div>
                    <Link
                        href="/stores"
                        className="flex items-center gap-1 text-sm font-semibold text-black hover:text-quicky-yellow-dark transition-colors shrink-0 ml-4"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Horizontal scroll mobile, grid tablet+ */}
                <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:overflow-visible sm:pb-0 scrollbar-hide">
                    {stores.map((store, i) => (
                        <motion.div
                            key={store.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.07, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-4 cursor-pointer transition-all duration-300 shrink-0 w-44 sm:w-auto text-center"
                        >
                            {/* Store image placeholder */}
                            <div className="h-16 sm:h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-3 flex items-center justify-center text-3xl">
                                🏪
                            </div>

                            <h3 className="font-bold text-gray-900 text-sm truncate">{store.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{store.category}</p>

                            {(store.rating || store.deliveryTime) && (
                                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
                                    {store.rating && (
                                        <div className="flex items-center gap-0.5">
                                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                            <span className="font-medium">{store.rating}</span>
                                        </div>
                                    )}
                                    {store.rating && store.deliveryTime && (
                                        <span className="text-gray-300">·</span>
                                    )}
                                    {store.deliveryTime && (
                                        <div className="flex items-center gap-0.5">
                                            <Clock className="h-3 w-3" />
                                            <span>{store.deliveryTime}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useRestaurants } from '@/hooks/useData';

export default function Restaurants() {
    const { data: restaurants } = useRestaurants();
    return (
        <section className="py-10 sm:py-14 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                            Popular Restaurants
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Order from your favourites
                        </p>
                    </div>
                    <Link
                        href="/restaurants"
                        className="flex items-center gap-1 text-sm font-semibold text-black hover:text-quicky-yellow-dark transition-colors shrink-0 ml-4"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Horizontal scroll mobile, grid tablet+ */}
                <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0 scrollbar-hide">
                    {restaurants.map((r, i) => (
                        <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.07, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden cursor-pointer transition-all duration-300 shrink-0 w-64 sm:w-auto"
                        >
                            {/* Image placeholder */}
                            <div className="h-40 sm:h-44 bg-gradient-to-br from-orange-100 to-red-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                {r.offer && (
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                                        {r.offer}
                                    </span>
                                )}
                                {/* Placeholder emoji */}
                                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
                                    🍽️
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                                        {r.name}
                                    </h3>
                                    <div className="flex items-center gap-0.5 shrink-0">
                                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs font-semibold text-gray-700">{r.rating}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 mt-1 mb-3">{r.category}</p>

                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{r.deliveryTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>{r.distance}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

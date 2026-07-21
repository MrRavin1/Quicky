import { motion } from 'framer-motion';
import { usePromotions } from '@/hooks/useData';

export default function Promotions() {
    const { data: promotions } = usePromotions();
    return (
        <section className="py-10 sm:py-14 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                            Special Offers
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Exclusive deals, only on Quicky
                        </p>
                    </div>
                    <a
                        href="/offers"
                        className="text-sm font-semibold text-black hover:text-quicky-yellow-dark transition-colors shrink-0 ml-4"
                    >
                        See all →
                    </a>
                </div>

                {/* Horizontal scroll on mobile, grid on md+ */}
                <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 scrollbar-hide">
                    {promotions.map((promo, i) => (
                        <motion.div
                            key={promo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className={`${promo.color} relative rounded-2xl p-6 text-white cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 shrink-0 w-64 md:w-auto`}
                        >
                            {/* Decorative circle */}
                            <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
                            <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />

                            <div className="relative z-10">
                                <p className="text-3xl sm:text-4xl font-black leading-none">{promo.title}</p>
                                <p className="mt-1 text-base font-semibold opacity-90">{promo.subtitle}</p>
                                {promo.description && (
                                    <p className="mt-2 text-xs opacity-80 leading-relaxed">{promo.description}</p>
                                )}
                                {promo.code && (
                                    <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                        <span className="text-xs font-mono font-bold tracking-wider">
                                            {promo.code}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

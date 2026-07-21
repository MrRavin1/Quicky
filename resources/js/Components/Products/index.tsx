import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useProducts } from '@/hooks/useData';
import { useCart } from '@/context/CartContext';

export default function Products() {
    const { data: products } = useProducts({ featured: true });
    const { addItem, removeItem, getItemQty } = useCart();

    return (
        <section className="py-10 sm:py-14 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                            Featured Products
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">Handpicked for you</p>
                    </div>
                    <Link
                        href="/products"
                        className="flex items-center gap-1 text-sm font-semibold text-black hover:text-quicky-yellow-dark transition-colors shrink-0 ml-4"
                    >
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Horizontal scroll mobile, grid tablet+ */}
                <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0 scrollbar-hide">
                    {products.map((product, i) => {
                        const qty = getItemQty(product.id);

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.07, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden cursor-pointer transition-all duration-300 shrink-0 w-52 sm:w-auto flex flex-col"
                            >
                                {/* Product image */}
                                <div className="h-40 sm:h-44 bg-gradient-to-br from-purple-50 to-pink-100 relative overflow-hidden flex items-center justify-center text-5xl">
                                    🛍️
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                                        {product.name}
                                    </h3>
                                    {product.restaurant && (
                                        <p className="text-xs text-gray-500 mt-0.5">from {product.restaurant}</p>
                                    )}

                                    <div className="flex items-center justify-between mt-3 mb-4">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-base font-black text-gray-900">{product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                                            )}
                                        </div>
                                        {product.rating && (
                                            <div className="flex items-center gap-0.5">
                                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-semibold text-gray-600">{product.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Add / quantity control — shared across desktop and mobile */}
                                    <div className="mt-auto">
                                        <AnimatePresence mode="wait">
                                            {qty === 0 ? (
                                                <motion.button
                                                    key="add"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() => addItem({
                                                        id: product.id,
                                                        name: product.name,
                                                        price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
                                                        image: product.image,
                                                        storeId: product.restaurant ?? 'general',
                                                        storeName: product.restaurant ?? 'Quicky Store',
                                                    })}
                                                    className="w-full flex items-center justify-center gap-1.5 bg-quicky-yellow hover:bg-quicky-yellow-dark text-black text-sm font-bold py-2.5 rounded-xl transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add to Cart
                                                </motion.button>
                                            ) : (
                                                <motion.div
                                                    key="qty"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="flex items-center justify-between bg-quicky-yellow rounded-xl overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => removeItem(product.id)}
                                                        className="px-3 py-2.5 hover:bg-quicky-yellow-dark transition-colors"
                                                    >
                                                        <Minus className="h-4 w-4 text-black" />
                                                    </button>
                                                    <span className="font-black text-black text-sm">{qty}</span>
                                                    <button
                                                        onClick={() => addItem({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
                                                            image: product.image,
                                                            storeId: product.restaurant ?? 'general',
                                                            storeName: product.restaurant ?? 'Quicky Store',
                                                        })}
                                                        className="px-3 py-2.5 hover:bg-quicky-yellow-dark transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4 text-black" />
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

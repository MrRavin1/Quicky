import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: 'Raj Sharma',
        rating: 5,
        comment: 'Super fast delivery! Got my groceries in 15 minutes. Amazing service and fresh products.',
        location: 'Kathmandu',
        color: 'from-blue-400 to-indigo-500',
    },
    {
        id: 2,
        name: 'Sita Poudel',
        rating: 5,
        comment: 'Best delivery app in Nepal. Restaurants are great and delivery is always on time.',
        location: 'Lalitpur',
        color: 'from-pink-400 to-rose-500',
    },
    {
        id: 3,
        name: 'Ram Thapa',
        rating: 4,
        comment: 'Love the medicine delivery feature. So convenient, especially during emergencies.',
        location: 'Bhaktapur',
        color: 'from-green-400 to-teal-500',
    },
];

export default function Reviews() {
    return (
        <section className="py-10 sm:py-14 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        What customers say
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Real reviews from real people across Nepal
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative"
                        >
                            {/* Quote icon */}
                            <Quote className="absolute top-5 right-5 h-7 w-7 text-gray-100" />

                            {/* Reviewer */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-base shrink-0`}>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                                    <p className="text-xs text-gray-500">{review.location}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star
                                        key={j}
                                        className={`h-3.5 w-3.5 ${
                                            j < review.rating
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-gray-200 fill-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed">
                                "{review.comment}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

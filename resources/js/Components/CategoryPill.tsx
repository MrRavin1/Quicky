import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
    icon: React.ReactNode;
    title: string;
    href?: string;
    active?: boolean;
}

const MotionLink = motion(Link);

export default function CategoryPill({ icon, title, href = '#', active = false }: Props) {
    return (
        <MotionLink
            href={href}
            aria-label={`Browse ${title}`}
            className={`flex items-center gap-2.5 lg:gap-3 px-5 border rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-quicky-yellow focus-visible:ring-offset-2 select-none shrink-0
                ${active 
                    ? 'border-quicky-yellow bg-quicky-yellow/10 font-semibold' 
                    : 'border-[#EAEAEA] bg-white hover:border-quicky-yellow'
                }
                h-[48px] lg:h-[56px]
                shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]
            `}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <div className="flex items-center justify-center shrink-0 w-6 h-6 lg:w-8 lg:h-8">
                {icon}
            </div>
            <span className="font-sans font-medium text-[#222222] text-sm lg:text-base whitespace-nowrap">
                {title}
            </span>
        </MotionLink>
    );
}

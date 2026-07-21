/**
 * useBreakpoint
 *
 * Returns the current Tailwind-equivalent breakpoint.
 * Single source of truth for responsive logic in JS.
 * Use Tailwind classes for pure CSS — use this only when
 * JS behaviour differs by viewport (e.g. number of items shown).
 */

import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
    xs:  0,
    sm:  640,
    md:  768,
    lg:  1024,
    xl:  1280,
    '2xl': 1536,
};

function getBreakpoint(width: number): Breakpoint {
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768)  return 'md';
    if (width >= 640)  return 'sm';
    return 'xs';
}

export function useBreakpoint() {
    const [bp, setBp] = useState<Breakpoint>(() =>
        typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'lg'
    );

    useEffect(() => {
        const handler = () => setBp(getBreakpoint(window.innerWidth));
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return {
        breakpoint: bp,
        isMobile:  bp === 'xs' || bp === 'sm',
        isTablet:  bp === 'md',
        isDesktop: bp === 'lg' || bp === 'xl' || bp === '2xl',
        isTouch:   bp === 'xs' || bp === 'sm' || bp === 'md',
        width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    };
}

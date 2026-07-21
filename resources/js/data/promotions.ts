export interface Promotion {
    id: string;
    title: string;
    subtitle: string;
    description?: string;
    color: string;
    code?: string;
}

export const promotions: Promotion[] = [
    {
        id: '1',
        title: '50% OFF',
        subtitle: 'First Order',
        description: 'Get 50% off on your first order above ₹199',
        color: 'bg-red-500',
        code: 'FIRST50'
    },
    {
        id: '2',
        title: 'Free Delivery',
        subtitle: 'Orders above ₹299',
        description: 'No delivery charges on orders above ₹299',
        color: 'bg-green-500',
        code: 'FREEDEL'
    },
    {
        id: '3',
        title: 'Cashback',
        subtitle: 'Up to ₹100',
        description: 'Get up to ₹100 cashback on orders above ₹500',
        color: 'bg-blue-500',
        code: 'CASH100'
    },
    {
        id: '4',
        title: 'Weekend Special',
        subtitle: '30% OFF',
        description: 'Weekend special discount on all restaurants',
        color: 'bg-purple-500',
        code: 'WEEKEND30'
    }
];

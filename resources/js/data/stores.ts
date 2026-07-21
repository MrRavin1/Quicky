export interface Store {
    id: string;
    name: string;
    category: string;
    rating?: number;
    deliveryTime?: string;
    image?: string;
}

export const stores: Store[] = [
    {
        id: '1',
        name: 'Big Mart',
        category: 'Groceries',
        rating: 4.3,
        deliveryTime: '15-20 min'
    },
    {
        id: '2',
        name: 'Med Plus',
        category: 'Pharmacy',
        rating: 4.5,
        deliveryTime: '10-15 min'
    },
    {
        id: '3',
        name: 'Beauty Store',
        category: 'Cosmetics',
        rating: 4.2,
        deliveryTime: '20-25 min'
    },
    {
        id: '4',
        name: 'Pet World',
        category: 'Pet Supplies',
        rating: 4.4,
        deliveryTime: '25-30 min'
    },
    {
        id: '5',
        name: 'Electronics Hub',
        category: 'Electronics',
        rating: 4.1,
        deliveryTime: '30-40 min'
    },
    {
        id: '6',
        name: 'Flower Shop',
        category: 'Flowers',
        rating: 4.6,
        deliveryTime: '45-60 min'
    }
];

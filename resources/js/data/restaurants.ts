export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    deliveryTime: string;
    distance: string;
    offer?: string;
    image?: string;
    category: string;
}

export const restaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Pizza Palace',
        rating: 4.2,
        deliveryTime: '25-30 min',
        distance: '1.2 km',
        offer: '20% OFF',
        category: 'Italian'
    },
    {
        id: '2',
        name: 'Burger King',
        rating: 4.5,
        deliveryTime: '20-25 min',
        distance: '0.8 km',
        offer: 'Free Delivery',
        category: 'Fast Food'
    },
    {
        id: '3',
        name: 'KFC',
        rating: 4.3,
        deliveryTime: '30-35 min',
        distance: '2.1 km',
        offer: '₹50 OFF',
        category: 'Fast Food'
    },
    {
        id: '4',
        name: 'Subway',
        rating: 4.1,
        deliveryTime: '15-20 min',
        distance: '0.5 km',
        offer: 'Buy 1 Get 1',
        category: 'Healthy'
    },
    {
        id: '5',
        name: 'Dominos',
        rating: 4.4,
        deliveryTime: '25-30 min',
        distance: '1.8 km',
        offer: '30% OFF',
        category: 'Pizza'
    },
    {
        id: '6',
        name: 'Taco Bell',
        rating: 4.0,
        deliveryTime: '35-40 min',
        distance: '3.2 km',
        category: 'Mexican'
    }
];

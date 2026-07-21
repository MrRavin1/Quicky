export interface Product {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    category: string;
    restaurant?: string;
    image?: string;
    rating?: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Margherita Pizza',
        price: '₹299',
        originalPrice: '₹399',
        category: 'Food',
        restaurant: 'Pizza Palace',
        rating: 4.5
    },
    {
        id: '2',
        name: 'Paracetamol',
        price: '₹25',
        originalPrice: '₹35',
        category: 'Medicine',
        restaurant: 'Med Plus'
    },
    {
        id: '3',
        name: 'Fresh Milk 1L',
        price: '₹65',
        originalPrice: '₹75',
        category: 'Groceries',
        restaurant: 'Big Mart'
    },
    {
        id: '4',
        name: 'Chicken Burger',
        price: '₹179',
        originalPrice: '₹219',
        category: 'Food',
        restaurant: 'Burger King',
        rating: 4.3
    },
    {
        id: '5',
        name: 'Red Lipstick',
        price: '₹899',
        originalPrice: '₹1299',
        category: 'Beauty',
        restaurant: 'Beauty Store'
    },
    {
        id: '6',
        name: 'Dog Food 2kg',
        price: '₹450',
        originalPrice: '₹520',
        category: 'Pet',
        restaurant: 'Pet World'
    }
];

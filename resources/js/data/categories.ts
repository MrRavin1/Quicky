import { 
    FoodIcon,
    GroceryIcon,
    CigarettesIcon,
    CosmeticsIcon,
    PharmacyIcon,
    AlcoholIcon,
    DrinksIcon,
    ParcelIcon,
    PetCareIcon,
    FlowersIcon,
    ElectronicsIcon,
    SnacksIcon,
    ExpressIcon
} from '@/Components/CategoryIcons';

export interface Category {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    href: string;
}

export const categories: Category[] = [
    { id: 'food', label: 'Food', icon: FoodIcon, href: '#food' },
    { id: 'groceries', label: 'Grocery', icon: GroceryIcon, href: '#grocery' },
    { id: 'cigarettes', label: 'Cigarettes', icon: CigarettesIcon, href: '#cigarettes' },
    { id: 'cosmetics', label: 'Cosmetics', icon: CosmeticsIcon, href: '#cosmetics' },
    { id: 'pharmacy', label: 'Pharmacy', icon: PharmacyIcon, href: '#pharmacy' },
    { id: 'alcohol', label: 'Alcohol (18+)', icon: AlcoholIcon, href: '#alcohol' },
    { id: 'drinks', label: 'Drinks', icon: DrinksIcon, href: '#drinks' },
    { id: 'parcel', label: 'Parcel', icon: ParcelIcon, href: '#parcel' },
    { id: 'pet', label: 'Pet Care', icon: PetCareIcon, href: '#pet-care' },
    { id: 'flowers', label: 'Flowers', icon: FlowersIcon, href: '#flowers' },
    { id: 'electronics', label: 'Electronics', icon: ElectronicsIcon, href: '#electronics' },
    { id: 'snacks', label: 'Snacks', icon: SnacksIcon, href: '#snacks' },
    { id: 'express', label: 'Express', icon: ExpressIcon, href: '#express' },
];

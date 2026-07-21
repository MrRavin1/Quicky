/**
 * Data hooks — single source of truth for all listing data.
 *
 * Currently backed by static data files.
 * To switch to live API: replace the return value with an axios/fetch call.
 * Desktop and mobile share the exact same data — only presentation differs.
 *
 * Example API migration (when ready):
 *   const [data, setData] = useState([]);
 *   useEffect(() => { axios.get('/api/v1/restaurants').then(r => setData(r.data)); }, []);
 */

import { restaurants as staticRestaurants, Restaurant } from '@/data/restaurants';
import { stores as staticStores, Store } from '@/data/stores';
import { products as staticProducts, Product } from '@/data/products';
import { promotions as staticPromotions, Promotion } from '@/data/promotions';
import { categories as staticCategories, Category } from '@/data/categories';

export function useRestaurants(): { data: Restaurant[]; loading: boolean } {
    // TODO: replace with API call: GET /api/v1/stores?type=food
    return { data: staticRestaurants, loading: false };
}

export function useStores(): { data: Store[]; loading: boolean } {
    // TODO: replace with API call: GET /api/v1/stores
    return { data: staticStores, loading: false };
}

export function useProducts(params?: { featured?: boolean; storeId?: string }): { data: Product[]; loading: boolean } {
    // TODO: replace with API call: GET /api/v1/products/featured
    return { data: staticProducts, loading: false };
}

export function usePromotions(): { data: Promotion[]; loading: boolean } {
    // TODO: replace with API call: GET /api/v1/promotions
    return { data: staticPromotions, loading: false };
}

export function useCategories(): { data: Category[]; loading: boolean } {
    // TODO: replace with API call: GET /api/v1/categories
    return { data: staticCategories, loading: false };
}

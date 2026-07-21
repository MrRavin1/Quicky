/**
 * CartContext
 *
 * Single shared cart state for the entire app — desktop and mobile.
 * All add/remove/update operations go through here.
 * Persisted to localStorage so cart survives page reloads.
 * Future: sync with /api/v1/cart when user is logged in.
 */

import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

export interface CartItem {
    id: string;          // product id
    name: string;
    price: number;       // unit price in Rs.
    quantity: number;
    image?: string;
    storeId: string;
    storeName: string;
}

interface CartState {
    items: CartItem[];
    storeId: string | null;   // cart is locked to one store at a time
    storeName: string | null;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'UPDATE_QTY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD'; payload: CartState };

const initial: CartState = { items: [], storeId: null, storeName: null };

function reducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'LOAD':
            return action.payload;

        case 'ADD_ITEM': {
            const { payload: item } = action;

            // If adding from a different store, replace cart
            if (state.storeId && state.storeId !== item.storeId) {
                return {
                    items: [{ ...item, quantity: 1 }],
                    storeId: item.storeId,
                    storeName: item.storeName,
                };
            }

            const existing = state.items.find(i => i.id === item.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }

            return {
                ...state,
                storeId: item.storeId,
                storeName: item.storeName,
                items: [...state.items, { ...item, quantity: 1 }],
            };
        }

        case 'REMOVE_ITEM': {
            const items = state.items.filter(i => i.id !== action.payload.id);
            return {
                ...state,
                items,
                storeId: items.length === 0 ? null : state.storeId,
                storeName: items.length === 0 ? null : state.storeName,
            };
        }

        case 'UPDATE_QTY': {
            if (action.payload.quantity <= 0) {
                return reducer(state, { type: 'REMOVE_ITEM', payload: { id: action.payload.id } });
            }
            return {
                ...state,
                items: state.items.map(i =>
                    i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
                ),
            };
        }

        case 'CLEAR_CART':
            return initial;

        default:
            return state;
    }
}

interface CartContextValue {
    items: CartItem[];
    storeId: string | null;
    storeName: string | null;
    totalItems: number;
    totalPrice: number;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQty: (id: string, quantity: number) => void;
    clearCart: () => void;
    getItemQty: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'quicky_cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initial);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
            }
        } catch {}
    }, []);

    // Persist to localStorage on every change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const value: CartContextValue = {
        items: state.items,
        storeId: state.storeId,
        storeName: state.storeName,
        totalItems,
        totalPrice,
        addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
        updateQty: (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        getItemQty: (id) => state.items.find(i => i.id === id)?.quantity ?? 0,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
}

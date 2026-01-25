import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface AuthState {
    user: any | null;
    jwt: string | null;
    setAuth: (user: any, jwt: string) => void;
    logout: () => void;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            jwt: null,
            setAuth: (user, jwt) => set({ user, jwt }),
            logout: () => set({ user: null, jwt: null }),
        }),
        {
            name: 'ak-auth-storage',
        }
    )
);

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const existingItem = get().items.find((i) => i.id === item.id);
                if (existingItem) {
                    set({
                        items: get().items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, item] });
                }
            },
            removeItem: (id) =>
                set({
                    items: get().items.filter((i) => i.id !== id),
                }),
            updateQuantity: (id, quantity) =>
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
                    ),
                }),
            clearCart: () => set({ items: [] }),
            getTotal: () =>
                get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'ak-cart-storage',
        }
    )
);

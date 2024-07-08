import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { ShoppingCartIcon, X } from "lucide-react";

interface CartItem {
    item: ProductType;
    quantity: number;
    color?: string; // ? means optional
    size?: string; // ? means optional
}

interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (_idToRemove: string) => void;
    increaseQuantity: (_idToIncrease: string) => void;
    decreaseQuantity: (_idToDecrease: string) => void;
    clearCart: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            cartItems: [],
            addItem: (data: CartItem) => {
                const { item, quantity, color, size } = data;
                const currentItems = get().cartItems; // all the items in the cart
                const isExisting = currentItems.find(
                    (cartItem) => cartItem.item._id === item._id
                );
                if (isExisting) {
                    return toast("Item already in cart", {
                        icon: <ShoppingCartIcon />,
                    });
                }

                set({
                    cartItems: [
                        ...currentItems,
                        { item, quantity, color, size },
                    ],
                });
                toast.success("Item added to cart", {
                    icon: <ShoppingCartIcon />,
                });
            },
            removeItem: (_idToRemove: string) => {
                const newCartItems = get().cartItems.filter(
                    (cartItem) => cartItem.item._id !== _idToRemove
                );
                set({ cartItems: newCartItems });
                toast.success("Item removed from cart");
            },
            increaseQuantity: (_idToIncrease: String) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === _idToIncrease
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success("Item quantity increased",)
            },
            decreaseQuantity: (_idToDecrease: String) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === _idToDecrease
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success("Item quantity decreased", { icon: <X /> })
            },
            clearCart: () => set({ cartItems: [] }),
        }),

        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
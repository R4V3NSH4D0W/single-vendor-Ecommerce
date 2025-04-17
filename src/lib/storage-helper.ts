import { CartItem } from "@/features/cart/state/cart-slice";

export const loadCartFromStorage = () => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (err) {
    console.error("Failed to load cart:", err);
    return [];
  }
};

export const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
};

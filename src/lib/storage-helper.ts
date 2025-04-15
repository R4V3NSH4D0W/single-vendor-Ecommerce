import { CartItem } from "@/features/cart/state/cart-slice";

export const loadCartFromStorage = () => {
    try {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    } catch (err) {
      console.error("Failed to load cart:", err);
      return [];
    }
  };
  
  export const saveCartToStorage = (items:CartItem[] ) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  };
  
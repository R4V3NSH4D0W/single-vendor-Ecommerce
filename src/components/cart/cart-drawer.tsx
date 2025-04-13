"use client";
import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CartItem from "./cart-item";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialCartItems = [
  {
    id: 1,
    name: "Minimalist Leather Wallet",
    price: 79.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=100",
    options: { color: "Brown", size: "" },
  },
  {
    id: 2,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=100",
    options: { size: "M", color: "White" },
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: 24.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=100",
    options: { color: "Beige", size: "" },
  },
];

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart ({cartItems.length})
            </SheetTitle>
          </div>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="border-t pt-4 space-y-4 p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full py-6" asChild>
                <a href="/checkout">Proceed to Checkout</a>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <Button asChild>
              <a href="/products">Start Shopping</a>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

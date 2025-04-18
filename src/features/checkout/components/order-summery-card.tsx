"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function OrderSummeryCard() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const shippingCost = useAppSelector((state) => state.cart.shipping);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = shippingCost;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <Card className="w-full lg:w-[35%] min-h-[300px] h-auto">
      <CardHeader>
        <CardTitle>
          <p className=" text-2xl">Order Summery</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasMounted &&
          cartItems?.map((cartItem) => (
            <div key={cartItem.id} className="flex flex-row gap-2">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={cartItem?.image}
                  alt={cartItem?.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div className="flex flex-row justify-between gap-4">
                  <h1 className="text-sm">{cartItem.name}</h1>
                  <label>${cartItem.price}</label>
                </div>
                <label className="text-xs text-muted-foreground">
                  Qty: {cartItem.quantity}
                </label>
                <label className="text-xs text-muted-foreground">
                  Color: {cartItem.color}
                </label>
                {cartItem.size && (
                  <label className="text-xs text-muted-foreground">
                    Size: {cartItem.size}
                  </label>
                )}
              </div>
            </div>
          ))}

        <div className="border-t pt-4 space-y-4">
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
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummeryCard;

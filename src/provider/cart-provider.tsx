"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchCart } from "@/features/cart/state/cart-slice";
import { useCurrent } from "@/features/auth/api/use-current";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: user } = useCurrent();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  return <>{children}</>;
}

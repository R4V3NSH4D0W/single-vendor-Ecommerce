import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/state/cart-slice";
import checkoutReducer from "@/features/checkout/state/checkoutSlice"



export const store = configureStore({
  reducer: {
    cart:cartReducer,
    checkout:checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

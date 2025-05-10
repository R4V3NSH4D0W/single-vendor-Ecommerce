import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/state/cart-slice";
import checkoutReducer from "@/features/checkout/state/checkoutSlice"
import registerReducer from "@/features/auth/state/register-slice";


export const store = configureStore({
  reducer: {
    cart:cartReducer,
    checkout:checkoutReducer,
    register:registerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

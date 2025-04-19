/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { CartItem, CartResponse } from "../type";

type CartState = {
  items: CartItem[];
  shipping: number;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: CartState = {
  items: [],
  shipping: 10,
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await client.api.cart.$get();
  if (!res.ok) throw new Error("Failed to fetch cart");
  const data: CartResponse = await res.json();
  
  return data.items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    ...item.product,
    id: item.id
  }));
});


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
      payload: {
        productId: string;
        quantity: number;
        size?: string;
        color?: string;
      },
      { rejectWithValue, dispatch }
    ) => {
      try {
        const res = await client.api.auth.current.$get();
        const user = await res.json();
        if (!user || !user.data?.id) {
          return rejectWithValue("You must be logged in to add items to cart");
        }
  
        const postRes = await client.api.cart.$post({ json: payload });
        if (!postRes.ok) {
          return rejectWithValue("Failed to add to cart");
        }
  
        await dispatch(fetchCart());
        return;
      } catch (error) {
        return rejectWithValue("Something went wrong while adding to cart");
      }
    }
  );

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await client.api.cart.$delete({ json: { cartItemId } });
      if (!res.ok) return rejectWithValue("Failed to remove from cart");
      
      await dispatch(fetchCart());
      return;
    } catch (error) {
      return rejectWithValue("Failed to remove from cart");
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    payload: { id: string; quantity: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await client.api.cart.$put({ 
        json: { cartItemId: payload.id, quantity: payload.quantity } 
      });
      if (!res.ok) return rejectWithValue("Failed to update quantity");
      
      await dispatch(fetchCart());
      return;
    } catch (error) {
      return rejectWithValue("Failed to update quantity");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      toast.success("Cart cleared");
    },
    setShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToCart.fulfilled, () => {
        toast.success("Item added to cart");
      })
      .addCase(removeFromCart.fulfilled, () => {
        toast.success("Item removed from cart");
      })
      .addCase(updateQuantity.fulfilled, () => {
        toast.success("Quantity updated");
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          toast.error(action.payload || "Operation failed");
        }
      );
  },
});

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { clearCart, setShipping } = cartSlice.actions;
export default cartSlice.reducer;
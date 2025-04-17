import { loadCartFromStorage, saveCartToStorage } from "@/lib/storage-helper";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
export type CartItem = {
    id:string;
    name:string;
    size?:string;
    color:string;
    price:number;
    image:string;
    quantity:number;
    description:string;
}

type CartState={
    items:CartItem[];
}


const initialState: CartState = {
    items: loadCartFromStorage(),
  };
const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state, action:PayloadAction<CartItem>)=>{
            const items= action.payload;
            const existingItem= state.items.find((item)=> item.id=== items.id);
            if(existingItem){
                existingItem.quantity += items.quantity;
                toast.success("Item quantity updated");
            }else{
                state.items.push(items);
                toast.success("Item added to cart");
            }
            saveCartToStorage(state.items);
        },
        removeFromCart:(state, action:PayloadAction<string>)=>{
            state.items= state.items.filter((item)=> item.id !== action.payload);
            saveCartToStorage(state.items);
            toast.success("Item removed from cart");
    },
    clearCart:(state)=>{
        state.items= [];
        saveCartToStorage(state.items);
    },
    updateQuantity:(state, action:PayloadAction<{id:string; quantity:number}>)=>{
        const { id, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity = quantity;   
        }
        saveCartToStorage(state.items);  
    },

},
});

export const selectTotalItems = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);
 

export const { addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Step = "initial"|"shipping" | "payment" | "confirmation" ;

interface ShippingInfo {
  firstName: string;
  lastName:string;
  email:string;
  phone:string;
  address: string;
  city: string;
  state: string;
  zipCode:string,
  country: string;
}

interface ShippingMethod {
  id: number;
  name: string;
  duration: string;
  cost: number;
}


interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
}

interface CheckoutState {
  currentStep: Step;
  shippingInfo: ShippingInfo | null;
  paymentInfo: PaymentInfo | null;
  shippingMethod: ShippingMethod | null;
}

const initialState: CheckoutState = {
  currentStep: "initial",
  shippingInfo: null,
  paymentInfo: null,
  shippingMethod: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Step>) {
      state.currentStep = action.payload;
    },
    setShippingInfo(state, action: PayloadAction<ShippingInfo>) {
      state.shippingInfo = action.payload;
    },
    setPaymentInfo(state, action: PayloadAction<PaymentInfo>) {
      state.paymentInfo = action.payload;
    },
    setShippingMethod(state, action: PayloadAction<ShippingMethod>) {
      state.shippingMethod = action.payload;
    }
  },
});

export const { setStep, setShippingInfo, setPaymentInfo,setShippingMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;

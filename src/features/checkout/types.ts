
export type Step = "initial" | "shipping" | "payment" | "confirmation";

export interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
 export  interface ShippingMethod {
    id: number;
    name: string;
    duration: string;
    cost: number;
  }
  
 export  interface PaymentInfo {
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    nameOnCard?: string;
  }
  
 export interface CheckoutState {
    currentStep: Step;
    shippingInfo: ShippingInfo | null;
    paymentInfo: PaymentInfo | null;
    shippingMethod: ShippingMethod | null;
    paymentMethod: 'card' | 'cod' | null;
  }
  
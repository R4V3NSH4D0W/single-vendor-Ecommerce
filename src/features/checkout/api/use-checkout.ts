import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  PaymentInformationFormValues,
  ShippingInformationFormValues
} from "../schema";
import { ShippingMethod } from "../types";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/features/cart/state/cart-slice";
import { setStep } from "../state/checkoutSlice";

interface useCheckoutProps {
  paymentInfo: Partial<PaymentInformationFormValues>; 
  paymentMethod: "cod" | "card";
  shippingMethod: ShippingMethod;
  shippingInfo: ShippingInformationFormValues;
}

export const UseCheckout = () => {
const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async ({
      paymentInfo,
      paymentMethod,
      shippingInfo,
      shippingMethod,
    }: useCheckoutProps) => {
      const payload = {
        shippingInfo,
        shippingMethod,
        paymentInfo: {
          ...paymentInfo,
          paymentMethod,
        },
      };

      const response = await client.api.checkout.$post({ json: payload });

      if (!response.ok) {
        throw new Error("Failed to checkout");
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("Order placed successfully!");
      dispatch(setStep("placedSuccessfully"))
      dispatch(clearCart())
   
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

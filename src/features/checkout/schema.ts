import { z } from "zod";

export const shippingInformationSchema = z.object({
    firstName:z.string().trim().min(1, "Required"),
    lastName:z.string().trim().min(1, "Required"),
    email:z.string().email(),
    phone:z.string(),
    address:z.string(),
    city:z.string(),
    zipCode:z.string(),
    country:z.string(),
    state:z.string()
});

export const paymentInformationSchema = z.object({
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  expirationDate: z.string(),
  cvv: z.string().length(3, "CVV must be 3 digits"),
  nameOnCard: z.string().trim().min(1, "Name on card is required"),
});

export const confirmationInformationSchema = z.object({
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

export type ShippingInformationFormValues = z.infer<typeof shippingInformationSchema>;
export type PaymentInformationFormValues = z.infer<typeof paymentInformationSchema>;
export type confirmationInformationSchemaFormValues = z.infer<typeof confirmationInformationSchema>;


import { z } from "zod";

export const shippingInformationSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  lastName: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  state: z.string()
});

export const paymentInformationSchema = z.object({
  paymentMethod: z.enum(['card', 'cod']),
  cardNumber: z.string().optional(),
  expirationDate: z.string().optional(),
  cvv: z.string().optional(),
  nameOnCard: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber || data.cardNumber.length !== 16) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Card number must be 16 digits",
        path: ['cardNumber']
      });
    }

    if (!data.expirationDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expirationDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid expiry format (MM/YY)",
        path: ['expirationDate']
      });
    } else {
  
      const [monthStr, yearStr] = data.expirationDate.split('/');
      const expMonth = parseInt(monthStr, 10);
      const expYear = parseInt(`20${yearStr}`, 10); 

      const now = new Date();
      const currentMonth = now.getMonth() + 1; 
      const currentYear = now.getFullYear();

      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card has expired",
          path: ['expirationDate']
        });
      }
    }

    if (!data.cvv || data.cvv.length !== 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVV must be 3 digits",
        path: ['cvv']
      });
    }

    if (!data.nameOnCard || data.nameOnCard.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name on card is required",
        path: ['nameOnCard']
      });
    }
  }
});

export const confirmationInformationSchema = z.object({
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

export type ShippingInformationFormValues = z.infer<typeof shippingInformationSchema>;
export type PaymentInformationFormValues = z.infer<typeof paymentInformationSchema>;
export type ConfirmationInformationSchemaFormValues = z.infer<typeof confirmationInformationSchema>;
import { z } from 'zod';

export const addressSchema = z.object({
  label: z.string().optional(),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().optional(),      
});

export type AddressInformationFromSchema = z.infer<typeof addressSchema>;
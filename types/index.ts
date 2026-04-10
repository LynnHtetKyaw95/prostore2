import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  paymentMethodSchema,
} from "@/lib/zodValidator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type SignInInput = z.infer<typeof signInFormSchema> & {
  callbackUrl?: string;
};

export type SignUpInput = z.infer<typeof signUpFormSchema> & {
  callbackUrl?: string;
};

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

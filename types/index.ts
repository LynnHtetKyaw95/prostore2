import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  paymentMethodSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
} from "@/lib/zodValidator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};

export type Cart = z.infer<typeof insertCartSchema> & {
  id: string;
  createdAt: Date;
  items: CartItem[];
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type SignInInput = z.infer<typeof signInFormSchema> & {
  callbackUrl?: string;
};

export type SignUpInput = z.infer<typeof signUpFormSchema> & {
  callbackUrl?: string;
};

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export type OrderItem = z.infer<typeof insertOrderItemSchema>;

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};

export type PaymentResult = z.infer<typeof paymentResultSchema>;

export type SalesDataType = {
  month: string;
  totalSales: number;
}[];

// export type UpdateProduct = z.infer<typeof updateProductSchema>;

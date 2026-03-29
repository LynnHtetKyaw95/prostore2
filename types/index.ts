import { z } from "zod";
import { insertProductSchema } from "@/lib/zodValidator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};

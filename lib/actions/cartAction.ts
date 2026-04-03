"use server";

import { cookies } from "next/headers";

import { CartItem } from "@/types";
import { convertToPlainObject, formatErrors } from "../utils";
import { getUserId } from "./userAction";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../zodValidator";

export async function getSessionCartId() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) {
    throw new Error("Cart session not found");
  }

  return sessionCartId;
}

export async function addItemToCart(data: CartItem) {
  try {
    const [userId, sessionCartId] = await Promise.all([
      getUserId(),
      getSessionCartId(),
    ]);

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    // TESTING
    console.log({
      "Session Cart ID": sessionCartId,
      "User ID": userId,
      "Item Requested": item,
      "Product Found": product,
    });

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

export async function getMyCart() {
  const [userId, sessionCartId] = await Promise.all([
    getUserId(),
    getSessionCartId(),
  ]);

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

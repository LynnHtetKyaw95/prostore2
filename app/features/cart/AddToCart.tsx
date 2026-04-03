"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cartAction";
import { Cart, CartItem } from "@/types";
import { Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();

  async function handleAddToCart() {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    // Handle success add to cart
    toast.success(res.message, {
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart"),
      },
    });
  }

  async function handleRemoveItemFromCart() {
    const res = await removeItemFromCart(item.productId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    return;
  }

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className="mt-4 flex items-center gap-2">
      <Button
        type="button"
        variant={"outline"}
        onClick={handleRemoveItemFromCart}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant={"outline"} onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full mt-4" type="button" onClick={handleAddToCart}>
      <Plus />
      Add To Cart
    </Button>
  );
};
export default AddToCart;

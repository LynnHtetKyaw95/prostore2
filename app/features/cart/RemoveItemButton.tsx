"use client";

import { Button } from "@/components/ui/button";
import { removeItemFromCart } from "@/lib/actions/cartAction";
import { CartItem } from "@/types";
import { Loader, Minus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const RemoveItemButton = ({ item }: { item: CartItem }) => {
  const [isPending, startTransition] = useTransition();

  async function handleRemoveItemFromCart() {
    startTransition(async function () {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      return;
    });
  }

  return (
    <Button
      type="button"
      variant={"outline"}
      onClick={handleRemoveItemFromCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Minus className="w-4 h-4" />
      )}
    </Button>
  );
};
export default RemoveItemButton;

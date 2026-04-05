"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cartAction";
import { CartItem } from "@/types";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddItemButton = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async function () {
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
    });
  }

  return (
    <Button type="button" variant={"outline"} onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
    </Button>
  );
};

export default AddItemButton;

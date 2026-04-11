"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const ShippingButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleGoToShippingPage() {
    startTransition(() => router.push("/shipping-address"));
  }

  return (
    <Button
      className="w-full h-10 mt-4"
      disabled={isPending}
      onClick={handleGoToShippingPage}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <ArrowRight className="w-4 h-4" />
      )}{" "}
      Proceed to check out
    </Button>
  );
};

const SubtotalCard = ({ cart }: { cart: Cart | undefined }) => {
  if (!cart) return null;
  return (
    <Card>
      <CardContent className="p-4 gap-4">
        <div className="pb-3 text-lg flex gap-4">
          Subtotal ({cart.items.reduce((acc, item) => acc + item.qty, 0)})
          <span className="font-semibold">
            {formatCurrency(cart.itemsPrice)}
          </span>
        </div>
        <ShippingButton />
      </CardContent>
    </Card>
  );
};

export default SubtotalCard;

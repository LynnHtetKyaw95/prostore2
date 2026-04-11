"use client";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/orderAction";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const PlaceOrderForm = () => {
  const router = useRouter();

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full mt-4">
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        Place Order
      </Button>
    );
  };

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const res = await createOrder();

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};
export default PlaceOrderForm;

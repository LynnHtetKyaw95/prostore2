"use client";

import { Button } from "@/components/ui/button";
import { updateOrderToDeliveredWithCOD } from "@/lib/actions/orderAction";
import { useTransition } from "react";
import { toast } from "sonner";

const MarkAsDeliveredButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  function handlePaid() {
    startTransition(async () => {
      const res = await updateOrderToDeliveredWithCOD(id);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Button type="button" disabled={isPending} onClick={handlePaid}>
      {isPending ? "Processing..." : "Mark As Delivered"}
    </Button>
  );
};
export default MarkAsDeliveredButton;

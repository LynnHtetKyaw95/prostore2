"use client";

import { Button } from "@/components/ui/button";
import { updateOrderToPaidWithCOD } from "@/lib/actions/orderAction";
import { useTransition } from "react";
import { toast } from "sonner";

const MarkAsPaidButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  function handlePaid() {
    startTransition(async () => {
      const res = await updateOrderToPaidWithCOD(id);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Button type="button" disabled={isPending} onClick={handlePaid}>
      {isPending ? "Processing..." : "Mark As Paid"}
    </Button>
  );
};
export default MarkAsPaidButton;

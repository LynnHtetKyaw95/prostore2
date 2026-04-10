"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { updateUserPaymentMethod } from "@/lib/actions/userAction";
import { useTransition } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { paymentMethodSchema } from "@/lib/zodValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "sonner";
import Heading from "@/components/Heading";
import { ArrowRight, Loader } from "lucide-react";
import RadioField from "@/components/RadioField";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: { type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);

      if (!res.success) {
        toast.error(res.message);

        return;
      }

      router.push("/place-order");
    });
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Heading text="Payment Method" />
      <p className="text-sm text-muted-foreground">
        Please select the payment method
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-4"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FieldGroup>
            <RadioField
              name="type"
              label="Payment Method"
              control={control}
              errors={errors}
              options={PAYMENT_METHODS}
            />
          </FieldGroup>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}{" "}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodForm;

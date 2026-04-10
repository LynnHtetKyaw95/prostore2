"use client";

import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { shippingAddressSchema } from "@/lib/zodValidator";
import { shippingAddressDefaultValues } from "@/lib/constants";
import Heading from "@/components/Heading";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/userAction";
import { toast } from "sonner";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: ShippingAddress) {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast.error(res.message);

        return;
      }

      router.push("/payment-method");
    });
  }

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <Heading text="Shipping Address" />
        <p className="text-sm text-muted-foreground">
          Please enter and address to ship to
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="space-y-4"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FieldGroup>
              <FormField
                name="fullName"
                label="Full Name"
                register={register}
                placeholder="Enter your name"
                errors={errors}
              />
              <FormField
                name="streetAddress"
                label="Street Address"
                register={register}
                placeholder="Enter your street address"
                errors={errors}
              />
              <FormField
                name="city"
                label="City"
                register={register}
                placeholder="Enter your city"
                errors={errors}
              />
              <FormField
                name="postalCode"
                label="Postal Code"
                register={register}
                placeholder="Enter your postal code"
                errors={errors}
              />
              <FormField
                name="country"
                label="Country"
                register={register}
                placeholder="Enter your country"
                errors={errors}
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
    </>
  );
};

export default ShippingAddressForm;

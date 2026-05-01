"use client";

import { Button } from "@/components/ui/button";
import { signUpDefaultValues } from "@/lib/constants";
import { signUpUser } from "@/lib/actions/userAction";
import { useTransition } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUpFormSchema } from "@/lib/zodValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField";
import { toast } from "sonner";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpDefaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    startTransition(async () => {
      const res = await signUpUser({
        ...data,
        callbackUrl,
      });

      if (!res.success) {
        toast.error(res.message);

        return;
      }
      router.refresh();
      router.push(callbackUrl);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
      <div className="flex flex-col gap-5 mt-4">
        <FieldGroup>
          <FormField
            name="name"
            label="Full Name"
            register={register}
            placeholder="Enter your full Name"
            errors={errors}
          />
        </FieldGroup>
        <FieldGroup>
          <FormField
            name="email"
            label="Email"
            register={register}
            placeholder="Enter your email address"
            type="email"
            errors={errors}
          />
        </FieldGroup>
        <FieldGroup>
          <FormField
            name="password"
            label="Password"
            register={register}
            placeholder="Enter your password"
            type="password"
            errors={errors}
          />
        </FieldGroup>
        <FieldGroup>
          <FormField
            name="confirmPassword"
            label="Confirm Password"
            register={register}
            placeholder="Enter your password again"
            type="password"
            errors={errors}
          />
        </FieldGroup>
      </div>

      <div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full mt-4"
          variant={"default"}
        >
          {isPending ? "Registering in..." : "Sign Up"}
        </Button>
      </div>

      <div className="text-sm text-center text-muted-foreground">
        {" "}
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" target="_self" className="link">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;

"use client";

import { Button } from "@/components/ui/button";
import { signInDefaultValues } from "@/lib/constants";
import { signInWithCredentials } from "@/lib/actions/userAction";
import { useTransition } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInFormSchema } from "@/lib/zodValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField";
import { toast } from "sonner";

const CredentialsSignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInDefaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(data: z.infer<typeof signInFormSchema>) {
    startTransition(async () => {
      const res = await signInWithCredentials({
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
            name="email"
            label="Email"
            type="email"
            register={register}
            placeholder="Enter your email address"
            errors={errors}
          />
        </FieldGroup>
        <FieldGroup>
          <FormField
            name="password"
            label="Password"
            type="password"
            register={register}
            placeholder="Enter your password"
            errors={errors}
          />
        </FieldGroup>
      </div>

      <div>
        <Button
          disabled={isPending}
          className="w-full mt-4"
          variant={"default"}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </div>

      <div className="text-sm text-center text-muted-foreground">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

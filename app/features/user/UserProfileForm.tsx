"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Heading from "@/components/Heading";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { updateProfile } from "@/lib/actions/userAction";
import { toast } from "sonner";
import { updateProfileSchema } from "@/lib/zodValidator";
import { useSession } from "next-auth/react";

const UserProfileForm = ({
  user,
}: {
  user: z.infer<typeof updateProfileSchema>;
}) => {
  const router = useRouter();
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: user,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    startTransition(async () => {
      const res = await updateProfile(values);

      if (!res.success) {
        toast.error(res.message);

        return;
      }

      // refresh session with new data
      await update({
        user: { name: values.name },
      });

      toast.success(res.message);

      // router.refresh();
      router.replace("/user/profile");
    });
  }

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <Heading text="Profile" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="space-y-4"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FieldGroup>
              <FormField
                name="email"
                type="email"
                label="Email"
                register={register}
                placeholder="Enter your name"
                defaultValue={user.email}
                errors={errors}
                disable
              />
              <FormField
                name="name"
                label="Name"
                register={register}
                placeholder="Enter your name"
                defaultValue={user.name}
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
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfileForm;

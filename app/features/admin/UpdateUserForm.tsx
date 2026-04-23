"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema } from "@/lib/zodValidator";
import { USER_ROLES } from "@/lib/constants";
import Heading from "@/components/Heading";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUser } from "@/lib/actions/userAction";
import { toast } from "sonner";
import FormSelect from "@/components/FormSelect";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = form;

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    const res = await updateUser({ ...values, id: user.id });

    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);

    router.push("/admin/users");
  }

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <Heading text="Update User" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="space-y-4"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            {/* Email */}
            <FieldGroup>
              <FormField
                name="email"
                label="Email"
                register={register}
                disable={true}
                placeholder="Enter your email"
                errors={errors}
              />

              {/* NAME */}
              <FormField
                name="name"
                label="Name"
                register={register}
                placeholder="Enter your name"
                errors={errors}
              />

              <FormSelect
                name="role"
                label="Role"
                control={control}
                errors={errors}
                placeholder="Select role"
                options={USER_ROLES}
              />
            </FieldGroup>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}{" "}
              Update User
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUserForm;

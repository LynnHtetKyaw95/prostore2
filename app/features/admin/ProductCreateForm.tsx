"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/zodValidator";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Resolver, useForm, useWatch } from "react-hook-form";
import z from "zod";
import slugify from "slugify";
import { createProduct, updateProduct } from "@/lib/actions/productAction";
import { toast } from "sonner";
import ImageField from "@/components/ImageField";
import FeaturedBannerField from "@/components/FeaturedBannerField";

interface ProductCreateFormProps {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}

const ProductCreateForm = ({
  type,
  product,
  productId,
}: ProductCreateFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(
      type === "Create" ? insertProductSchema : updateProductSchema,
    ) as Resolver<z.infer<typeof insertProductSchema>>,

    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  async function onSubmit(values: z.infer<typeof insertProductSchema>) {
    if (type === "Create") {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }

      router.push("/admin/products");
    }

    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");

        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }

      router.push("/admin/products");
    }
  }

  const images = useWatch({
    control,
    name: "images",
  });

  const isFeatured = useWatch({
    control,
    name: "isFeatured",
  });

  const banner = useWatch({
    control,
    name: "banner",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row mt-4">
        {/* NAME */}
        <FieldGroup>
          <FormField
            name="name"
            label="Name"
            type="text"
            register={register}
            placeholder="Enter product name"
            errors={errors}
          />
        </FieldGroup>

        {/* SLUG */}
        <FieldGroup>
          <FormField
            name="slug"
            label="Slug"
            type="text"
            register={register}
            placeholder="Enter slug"
            errors={errors}
          >
            <Button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1"
              onClick={() => {
                form.setValue(
                  "slug",
                  slugify(form.getValues("name"), { lower: true }),
                );
              }}
            >
              Generate
            </Button>
          </FormField>
        </FieldGroup>
      </div>
      <div className="flex flex-col gap-5 md:flex-row mt-4">
        {/* CATEGORY */}
        <FieldGroup>
          <FormField
            name="category"
            label="Category"
            type="text"
            register={register}
            placeholder="Enter category"
            errors={errors}
          />
        </FieldGroup>
        {/* BRAND */}
        <FieldGroup>
          <FormField
            name="brand"
            label="Brand"
            type="text"
            register={register}
            placeholder="Enter brand"
            errors={errors}
          />
        </FieldGroup>
      </div>
      <div className="flex flex-col gap-5 md:flex-row mt-4">
        {/* PRICE */}
        <FieldGroup>
          <FormField
            name="price"
            label="Price"
            type="text"
            register={register}
            placeholder="Enter price"
            errors={errors}
          />
        </FieldGroup>
        {/* STOCK */}
        <FieldGroup>
          <FormField
            name="stock"
            label="Stock"
            type="number"
            register={register}
            placeholder="Enter stock"
            errors={errors}
          />
        </FieldGroup>
      </div>
      <div className="upload-field flex flex-col gap-5 md:flex-row mt-4">
        {/* IMAGES */}
        <ImageField
          label="Images"
          images={images}
          setValue={setValue}
          error={errors.images}
        />
      </div>
      <div className="upload-field">
        {/* isFeatured */}
        <FeaturedBannerField
          setValue={setValue}
          errors={errors}
          isFeatured={isFeatured}
          banner={banner}
          nameFeatured="isFeatured"
          nameBanner="banner"
        />
      </div>

      <div>
        <FormField
          name="description"
          label="Description"
          register={register}
          errors={errors}
          as="textarea"
          placeholder="Enter product description"
        />
      </div>

      <div>
        <Button
          type="submit"
          size={"lg"}
          disabled={isSubmitting}
          className="button col-span-2 w-full"
        >
          {isSubmitting ? "Submitting" : `${type} Product`}
        </Button>
      </div>
    </form>
  );
};
export default ProductCreateForm;

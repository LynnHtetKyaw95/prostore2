/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FieldErrors,
  UseFormSetValue,
  FieldValues,
  Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

type FeaturedBannerFieldProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  isFeatured: boolean;
  banner?: string | null;

  nameFeatured: Path<T>;
  nameBanner: Path<T>;
};

export default function FeaturedBannerField<T extends FieldValues>({
  errors,
  setValue,
  isFeatured,
  banner,
  nameFeatured,
  nameBanner,
}: FeaturedBannerFieldProps<T>) {
  const error = errors[nameFeatured];

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>Featured Product</FieldLabel>

      <Card>
        <CardContent className="space-y-3 mt-2">
          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isFeatured}
              onCheckedChange={(value) =>
                setValue(nameFeatured, !!value as any)
              }
            />
            <span>Is Featured?</span>
          </div>

          {/* Preview */}
          {isFeatured && banner && (
            <Image
              src={banner}
              alt="banner image"
              className="w-full object-cover rounded-sm"
              width={1920}
              height={680}
            />
          )}

          {/* Upload */}
          {isFeatured && !banner && (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                setValue(nameBanner, res[0].ufsUrl as any);
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
          )}
        </CardContent>
      </Card>

      {error && <FieldError errors={[error as any]} />}
    </Field>
  );
}

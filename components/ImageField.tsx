/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UseFormSetValue } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

type ImageFieldProps = {
  label: string;
  error?: any;
  images: string[];
  setValue: UseFormSetValue<any>;
};

export default function ImageField({
  label,
  error,
  images,
  setValue,
}: ImageFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>

      <Card>
        <CardContent className="space-y-2 mt-2 min-h-48">
          <div className="flex flex-wrap gap-2">
            {/* Preview */}
            {images.map((image) => (
              <Image
                key={image}
                src={image}
                alt="product image"
                className="w-20 h-20 object-cover rounded-sm"
                width={100}
                height={100}
              />
            ))}

            {/* Upload */}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const newImages = [...images, res[0].ufsUrl];
                setValue("images", newImages);
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {error && <FieldError errors={[error]} />}
    </Field>
  );
}

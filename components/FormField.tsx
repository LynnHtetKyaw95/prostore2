/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  type?: string;
};

export default function FormField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  placeholder,
  type = "text",
}: FormFieldProps<T>) {
  const error = errors[name];

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />

      {error && <FieldError errors={[error as any]} />}
    </Field>
  );
}

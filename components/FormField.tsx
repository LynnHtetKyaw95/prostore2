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
import React from "react";
import { Textarea } from "./ui/textarea";

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disable?: boolean;
  children?: React.ReactNode;
  as?: "input" | "textarea";
};

export default function FormField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  placeholder,
  defaultValue,
  disable,
  type = "text",
  children,
  as = "input",
}: FormFieldProps<T>) {
  const error = errors[name];

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      {/* Later I am going to use TipTap */}
      <div className="flex gap-2">
        {as === "textarea" ? (
          <Textarea
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disable}
            {...register(name)}
            className="flex-1 resize-none min-h-30"
          />
        ) : (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disable}
            {...register(name)}
          />
        )}
        {children}
      </div>

      {error && <FieldError errors={[error as any]} />}
    </Field>
  );
}

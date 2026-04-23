/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FieldValues,
  Path,
  Control,
  FieldErrors,
  Controller,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  options,
  placeholder,
  disabled,
}: FormSelectProps<T>) {
  const error = errors?.[name];

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value.toString()}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && <FieldError errors={[error as any]} />}
    </Field>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type Option = {
  label: string;
  value: string;
};

type RadioFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  options: Option[];
  errors: any;
};

export default function RadioField<T extends FieldValues>({
  name,
  label,
  control,
  options,
  errors,
}: RadioFieldProps<T>) {
  const error = errors[name];

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="space-y-3 mt-4">
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-col space-y-2"
            >
              {options.map((option, index) => {
                const id = `${name}-${index}`;

                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <RadioGroupItem value={option.value} id={id} />
                    <Label className="font-normal" htmlFor={id}>
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        )}
      />

      {error && <FieldError errors={[error as any]} />}
    </Field>
  );
}

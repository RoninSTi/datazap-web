import { Input, InputProps } from "@/components/Input";
import {
  DeepMap,
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export type FormInputProps<TFormValues extends FieldValues> = {
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  indicator?: React.ReactNode;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
} & Omit<InputProps, "name">;

const FormInput = <TFormValues extends Record<string, unknown>>({
  className,
  errors,
  indicator,
  name,
  register,
  rules,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className} aria-live="polite">
      <label className="block" htmlFor={props.id}>
        <div className="flex flex-row items-center justify-between w-full">
          <span className="text-xs text-textDeemphasis dark:text-darkTextDeemphasis">
            {props.label}
          </span>
          {!!indicator && indicator}
        </div>

        <Input
          name={name}
          {...props}
          {...(register && register(name, rules))}
        />
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <p className="mt-1 font-serif text-sm text-left block text-red-600">
              {message}
            </p>
          )}
        />
      </label>
    </div>
  );
};

export { FormInput };

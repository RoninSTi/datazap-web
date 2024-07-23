import { ErrorMessage } from '@hookform/error-message';
import type {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import type { Props } from '@/components/Input';
import { Input } from '@/components/Input';

export type FormInputProps<TFormValues extends FieldValues> = {
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  indicator?: React.ReactNode;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  label?: string;
} & Omit<Props, 'name' | 'label'>;

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
        {props.label && (
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-xs text-textDeemphasis dark:text-darkTextDeemphasis">
              {props.label}
            </span>
            {!!indicator && indicator}
          </div>
        )}

        <Input
          name={name}
          {...props}
          {...(register && register(name, rules))}
        />
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <p className="mt-1 block text-left font-serif text-sm text-red-600">
              {message}
            </p>
          )}
        />
      </label>
    </div>
  );
};

export { FormInput };

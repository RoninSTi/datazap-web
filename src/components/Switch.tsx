import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import React from 'react';
import type {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import type { InputType } from './Input';
import { BodyMedium } from './Typography/BodyMedium';
import { BodyMediumBold } from './Typography/BodyMediumBold';

export type Props = {
  id: string;
  name: string;
  label?: string;
  type?: InputType;
  className?: string;
  placeholder?: string;
  subLabel?: string;
};

export type FormInputProps<TFormValues extends FieldValues> = {
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  indicator?: React.ReactNode;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  label?: string;
  subLabel?: string;
} & Omit<Props, 'name' | 'label'>;

const Switch = <TFormValues extends Record<string, unknown>>({
  className,
  errors,
  indicator,
  id,
  label,
  name,
  register,
  rules,
  subLabel,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <>
      <input
        className={classNames(
          "after:shadow-switch-2 checked:bg-primary checked:after:bg-primary checked:after:shadow-switch-1 focus:before:shadow-switch-3 checked:focus:border-primary checked:focus:bg-primary checked:focus:before:shadow-switch-3 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary me-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-black/25 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25",
          className,
        )}
        type="checkbox"
        role="switch"
        id={id}
        {...props}
        {...(register && register(name, rules))}
      />
      <label className="inline-block hover:cursor-pointer" htmlFor={id}>
        <BodyMediumBold>{label}</BodyMediumBold>
        {subLabel && <BodyMedium variant="secondary">{subLabel}</BodyMedium>}
      </label>
      {!!indicator && indicator}
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <p className="mt-1 block text-left font-serif text-sm text-red-600">
            {message}
          </p>
        )}
      />
    </>
  );
};

export { Switch };

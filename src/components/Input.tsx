import React, {
    FC,
    forwardRef,
    // DetailedHTMLProps,
    // InputHTMLAttributes,
  } from 'react';
  import classNames from 'classnames';
  
  export type InputSize = 'medium' | 'large';
  export type InputType = 'text' | 'email' | 'password';
  
  export type InputProps = {
    id: string;
    name: string;
    label: string;
    type?: InputType;
    size?: InputSize;
    className?: string;
    placeholder?: string;
  }
//   } & Omit<
//     DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
//     'size'
//   >;
  
  // Using maps so that the full Tailwind classes can be seen for purging
  // see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  
  const sizeMap: { [key in InputSize]: string } = {
    medium: 'p-3 text-base',
    large: 'p-4 text-base',
  };
  
  export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (
      {
        id,
        name,
        label,
        type = 'text',
        size = 'medium',
        className = '',
        placeholder,
        ...props
      },
      ref
    ) => {
      return (
        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          aria-label={label}
          placeholder={placeholder}
          className={classNames([
            'relative inline-flex w-full leading-none transition-colors ease-in-out mt-1 rounded-md border-1 border-solid border-surfacePrimary bg-inputBackground dark:border-darkSurfacePrimary dark:bg-darkInputBackground focus:outline-none',
            sizeMap[size],
            className,
          ])}
          {...props}
        />
      );
    }
  );

Input.displayName = 'Input'
  
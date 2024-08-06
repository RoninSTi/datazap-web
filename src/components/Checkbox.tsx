import React, { type PropsWithChildren } from 'react';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  state: 'default' | 'checked' | 'disabled' | 'indeterminate';
};

const Checkbox: React.FC<PropsWithChildren<Props>> = ({
  children,
  onChange,
  state,
}) => {
  const defaultChecked = (): boolean => {
    switch (state) {
      case 'default':
      case 'disabled':
      case 'indeterminate':
        return false;
      case 'checked':
        return true;
      default:
        return false;
    }
  };

  return (
    <div>
      <label htmlFor="custom-checkbox">
        <input
          ref={(input) => {
            if (input) {
              // eslint-disable-next-line no-param-reassign
              input.indeterminate = state === 'indeterminate';
            }
          }}
          className="form-checkbox text-buttonPrimaryBackground focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 dark:text-darkButtonBgPrimaryActive"
          checked={defaultChecked()}
          onChange={onChange}
          id="custom-checkbox"
          name="custom-checkbox"
          type="checkbox"
          value="custom-checkbox"
        />
        {children}
      </label>
    </div>
  );
};

export { Checkbox };

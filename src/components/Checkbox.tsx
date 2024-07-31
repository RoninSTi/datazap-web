import React, { type PropsWithChildren } from 'react';

type Props = {
  state: 'default' | 'checked' | 'disabled' | 'indeterminate';
};

const Checkbox: React.FC<PropsWithChildren<Props>> = ({ children, state }) => {
  const defaultChecked = (): boolean => {
    switch (state) {
      case 'default':
      case 'disabled':
      case 'indeterminate':
        return false;
      case 'checked':
        return true;
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
          className="form-checkbox text-buttonPrimaryBackground dark:text-darkButtonBgPrimaryActive"
          defaultChecked={defaultChecked()}
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

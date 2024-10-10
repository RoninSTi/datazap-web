import { MenuItem } from "@headlessui/react";
import React, { PropsWithChildren } from "react";
import { BodyMedium } from "../Typography/BodyMedium";
import { CheckIcon } from "@heroicons/react/16/solid";

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

const DropDownMenuItem: React.FC<PropsWithChildren<Props>> = ({ children, isChecked, onClick }) => (
  <MenuItem>
    <button className="py-2 px-3 justify-between flex flex-row items-center w-full" onClick={onClick}>
      <BodyMedium variant="main">{children}</BodyMedium>
      <div className="w-[18px] h-[18px] text-buttonPrimaryBackgroundActive ml-3">{isChecked === true ?<CheckIcon /> : null}</div>
    </button>
  </MenuItem>
);

export { DropDownMenuItem };

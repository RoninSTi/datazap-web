import { MenuButton } from "@headlessui/react";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface Props {
  active?: boolean;
  fullWidth?: boolean;
  variant: "primary" | "secondary";
}

const DropDownMenuButton: React.FC<PropsWithChildren<Props>> = ({
  active,
  children,
  fullWidth,
  variant,
}) => {
  const classes = classNames(
    "flex",
    "flex-row",
    "items-center",
    "justify-center",
    "gap-3",
    "text-sm",
    "px-4",
    "py-[.4rem]",
    "rounded-lg",
    "font-semibold",
    {
      "text-buttonPrimaryText": variant === "primary",
      "text-buttonSecondaryText": variant === "secondary",
      "dark:text-darkButtonSecondaryText": variant === "secondary",
      "bg-buttonSecondaryBackgroundActive dark:bg-buttonSecondaryBackgroundActive":
        variant === "secondary" && active,
      "bg-buttonPrimaryBackgroundActive dark:bg-buttonPrimaryBackgroundActive":
        variant === "primary" && active,
      "bg-buttonPrimaryBackground": variant === "primary",
      "bg-buttonSecondaryBackground": variant === "secondary",
      "dark:bg-darkButtonSecondaryBackground": variant === "secondary",
      "hover:bg-buttonPrimaryBackgroundHover": variant === "primary",
      "hover:bg-buttonSecondaryBackgroundHover": variant === "secondary",
      "border border-solid border-borderMain dark:border-darkBorderMain":
        variant === "secondary",
      "flex-1": fullWidth === true,
    }
  );
  return <MenuButton className={classes}>{children}</MenuButton>;
};

export { DropDownMenuButton };

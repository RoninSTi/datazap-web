import type { PropsWithChildren } from 'react';
import React from 'react';

export const ActionContainer: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => <div className="flex flex-row items-center gap-4">{children}</div>;

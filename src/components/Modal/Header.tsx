import React from 'react';

import { BodyMediumBold } from '../Typography/BodyMediumBold';

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <div className="border-b-1 border-borderDeemphasis p-6 dark:border-darkBorderDeemphasis">
      <BodyMediumBold>{title}</BodyMediumBold>
    </div>
  );
};

export { Header };

import React from 'react';

import { StarButton } from '@/components/Icons/Buttons/StarButton';
import { BodyLargeBold } from '@/components/Typography/BodyLargeBold';

interface Props {
  isFavorite: boolean;
  onClick: () => void;
  title: string;
}

const PageTitle: React.FC<Props> = ({ isFavorite, onClick, title }) => {
  return (
    <div className="flex flex-row items-center">
      <BodyLargeBold className="mr-3" variant="main">
        {title}
      </BodyLargeBold>
      <StarButton onClick={onClick} isActive={isFavorite} />
    </div>
  );
};

export { PageTitle };

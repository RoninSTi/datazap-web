import React from 'react';

import { BodyLargeBold } from '../Typography/BodyLargeBold';

const Empty: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6">
      <BodyLargeBold>No Logs Added</BodyLargeBold>
    </div>
  );
};

export { Empty };

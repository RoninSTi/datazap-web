import React from 'react';

import { Button } from '@/components/Button';
import { Help } from '@/components/Icons/Help';
import { Logs } from '@/components/Icons/Logs';
import { Upload } from '@/components/Icons/Upload';
import { BodyLargeBold } from '@/components/Typography/BodyLargeBold';
import { BodyMedium } from '@/components/Typography/BodyMedium';

interface Props {
  onClickUpload: () => void;
}

const Empty: React.FC<Props> = ({ onClickUpload }) => (
  <div className="flex flex-1 items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 text-textPlaceholder dark:text-darkTextPlaceholder">
        <Logs height={24} width={24} />
      </div>
      <BodyLargeBold variant="main">No Logs</BodyLargeBold>
      <BodyMedium variant="secondary">Get Started By Adding Logs</BodyMedium>
      <div className="mt-6 flex flex-row justify-between gap-4">
        <Button onClick={onClickUpload}>
          <Upload />
          Upload Logs
        </Button>
        <Button variant="secondary">
          <Help />
          Learn More
        </Button>
      </div>
    </div>
  </div>
);

export { Empty };

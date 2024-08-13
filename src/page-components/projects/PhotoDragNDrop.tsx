import React, { useRef } from 'react';

import { Button } from '@/components/Button';
import { DragNdrop } from '@/components/DragNDropUpload/DragNDrop';
import { Upload } from '@/components/Icons/Upload';
import { LabelUppercaseSmall } from '@/components/Typography/LabelUppercaseSmall';

interface Props {
  onFilesSelected: (files: File) => void;
}

const PhotoDragNDrop: React.FC<Props> = ({ onFilesSelected }) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    inputFile.current?.click();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesSelected(event.target.files[0]);
    }
  };

  return (
    <DragNdrop
      className="w-full flex-1"
      onFilesSelected={onFilesSelected}
      singleFile
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <Button className="mb-3" onClick={handleOnClick} variant="secondary">
          <Upload /> Choose File
        </Button>
        <LabelUppercaseSmall>JPG or PNG. MAX 2MB</LabelUppercaseSmall>
        <input
          accept=".png,.jpg,.jpeg"
          className="hidden"
          onChange={handleOnChange}
          type="file"
          id="file"
          ref={inputFile}
        />
      </div>
    </DragNdrop>
  );
};

export { PhotoDragNDrop };

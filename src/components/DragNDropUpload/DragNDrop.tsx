import classNames from 'classnames';
import type { DragEventHandler } from 'react';
import { useEffect, useState } from 'react';

import { DnD } from '../Icons/DnD';

type Props = {
  onFilesSelected: (files: File[]) => void;
};

const DragNdrop: React.FC<Props> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [hoverWithFiles, setHoverWithFiles] = useState<boolean>(false);

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setHoverWithFiles(false);

    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragEnter: DragEventHandler = (event) => {
    event.preventDefault();

    setHoverWithFiles(true);
  };

  const handleDragLeave: DragEventHandler = (event) => {
    event.preventDefault();

    setHoverWithFiles(false);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (files.length > 0) {
      onFilesSelected(files);

      setFiles([]);
    }
  }, [files, onFilesSelected]);

  return (
    <div
      className={classNames(
        'rounded-lg flex w-full py-[70px] bg-surfaceSecondary dark:bg-darkSurfaceSecondary border-2 border-dashed',
        {
          'border-borderEmphasis': files.length === 0,
          'border-dzYellow': hoverWithFiles,
          'bg-borderEmphasis': files.length > 0,
        },
      )}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-4 text-borderEmphasis">
          <DnD />
        </div>
        <div className="mb-4 font-semibold text-textMain dark:text-darkTextMain">
          Drop your .csv files here, or click to browse.
        </div>
        <div className="flex flex-row items-center justify-between gap-6 text-[10px] font-extrabold uppercase text-textDeemphasis dark:text-darkTextDeemphasis">
          <div>Upgrade to increase limits:</div>
          <div>
            File size: <span>3MB</span>
          </div>
          <div>
            Bulk uploads: <span>5 Logs</span>
          </div>
        </div>
        {files.map((file, index) => (
          <div key={file.name}>
            {file.name}
            <button type="button" onClick={() => handleRemoveFile(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { DragNdrop };

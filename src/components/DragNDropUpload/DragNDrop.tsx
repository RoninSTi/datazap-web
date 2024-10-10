import classNames from 'classnames';
import type { DragEventHandler, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  onFilesSelected: (files: File[]) => void;
  singleFile: false;
};

type SingleProps = {
  className?: string;
  onFilesSelected: (files: File) => void;
  singleFile: true;
};

const DragNdrop: React.FC<PropsWithChildren<Props | SingleProps>> = ({
  children,
  className,
  onFilesSelected,
  singleFile,
}) => {
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

  useEffect(() => {
    if (files.length === 0) return;

    if (files.length === 1 && singleFile) {
      onFilesSelected(files[0]);
    }

    if (files.length > 0 && !singleFile) {
      onFilesSelected(files);
    }

    setFiles([]);
  }, [files, onFilesSelected, singleFile]);

  return (
    <div
      className={classNames(
        'rounded-lg flex bg-surfaceSecondary dark:bg-darkSurfaceSecondary border-2 border-dashed',
        {
          'border-borderEmphasis': files.length === 0,
          'border-dzYellow': hoverWithFiles,
          'bg-borderEmphasis': files.length > 0,
        },
        className,
      )}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => event.preventDefault()}
    >
      {children}
    </div>
  );
};

export { DragNdrop };

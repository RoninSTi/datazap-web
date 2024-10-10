import React from "react";

import { DragNdrop } from "@/components/DragNDropUpload/DragNDrop";
import { DnD } from "@/components/Icons/DnD";
import { BodyMediumBold } from "@/components/Typography/BodyMediumBold";

interface Props {
  onFilesSelected: (files: File[]) => void;
}

const LogDragNDrop: React.FC<Props> = ({ onFilesSelected }) => {
  return (
    <DragNdrop onFilesSelected={onFilesSelected} singleFile={false}>
      <div className="flex flex-1 flex-col items-center justify-center py-10">
        <div className="mb-4 text-borderEmphasis">
          <DnD />
        </div>
        <div className="mb-4">
          <BodyMediumBold>
            Drop your .csv files here, or click to browse.
          </BodyMediumBold>
        </div>
        <div className="flex flex-row items-center justify-between gap-6 text-[10px] font-extrabold text-textPlaceholder dark:text-darkTextPlaceholder uppercase">
          <div>Upgrade to increase limits:</div>
          <div>
            File size: <span>3MB</span>
          </div>
          <div>
            Bulk uploads: <span>5 Logs</span>
          </div>
        </div>
      </div>
    </DragNdrop>
  );
};

export { LogDragNDrop };

import React from "react";

import { Button } from "@/components/Button";
import { Footer as ModalFooter } from "@/components/Modal/Footer";
import { LogToBeUploaded } from "@/types/log";

interface Props {
  logs: LogToBeUploaded[];
  onCancel: () => void;
  onSubmit: () => void;
}

const Footer: React.FC<Props> = ({ logs, onCancel, onSubmit }) => {
  return (
    <ModalFooter>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button disabled={logs.length === 0} onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </ModalFooter>
  );
};

export { Footer };

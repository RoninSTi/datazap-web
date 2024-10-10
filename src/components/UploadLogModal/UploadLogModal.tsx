import React, { useState } from "react";

import { Modal } from "@/components/Modal/Modal";
import type { Project } from "@/types/project";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LogDragNDrop } from "@/page-components/logs/upload/LogDragNDrop";
import { LogRow } from "./LogRow";
import useUploadFiles from "@/hooks/useUploadFiles";
import { useGetMe } from "@/api/queries/user";
import { LogToBeUploaded } from "@/types/log";
import { useAddLogs } from "@/api/mutations/logs";

interface Props {
  onClose: () => void;
  project?: Project;
  show: boolean;
}

const UploadLogModal: React.FC<Props> = ({ onClose, project, show }) => {
  const { upload } = useUploadFiles();

  const [logs, setLogs] = useState<LogToBeUploaded[]>([]);

  const { data: userData } = useGetMe();

  const { mutateAsync } = useAddLogs();

  const handleOnFilesSelected = async (files: File[]) => {
    const response: LogToBeUploaded[] | undefined = await upload({
      files,
      key: "logs",
      userData,
    });

    if (response) setLogs(response);
  };

  const handleOnUpdate = ({ log }: { log: LogToBeUploaded }) => {
    const updatedLogs = logs.map((l) => (l.key === log.key ? log : l));

    setLogs(updatedLogs);
  };

  const handleOnRemove = ({ log }: { log: LogToBeUploaded }) => {
    const updatedLogs = logs.filter((l) => l.key !== log.key);

    setLogs(updatedLogs);
  };

  const handleOnSubmit = async () => {
    await mutateAsync({
      logs: logs.map(({ key, ...rest }) =>
        project === undefined ? { ...rest } : { ...rest, projectId: project.id }
      ),
    });

    setLogs([]);

    onClose();
  };

  return (
    <Modal
      footer={
        <Footer logs={logs} onCancel={onClose} onSubmit={handleOnSubmit} />
      }
      header={<Header project={project} onClose={onClose} />}
      show={show}
      onClose={onClose}
    >
      <div className="p-6">
        <LogDragNDrop onFilesSelected={handleOnFilesSelected} />
        {logs.map((log) => (
          <LogRow
            key={log.key}
            log={log}
            onRemove={handleOnRemove}
            onUpdate={handleOnUpdate}
            project={project}
          />
        ))}
      </div>
    </Modal>
  );
};

export { UploadLogModal };

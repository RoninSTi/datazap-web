import { FormInput } from "@/components/FormInput";
import { IconButton } from "@/components/IconButton";
import { Log } from "@/components/Icons/Log";
import { Remove } from "@/components/Icons/Remove";
import { BodyMedium } from "@/components/Typography/BodyMedium";
import { BodyMediumBold } from "@/components/Typography/BodyMediumBold";
import { LogToBeUploaded } from "@/types/log";
import { Project } from "@/types/project";
import { humanFileSize } from "@/utils/humanFileSize";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import { ProjectMenuButton } from "./ProjectMenuButton";
import { useGetProjects } from "@/api/queries/projects";
import { DropDownMenuItem } from "../DropDownMenu/DropDownMenuItem";

type FormFields = Record<"notes", string>;

interface Props {
  log: LogToBeUploaded;
  onRemove: ({ log }: { log: LogToBeUploaded }) => void;
  onUpdate: ({ log }: { log: LogToBeUploaded }) => void;
  project?: Project;
}

const LogRow: React.FC<Props> = ({ log, onRemove, onUpdate, project }) => {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  const { data: projectResponse } = useGetProjects();

  const {
    formState: { errors },
    register,
    watch,
  } = useForm<FormFields>();

  const watchNotes = watch("notes");

  useEffect(() => {
    onUpdate({ log: { ...log, notes: watchNotes } });
  }, [watchNotes]);

  const handleOnClickRemove = () => onRemove({ log });

  const handleOnClick = (project: Project) => {
    setSelectedProject(project)
    onUpdate({ log: { ...log, projectId: project.id }})
  }

  return (
    <div className="rounded-lg border-1 border-borderDeemphasis dark:border-darkBorderDeemphasis bg-surfaceSecondary dark:bg-darkSurfaceSecondary p-4 mt-4">
      <div className="text-textPlaceholder dark:text-darkTextPlaceholder mb-3 flex items-center justify-start">
        <Log height={18} width={18} />
        <BodyMediumBold className="ml-3">{log.filename}</BodyMediumBold>
        <BodyMedium className="ml-2" variant="secondary">
          {humanFileSize(log.size)}
        </BodyMedium>
        <div className="flex-1" />
        <IconButton onClick={handleOnClickRemove}>
          <Remove />
        </IconButton>
      </div>
      <form>
        <div className="flex flex-row items-center">
          <FormInput<FormFields>
            className="flex-1"
            errors={errors}
            id="notes"
            placeholder="Notes"
            name="notes"
            register={register}
            size="small"
            type="text"
          />
          {project === undefined && (
            <div className="w-[200px] ml-2">
              <DropDownMenu MenuButton={() => <ProjectMenuButton title={selectedProject !== undefined ? selectedProject.name : "Project"} />}>
                {projectResponse?.projects.map((pj) => (
                  <DropDownMenuItem key={pj.id} isChecked={pj.id === selectedProject?.id} onClick={() => handleOnClick(pj)}>
                    {pj.name}
                  </DropDownMenuItem>
                ))}
              </DropDownMenu>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export { LogRow };

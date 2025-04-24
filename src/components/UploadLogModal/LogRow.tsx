import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetProjects } from '@/api/queries/projects';
import { FormInput } from '@/components/FormInput';
import { IconButton } from '@/components/IconButton';
import { Log } from '@/components/Icons/Log';
import { Remove } from '@/components/Icons/Remove';
import { BodyMedium } from '@/components/Typography/BodyMedium';
import { BodyMediumBold } from '@/components/Typography/BodyMediumBold';
import type { LogToBeUploaded } from '@/types/log';
import type { Project } from '@/types/project';
import { humanFileSize } from '@/utils/humanFileSize';

import { DropDownMenu } from '../DropDownMenu/DropDownMenu';
import { DropDownMenuItem } from '../DropDownMenu/DropDownMenuItem';
import { ProjectMenuButton } from './ProjectMenuButton';

type FormFields = Record<'notes', string>;

interface Props {
  log: LogToBeUploaded;
  onRemove: ({ log }: { log: LogToBeUploaded }) => void;
  onUpdate: ({ log }: { log: LogToBeUploaded }) => void;
  project?: Project;
}

const LogRow: React.FC<Props> = ({ log, onRemove, onUpdate, project }) => {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined,
  );

  const { data: projectResponse } = useGetProjects();

  const {
    formState: { errors },
    register,
    watch,
  } = useForm<FormFields>();

  const watchNotes = watch('notes');

  useEffect(() => {
    onUpdate({ log: { ...log, notes: watchNotes } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchNotes]);

  const handleOnClickRemove = () => onRemove({ log });

  const handleOnClick = (proj: Project) => {
    setSelectedProject(proj);
    onUpdate({ log: { ...log, projectId: proj.id } });
  };

  // Pre-compute project menu title outside of render
  const projectMenuTitle =
    selectedProject !== undefined ? selectedProject.name : 'Project';

  return (
    <div className="mt-4 rounded-lg border-1 border-borderDeemphasis bg-surfaceSecondary p-4 dark:border-darkBorderDeemphasis dark:bg-darkSurfaceSecondary">
      <div className="mb-3 flex items-center justify-start text-textPlaceholder dark:text-darkTextPlaceholder">
        <Log height={18} width={18} />
        <BodyMediumBold className="ml-3">{log.filename}</BodyMediumBold>
        <BodyMedium className="ml-2" variant="secondary">
          {humanFileSize(log.size)}
        </BodyMedium>
        <div className="flex-1" />
        <IconButton
          onClick={handleOnClickRemove}
          aria-label={`Remove log ${log.filename}`}
        >
          <Remove />
        </IconButton>
      </div>
      <form aria-label={`Edit log ${log.filename}`}>
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
            aria-label="Log notes"
          />
          {project === undefined && (
            <div className="ml-2 w-[200px]">
              <DropDownMenu
                MenuButton={<ProjectMenuButton title={projectMenuTitle} />}
              >
                {projectResponse?.projects?.map((pj) => (
                  <DropDownMenuItem
                    key={pj.id}
                    isChecked={pj.id === selectedProject?.id}
                    onClick={() => handleOnClick(pj)}
                  >
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

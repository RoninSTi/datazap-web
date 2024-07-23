import type { PropsWithChildren } from 'react';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type LogToBeUploaded } from '@/app/logs/upload/page';
import { useLogStore } from '@/store/logs';
import { humanFileSize } from '@/utils/humanFileSize';

import { FormInput } from '../FormInput';
import { IconButton } from '../IconButton';
import { Log } from '../Icons/Log';
import { Remove } from '../Icons/Remove';

type Props = {
  log: LogToBeUploaded;
};

const Cell: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="flex flex-1 items-center pr-4">{children}</div>
);

type FormFields = {
  title: string;
  notes: string;
};

const Row: React.FC<Props> = ({ log }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: log.title,
    },
  });

  const { removeLog, replaceLog } = useLogStore();

  const projects: string[] = [];

  const handleOnClickRemove = () => removeLog(log);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const updatedLog = {
      ...log,
      title: data.title,
      notes: data.notes,
    };

    replaceLog(updatedLog);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="flex flex-1 border-b-1 border-borderDeemphasis px-10 py-5 dark:border-darkBorderDeemphasis"
        key={log.key}
      >
        <div className="mr-4 flex items-center">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
          />
        </div>
        <Cell>
          <div className="mr-4 text-borderEmphasis">
            <Log />
          </div>
          <div>
            <div className="text-sm font-semibold text-textMain dark:text-darkTextMain">
              {log.filename}
            </div>
            <div className="text-xs font-semibold text-textDeemphasis dark:text-darkTextDeemphasis">
              {humanFileSize(log.size)}
            </div>
          </div>
        </Cell>
        <Cell>
          <FormInput<FormFields>
            className="w-full"
            errors={errors}
            id="title"
            name="title"
            register={register}
            type="text"
            size="small"
          />
        </Cell>
        <Cell>
          <FormInput<FormFields>
            className="w-full"
            errors={errors}
            id="notes"
            name="notes"
            placeholder="Notes"
            register={register}
            type="text"
            size="small"
          />
        </Cell>
        <Cell>
          <select className="w-full rounded-md border-1 border-borderMain bg-buttonSecondaryBackground px-3 py-1 text-sm text-buttonSecondaryText dark:border-darkBorderMain dark:bg-darkButtonSecondaryBackground dark:text-darkButtonSecondaryText">
            <option selected>Select</option>
            {projects.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </Cell>
        <div className="flex items-center">
          <IconButton onClick={handleOnClickRemove}>
            <Remove />
          </IconButton>
        </div>
      </div>
    </form>
  );
};

export { Row };

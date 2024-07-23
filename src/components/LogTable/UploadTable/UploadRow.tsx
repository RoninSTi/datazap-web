import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useLogStore } from '@/store/logs';
import type { LogToBeUploaded } from '@/types/log';
import { humanFileSize } from '@/utils/humanFileSize';

import { FormInput } from '../../FormInput';
import { IconButton } from '../../IconButton';
import { Log as LogIcon } from '../../Icons/Log';
import { Remove } from '../../Icons/Remove';
import { Cell } from '../../Table/Cell';
import { Row } from '../../Table/Row';

type Props = {
  log: LogToBeUploaded;
};

type FormFields = {
  title: string;
  notes: string;
};

const UploadRow: React.FC<Props> = ({ log }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      title: log.title,
    },
  });

  React.useEffect(() => {
    const subscription = watch((value) => {
      const updatedLog = {
        ...log,
        ...value,
      };

      replaceLog(updatedLog);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
      <Row>
        <div className="mr-4 flex items-center">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
          />
        </div>
        <Cell>
          <div className="mr-4 text-borderEmphasis">
            <LogIcon />
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
            <option defaultValue="">Select</option>
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
      </Row>
    </form>
  );
};

export { UploadRow };

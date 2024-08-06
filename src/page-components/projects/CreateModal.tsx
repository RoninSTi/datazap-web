import router from 'next/router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useCreateProject } from '@/api/mutations/projects';
import { FormInput } from '@/components/FormInput';
import { Header } from '@/components/Modal/Header';
import { Modal } from '@/components/Modal/Modal';
import { Switch } from '@/components/Switch';

import { CreateModalFooter } from './CreateModalFooter';

interface Props {
  onClose: () => void;
  show: boolean;
}

type FormFields = {
  name: string;
  description?: string;
  photo?: string;
  isPrivate: boolean;
};

const CreateModal: React.FC<Props> = ({ onClose, show }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormFields>({
    defaultValues: {
      isPrivate: false,
    },
  });

  const createProject = useCreateProject();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await createProject.mutateAsync({
      project: data,
    });

    router.push('/projects');
  };

  const handleSwitchOnChange = (checked: boolean) => {
    setValue('isPrivate', checked);
  };

  const watchIsPrivate = watch('isPrivate');

  return (
    <Modal
      footer={<CreateModalFooter onClose={onClose} />}
      header={<Header title="Create Project" />}
      show={show}
      onClose={onClose}
    >
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput<FormFields>
            className="mb-6"
            errors={errors}
            id="name"
            label="Name"
            name="name"
            placeholder="Name"
            register={register}
            rules={{ required: 'Name is required.' }}
            type="text"
          />
          <FormInput<FormFields>
            className="mb-6"
            id="description"
            errors={errors}
            label="Description"
            name="description"
            placeholder="Description"
            register={register}
            type="text"
          />
          <Switch
            checked={watchIsPrivate}
            onChange={handleSwitchOnChange}
            label="Make Project Private"
            subLabel="Project won’t show on your public profile. You can update these settings later."
          />
        </form>
      </div>
    </Modal>
  );
};

export { CreateModal };

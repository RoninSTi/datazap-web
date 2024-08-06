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
  } = useForm<FormFields>();

  const createProject = useCreateProject();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await createProject.mutateAsync({
      project: data,
    });

    router.push('/projects');
  };

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
            className="mb-2"
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
            id="description"
            errors={errors}
            label="Description"
            name="description"
            placeholder="Description"
            register={register}
            type="text"
          />
          <Switch<FormFields>
            id="isPrivate"
            errors={errors}
            label="Make Project Private"
            name="isPrivate"
            register={register}
            subLabel='Project won’t show on your public profile. You can update these settings later.'
          />
        </form>
      </div>
    </Modal>
  );
};

export { CreateModal };

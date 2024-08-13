import S3 from 'aws-sdk/clients/s3';
import Image from 'next/image';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useCreateProject } from '@/api/mutations/projects';
import { useGetMe } from '@/api/queries/user';
import { FormInput } from '@/components/FormInput';
import { IconButton } from '@/components/IconButton';
import { Trash } from '@/components/Icons/Trash';
import { Header } from '@/components/Modal/Header';
import { Modal } from '@/components/Modal/Modal';
import { Switch } from '@/components/Switch';
import { BodyMediumBold } from '@/components/Typography/BodyMediumBold';

import { CreateModalFooter } from './CreateModalFooter';
import { PhotoDragNDrop } from './PhotoDragNDrop';

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

const s3params = {
  accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
  region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
};

const s3 = new S3(s3params);

const CreateModal: React.FC<Props> = ({ onClose, show }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      isPrivate: false,
    },
  });

  const createProject = useCreateProject();

  const { data: userData } = useGetMe();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await createProject.mutateAsync({
      project: data,
    });

    reset();

    onClose();
  };

  const handleSwitchOnChange = (checked: boolean) => {
    setValue('isPrivate', checked);
  };

  const handleOnFilesSelected = async (file: File) => {
    const params = {
      Bucket: `${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}`,
      Key: `photos/${userData?.user.id}/${file.name}`,
      Body: file,
    };

    const s3upload = s3.upload(params);

    try {
      const uploadedPhoto = await s3upload.promise();

      setValue('photo', uploadedPhoto.Location);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnClickTrash = () => {
    setValue('photo', undefined);
  };

  const watchIsPrivate = watch('isPrivate');

  const watchPhoto = watch('photo');

  return (
    <Modal
      footer={
        <CreateModalFooter onClose={onClose} onSave={handleSubmit(onSubmit)} />
      }
      header={<Header title="Create Project" />}
      show={show}
      onClose={onClose}
    >
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-1 flex-row">
            <div className="mr-10 flex w-[60%] flex-col">
              <FormInput<FormFields>
                className="mb-6"
                inputClassName="w-full"
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
                inputClassName="w-full"
                errors={errors}
                label="Description"
                name="description"
                placeholder="Description"
                register={register}
                type="text"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <BodyMediumBold className="mb-2">Photo</BodyMediumBold>
              {watchPhoto === undefined && (
                <PhotoDragNDrop onFilesSelected={handleOnFilesSelected} />
              )}
              {watchPhoto && (
                <div className="relative flex flex-1 overflow-hidden rounded">
                  <Image
                    className="flex flex-1"
                    src={watchPhoto}
                    alt="Project Image"
                    height={500}
                    width={500}
                    priority
                  />
                  <IconButton
                    className="absolute"
                    onClick={handleOnClickTrash}
                    style={{ bottom: '0.5rem', right: '0.5rem' }}
                    variant="bubble-destructive"
                  >
                    <Trash />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
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

import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useCreateProject } from '@/api/mutations/projects';
import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';

type FormFields = {
  name: string;
  description?: string;
  photo?: string;
};

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const router = useRouter();

  const createProject = useCreateProject();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await createProject.mutateAsync({
      project: data,
    });

    router.push('/projects');
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<FormFields>
          className="mb-2"
          errors={errors}
          id="name"
          label="Name"
          name="name"
          register={register}
          rules={{ required: 'Name is required.' }}
          type="text"
        />
        <FormInput<FormFields>
          id="description"
          errors={errors}
          label="Description"
          name="description"
          register={register}
          type="text"
        />
        <Button className="mt-2 w-full" type="submit" variant="secondary">
          Create this MFer
        </Button>
      </form>
    </div>
  );
};

export { ProjectForm };

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useUpdateUser } from '@/api/mutations/user';
import { useCheckUsername } from '@/api/queries/user';
import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { LogoZ } from '@/components/LogoZ';

import { Check } from './Check';
import { LoadingSpinner } from './LoadingSpinner';
import { OnboardingUpload } from './OnboardingUpload';

type FormFields = {
  username: string;
};

const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>();

  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const updateUser = useUpdateUser();

  const username = watch('username');

  const { data: usernameData, isLoading } = useCheckUsername({ username });

  const handleOnUploadCover = (url: string) => {
    setBackgroundImage(url);
  };

  const handleOnUploadProfile = (url: string) => {
    setImage(url);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await updateUser.mutate({
      username: data.username,
      image,
      backgroundImage,
    });

    router.push('/dashboard');
  };

  const formIndicator = () => {
    if (isLoading) return <LoadingSpinner />;

    if (usernameData?.available) return <Check />;

    return null;
  };

  return (
    <div className="sm:mx-auto">
      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="mb-10 text-textDeemphasis dark:text-darkTextDeemphasis">
          <LogoZ />
        </div>
        <div>
          <span className="text-2xl text-textEmphasis dark:text-darkTextEmphasis">
            Complete your profile.
          </span>
        </div>
        <div>
          <span className="text-xs text-textDeemphasis dark:text-darkTextDeemphasis">
            Choose a username and optionally customize your homepage.
          </span>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput<FormFields>
            className="mb-10"
            errors={errors}
            id="username"
            indicator={formIndicator()}
            label="Username"
            type="text"
            name="username"
            register={register}
            rules={{ required: 'You must select a unique username.' }}
          />
          <div className="mb-2">
            <span className="text-sm font-semibold text-textMain dark:text-darkTextMain">
              Profile photo and cover image.
              <span className="font-normal text-textDeemphasis dark:text-darkTextDeemphasis">
                {'  '}You can always edit this later.
              </span>
            </span>
          </div>
          <OnboardingUpload
            onUploadCover={handleOnUploadCover}
            onUploadProfile={handleOnUploadProfile}
          />
          <Button className="mt-10 w-full" type="submit" variant="primary">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export { OnboardingForm };

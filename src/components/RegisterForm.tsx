import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';
import { z } from 'zod';

import { useRegister } from '@/api/mutations/auth';
import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { LogoZ } from '@/components/LogoZ';

type FormData = {
  email: string;
};

const RegisterSchema: ZodType<FormData> = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
});

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutateAsync } = useRegister();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email } = data;

    try {
      await mutateAsync({ email });

      router.push('/auth/signin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="mb-10 text-textDeemphasis dark:text-darkTextDeemphasis">
          <LogoZ />
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput<FormData>
            className="mb-2"
            errors={errors}
            id="email"
            label="Email"
            name="email"
            register={register}
            rules={{ required: 'Email is required.' }}
            type="text"
          />
          <Button className="mt-2 w-full" type="submit" variant="secondary">
            Continue
          </Button>
        </form>
      </div>
      <div className="text-center">
        <span className="text-[0.68rem] text-textDeemphasis dark:text-darkTextDeemphasis">
          By continuing, you agree to Datazap&apos;s{' '}
          <Link className="text-textMain dark:text-darkTextMain" href="/terms">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            className="text-textMain dark:text-darkTextMain"
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </span>
      </div>
    </div>
  );
};

export { RegisterForm };

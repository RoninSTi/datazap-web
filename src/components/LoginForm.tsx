import Link from 'next/link';

import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { HorizDivider } from '@/components/HorizDivider';
import { LogoZ } from '@/components/LogoZ';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormFields = {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormFields>()

      const onSubmit: SubmitHandler<FormFields> = data => {
        console.log({ data })
      }
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="mb-10 text-textDeemphasis dark:text-darkTextDeemphasis">
          <LogoZ />
        </div>
        <div>
          <span className="text-2xl text-textEmphasis dark:text-darkTextEmphasis">
            Welcome Back!
          </span>
        </div>
        <div>
          <span className="text-xs text-textDeemphasis dark:text-darkTextDeemphasis">
            Don&apos;t have an account?{' '}
            <Link
              className="text-textMain dark:text-darkTextMain"
              href="/register"
            >
              Create one for free
            </Link>
          </span>
        </div>
      </div>
      <GoogleAuthButton className="mb-2 w-full" />
      <Button className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 24 24"
        >
          <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z" />
        </svg>
        <span>Continue With Apple</span>
      </Button>
      <HorizDivider label="OR" />
      <div className="mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput<FormFields> className="mb-2" errors={errors} id="email" label="Email" name="email" register={register} rules={{ required: 'Email is required.'}} type="text" />
          <FormInput<FormFields> id="password" errors={errors} label="Password" name="password" register={register} rules={{ required: 'Password is required.'}} type="password" />
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

export { LoginForm };

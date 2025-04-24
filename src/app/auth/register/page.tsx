'use client';

import { RegisterForm } from '@/components/RegisterForm';

const Login: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-surfacePrimary dark:bg-darkSurfacePrimary">
      <RegisterForm />
    </div>
  );
};

export default Login;

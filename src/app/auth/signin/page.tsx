'use client';

import { LoginForm } from '@/components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-surfacePrimary dark:bg-darkSurfacePrimary">
      <LoginForm />
    </div>
  );
};

export default Login;

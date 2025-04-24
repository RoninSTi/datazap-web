import axios from 'axios';
import { useMutation } from 'react-query';

import type { User } from '@/types/user';

interface RegisterParams {
  email: string;
}

const register = async ({ email }: RegisterParams): Promise<User> => {
  const url = '/api/auth/register';

  const { data } = await axios.post<User>(url, {
    email,
  });

  return data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email }: RegisterParams) => register({ email }),
  });
};

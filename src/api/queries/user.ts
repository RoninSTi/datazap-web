import type { ExtendedUser } from '@prisma/client';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { useQuery } from 'react-query';

type CheckUsernameResponse = {
  available: boolean;
};

export const checkUsername = async ({
  username,
}: {
  username: string;
}): Promise<CheckUsernameResponse> => {
  const url = `/api/user/username/${username}`;

  const { data } = await axios.get<CheckUsernameResponse>(url);

  return data;
};

export const useCheckUsername = ({ username }: { username: string }) => {
  const debouncedUsername = useDebounce(username, 500);

  return useQuery(
    ['checkUsername', debouncedUsername],
    () => checkUsername({ username }),
    {
      enabled: !!username,
      refetchOnWindowFocus: false,
    },
  );
};

export type MeResponse = {
  user: ExtendedUser;
};

export const getMe = async () => {
  const url = '/api/user/me';

  const { data } = await axios.get<MeResponse>(url);

  return data;
};

export const useGetMe = () => {
  return useQuery(['me'], () => getMe());
};

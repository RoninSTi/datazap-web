import type { User } from '@prisma/client';
import axios from 'axios';
import { useMutation } from 'react-query';

type UpdateUserParams = {
  username: string;
  image: string | null;
  backgroundImage: string | null;
};

type UpdateUserResponse = {
  user: User;
};

const updateUser = async ({
  username,
  image,
  backgroundImage,
}: UpdateUserParams): Promise<UpdateUserResponse> => {
  const url = '/api/user';

  const { data } = await axios.put<UpdateUserResponse>(url, {
    username,
    image,
    backgroundImage,
  });

  return data;
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ username, image, backgroundImage }: UpdateUserParams) =>
      updateUser({ username, image, backgroundImage }),
  });
};

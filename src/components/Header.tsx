'use client';

import Image from 'next/image';

import { useGetMe } from '@/api/queries/user';

import DEFAULT_HEADER from '../../public/assets/images/default_header.png';

const Header = () => {
  const { data: userData } = useGetMe();

  return (
    <div className="relative border-b-1 border-solid border-borderDeemphasis bg-surfacePrimary dark:border-darkBorderDeemphasis dark:bg-darkSurfacePrimary">
      <div className="absolute bottom-0 left-0 mb-10 ml-10 h-48 w-48 overflow-hidden rounded-lg bg-purple-100">
        {userData?.user.image && (
          <Image
            src={userData?.user.image}
            alt="profile-image"
            height={192}
            width={192}
          />
        )}
      </div>
      <div>
        <div
          className="w-full bg-cover bg-center xl:h-64"
          style={{
            backgroundImage: `url(${
              userData?.user.userDetails?.backgroundImage || DEFAULT_HEADER.src
            })`,
          }}
        />
        <div className="py-10 pl-72 pr-10">
          <div />
        </div>
      </div>
    </div>
  );
};

export { Header };

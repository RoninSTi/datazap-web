'use client';

import Image from 'next/image';

import { useGetMe } from '@/api/queries/user';

import DEFAULT_HEADER from '../../public/assets/images/default_header.png';
import { Logs } from './Icons/Logs';
import { Projects } from './Icons/Projects';
import { ResourceComsumption } from './ResourceConsumption';
import { LabelUppercaseSmall } from './Typography/LabelUppercaseSmall';

const Header = () => {
  const { data: userData } = useGetMe();

  return (
    <div className="relative h-[412px]  bg-surfacePrimary  dark:bg-darkSurfacePrimary">
      <div className="absolute inset-x-0 bottom-0 mx-10 mb-5">
        <div className="flex w-full flex-row items-end">
          <div className="mr-10 h-auto w-[192px] overflow-hidden rounded-lg">
            {userData?.user.image && (
              <Image
                src={userData?.user.image}
                alt="profile-image"
                height={192}
                width={192}
              />
            )}
          </div>
          <div className="flex w-full flex-row justify-between">
            <div>
              <div className="text-xl font-bold tracking-tight text-textEmphasis dark:text-darkTextEmphasis">
                {userData?.user.userDetails?.username || 'Loading...'}
              </div>
              <LabelUppercaseSmall>Tier 1</LabelUppercaseSmall>
            </div>
            <div className="flex flex-row items-center">
              <ResourceComsumption
                className="mr-10"
                icon={<Logs />}
                label="Logs"
                value={5}
                limit={100}
              />
              <ResourceComsumption
                icon={<Projects />}
                label="Projects"
                value={3}
                limit={5}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="h-[320px] w-full bg-cover bg-center"
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

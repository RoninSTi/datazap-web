import Image from 'next/image';
import { useState } from 'react';

import ONBOARDING_BROWSER_BAR from '../../public/assets/images/onboarding_browser_bar.png';
import ONBOARDING_COVER from '../../public/assets/images/onboarding_cover.png';
import ONBOARDING_PROFILE from '../../public/assets/images/onboarding_profile.png';
import { IconButton } from './IconButton';
import { Edit } from './Icons/Edit';
import { UploadButtonWrapper } from './UploadButtonWrapper';

type Props = {
  onUploadCover: (url: string) => void;
  onUploadProfile: (url: string) => void;
};

const OnboardingUpload: React.FC<Props> = ({
  onUploadCover,
  onUploadProfile,
}) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const handleOnUploadSuccessCover = (url: string) => {
    setCoverUrl(url);
    onUploadCover(url);
  };

  const handleOnUploadSuccessProfile = (url: string) => {
    setProfileUrl(url);
    onUploadProfile(url);
  };

  return (
    <div className="relative w-[420px] overflow-hidden rounded-md">
      <Image
        src={ONBOARDING_BROWSER_BAR}
        alt="onboarding-browser-bar"
        width={420}
        height={27}
      />
      <div
        className="h-[121px] w-[420px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coverUrl || ONBOARDING_COVER.src})` }}
      />
      <div className="relative h-[75px] w-[420px] rounded-b-md bg-surfaceTertiary dark:bg-darkSurfaceTertiary" />
      <div
        className="absolute bottom-[31px] left-[20px] h-[72px] w-[72px] rounded-md bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${profileUrl || ONBOARDING_PROFILE.src})`,
        }}
      />
      <UploadButtonWrapper
        className="absolute bottom-[14px] left-[75px]"
        onUploadSuccess={handleOnUploadSuccessProfile}
      >
        {({ openFileDialog }) => (
          <IconButton onClick={openFileDialog} variant="bubble">
            <Edit />
          </IconButton>
        )}
      </UploadButtonWrapper>
      <UploadButtonWrapper
        className="absolute right-[11px] top-[103px]"
        onUploadSuccess={handleOnUploadSuccessCover}
      >
        {({ openFileDialog }) => (
          <IconButton onClick={openFileDialog} variant="bubble">
            <Edit />
          </IconButton>
        )}
      </UploadButtonWrapper>
    </div>
  );
};

export { OnboardingUpload };

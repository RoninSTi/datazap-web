import { VerticalDivider } from '@/components/VerticalDivider';

import { LogCount } from './LogCount';
import { UploadButton } from './UploadButton';

const PageHeaderActions: React.FC = () => (
  <div className="flex h-full flex-row items-center justify-between gap-6">
    <LogCount />
    <VerticalDivider />
    <UploadButton />
  </div>
);

export { PageHeaderActions };

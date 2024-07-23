import { Header } from '../../Table/Header';
import { HeaderCell } from '../../Table/HeaderCell';

const UploadHeader: React.FC = () => {
  return (
    <Header>
      <div className="flex pr-4">
        <input
          type="checkbox"
          className="h-[18px] w-[18px] rounded-sm bg-transparent accent-darkButtonBgPrimaryActive"
        />
      </div>
      <HeaderCell>File</HeaderCell>
      <HeaderCell>Chart Title</HeaderCell>
      <HeaderCell>Notes</HeaderCell>
      <HeaderCell>Project</HeaderCell>
    </Header>
  );
};

export { UploadHeader };

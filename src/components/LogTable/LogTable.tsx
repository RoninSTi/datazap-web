import { Body } from './Body';
import { Header } from './Header';

const LogTable: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Body />
    </div>
  );
};

export { LogTable };

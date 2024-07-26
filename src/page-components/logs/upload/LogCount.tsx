const LogCount: React.FC = () => (
  <div className="flex flex-row items-center font-semibold text-textMain dark:text-darkTextMain">
    <div className="mr-3 flex flex-row items-center">
      <span className="mr-2">0</span>
      <span className="mr-2 text-textPlaceholder dark:text-darkTextPlaceholder">
        /
      </span>
      <span>5</span>
    </div>
    <div>Logs Added</div>
  </div>
);

export { LogCount };

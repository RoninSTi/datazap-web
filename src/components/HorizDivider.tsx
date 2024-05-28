type Props = {
  label?: string;
};

const HorizDivider: React.FC<Props> = ({ label }) => {
  return (
    <div className="relative my-2 flex items-center py-5">
      {label && (
        <>
          <div className="grow border-t-1 border-borderDeemphasis dark:border-darkBorderDeemphasis" />
          <span className="mx-4 shrink text-xs font-semibold text-textPlaceholder dark:text-darkTextPlaceholder">
            {label}
          </span>
          <div className="grow border-t-1 border-borderDeemphasis dark:border-darkBorderDeemphasis" />
        </>
      )}
      {!label && (
        <div className="grow border-t-1 border-borderDeemphasis dark:border-darkBorderDeemphasis" />
      )}
    </div>
  );
};

export { HorizDivider };

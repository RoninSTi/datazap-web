type Props = {
  className?: string;
  id: string;
  label: string;
};

const FormInput: React.FC<Props> = ({ className = '', id, label }) => {
  return (
    <div className={className}>
      <label className="block" htmlFor={id}>
        <span className="text-xs text-textDeemphasis dark:text-darkTextDeemphasis">
          {label}
        </span>
        <input
          className="dark: mt-1 block w-full rounded-md border-1 border-solid border-surfacePrimary bg-inputBackground dark:border-darkSurfacePrimary dark:bg-darkInputBackground"
          id={id}
        />
      </label>
    </div>
  );
};

export { FormInput };

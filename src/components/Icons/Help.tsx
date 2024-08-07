type Props = {
  height?: number;
  width?: number;
};

export const Help: React.FC<Props> = ({ height = 25, width = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      d="M11 18.5H13V16.5H11V18.5ZM12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM12 20.5C7.59 20.5 4 16.91 4 12.5C4 8.09 7.59 4.5 12 4.5C16.41 4.5 20 8.09 20 12.5C20 16.91 16.41 20.5 12 20.5ZM12 6.5C9.79 6.5 8 8.29 8 10.5H10C10 9.4 10.9 8.5 12 8.5C13.1 8.5 14 9.4 14 10.5C14 12.5 11 12.25 11 15.5H13C13 13.25 16 13 16 10.5C16 8.29 14.21 6.5 12 6.5Z"
      fill="currentColor"
    />
  </svg>
);

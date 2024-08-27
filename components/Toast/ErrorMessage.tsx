import { MdError } from 'react-icons/md';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="toast">
      <MdError color="red" size={36} />
      <span>{message}</span>
    </p>
  );
};

export default ErrorMessage;

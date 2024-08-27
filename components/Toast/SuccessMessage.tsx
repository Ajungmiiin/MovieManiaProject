import { IoIosCheckmarkCircle } from 'react-icons/io';

const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <p className="toast">
      <IoIosCheckmarkCircle color="green" size={36} />
      <span>{message}</span>
    </p>
  );
};

export default SuccessMessage;

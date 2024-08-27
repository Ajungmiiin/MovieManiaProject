import { signOutHandler } from '@/utils/action/action';
import { CiLogout } from 'react-icons/ci';
const LogoutButton = ({
  children,
  cls,
}: {
  children?: React.ReactNode;
  cls?: string;
}) => {
  return (
    <form action={signOutHandler} className={cls}>
      <button className="flex items-center">
        <CiLogout color="fff" className="icon inline-block" size={24} />
        {children}
      </button>
    </form>
  );
};

export default LogoutButton;

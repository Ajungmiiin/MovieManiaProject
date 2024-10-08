import Link from 'next/link';

import { Montserrat } from 'next/font/google';

import NavBar from './NavBar';
import { auth } from '@/auth';

const montserrat = Montserrat({ weight: '900', subsets: ['latin'] });

const MainHeader = async () => {
  const isLoggedIn = await auth();
  return (
    <header className="w-full bg-black fixed z-50">
      <div className="max-w-screen-xl m-auto p-2 text-lg flex justify-between items-center relative">
        {/* Logo */}
        <h1 className={`${montserrat.className} text-white sm:text-3xl`}>
          <Link href="/" className="p-2">
            MOVIEMANIA
          </Link>
        </h1>

        {/* NavBar */}
        <NavBar isLoggedIn={!!isLoggedIn} />
      </div>
    </header>
  );
};

export default MainHeader;

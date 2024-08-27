'use client';

import { useState } from 'react';
import Link from 'next/link';

import { CiSearch, CiUser, CiLogin } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';

import SearchBar from './SearchBar';
import LogoutButton from './authentication/LogoutButton';

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [search, setSearch] = useState<Boolean>(false);
  const toggleSearchState = () => {
    setSearch((prevState) => !prevState);
  };

  return (
    <nav className="sm:w-2/4 lg:w-1/3">
      {/* Mobile Search Bar */}
      {search && (
        <div className="bg-black w-full absolute z-50 left-0 top-0 h-full flex items-center px-2 gap-2 sm:hidden">
          <button
            type="button"
            onClick={toggleSearchState}
            className="p-2 text-white"
          >
            <IoIosArrowBack />
          </button>
          <SearchBar />
        </div>
      )}

      {/* Nav Menu */}
      <ul className="flex justify-between items-center gap-2">
        {/* Mobile SearchBar Toggle BTN */}
        <li
          className="p-2 sm:hidden w-[40px] h-[40px]"
          onClick={toggleSearchState}
        >
          <CiSearch className="icon" color="fff" />
        </li>

        {/* Desktop Search Bar */}
        <li className="hidden sm:block border border-black w-full">
          <SearchBar />
        </li>

        {/* Sign-in / Sign-up */}
        {!isLoggedIn && (
          <li className="p-2 rounded-full ">
            <Link href="/login">
              <CiLogin className="icon" color="fff" />
            </Link>
          </li>
        )}

        {/* LogOut && MyPage */}
        {isLoggedIn && (
          <>
            <li className="p-2 w-[40px] h-[40px]">
              <LogoutButton />
            </li>
            <li className="p-2 w-[40px] h-[40px]">
              <Link href="/my">
                <CiUser color="fff" className="icon" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

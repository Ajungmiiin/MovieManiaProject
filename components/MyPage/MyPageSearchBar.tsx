'use client';

import React, { ChangeEvent, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useDebounce } from '@/hooks/useDebounce';

const MyPageSearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getUserId = searchParams.get('user');

  const debounceValue = useDebounce(search, 500);
  useEffect(() => {
    if (debounceValue.length === 0) {
      console.log('search X');
      router.replace(`${path}?user=${getUserId}`);
    }

    if (debounceValue.length > 0) {
      router.replace(`${path}?user=${getUserId}&search=${debounceValue}`);
    }
  }, [debounceValue]);

  return (
    <div className="px-4 mb-8 w-full relative text-black">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        name="search"
        className="w-full px-3 py-2 text-sm outline-none sm:rounded-none  sm:text-base"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        value={search}
      />
      <button className="absolute right-[20px] top-0 bottom-0">
        <CiSearch className="icon" />
      </button>
    </div>
  );
};

export default MyPageSearchBar;

'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchBar = () => {
  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.current!.value.trim().length === 0) {
      return;
    }

    router.replace(`/search?results=${searchInput.current!.value}`);
  };

  return (
    <form className="w-full relative" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        name="search"
        className="text-black w-full px-3 py-2 rounded-full text-sm outline-none sm:rounded-none  sm:text-base"
        ref={searchInput}
      />
      <button className="absolute right-[10px] top-0 bottom-0">
        <CiSearch className="icon" color="black" />
      </button>
    </form>
  );
};

export default SearchBar;

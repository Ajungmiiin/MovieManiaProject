'use client';

import Link from 'next/link';

const error = () => {
  return (
    <section className="p-8 h-full flex justify-center items-center">
      <div className="w-full text-center">
        <p className="text-2xl font-bold mb-4">잘못된 접근입니다.</p>
        <Link
          href="/"
          className="block w-full py-2 text-center rounded-md text-xl font-bold bg-gray-500 hover:bg-gray-400 transition-all cursor-pointer"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
};

export default error;

'use client';

import { useSession } from 'next-auth/react';
import { movieReview } from './MovieReviewSection';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import { useToast } from '@/hooks/useToast';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const MovieReview = ({ review, id }: { review: movieReview; id: string }) => {
  const path = usePathname();
  const [modal, setModal] = useState<boolean>(false);
  const { data } = useSession();
  const toast = useToast();
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setModal(true);
  };

  console.log(path === '/my');
  const removeReview = async (reviewId: string) => {
    try {
      const response = await fetch('/api/review', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: review.movieId,
          reviewId,
        }),
      });

      const { message } = await response.json();

      if (response.ok) {
        router.refresh();
        toast.success('정상적으로 삭제되었습니다.');
      }
    } catch (error) {
      console.log(error);
      toast.error('잠시후 다시 시도해주세요.');
    }
  };

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <div className="flex justify-between">
            <h3 className="font-bold text-2xl">{review.movieName}</h3>
            <button onClick={() => setModal(false)}>닫기</button>
          </div>
          <div>
            <div className="p-2">
              <strong className="underline">{review.userName}</strong>
            </div>
            <div className="border p-2 rounded-md">
              <p className="text-wrap">{review.comment as string}</p>
            </div>
          </div>
        </Modal>
      )}
      <li className="p-4 bg-gray-800 rounded-md">
        {path.includes('/my') && (
          <Link
            href={`/movie/${review.movieId}`}
            className="text-gray-400 pl-2 cursor-pointer hover:text-gray-300 transition-all"
          >
            {review.movieName}
          </Link>
        )}
        <div className="flex justify-between mb-2 pl-2 py-2 items-center">
          <h4 className=" font-semibold text-xl">{review.userName}</h4>
          {data?.user?.id === review.userId && (
            <button
              className="bg-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-500 transition-all z-50"
              onClick={() => removeReview(id)}
            >
              리뷰 삭제하기
            </button>
          )}
        </div>
        <div
          className="bg-gray-700 rounded-md p-4 cursor-pointer"
          onClick={handleClick}
        >
          <p className=" overflow-hidden text-ellipsis text-nowrap max-h-[100px]">
            {review.comment as string}
          </p>
        </div>
      </li>
    </>
  );
};

export default MovieReview;

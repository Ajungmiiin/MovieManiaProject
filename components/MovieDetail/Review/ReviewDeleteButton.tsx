'use client';

import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

const ReviewDeleteButton = ({
  movieId,
  reviewId,
}: {
  movieId: string;
  reviewId: string;
}) => {
  const toast = useToast();

  const removeReview = async () => {
    try {
      const response = await fetch('/api/review', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: movieId,
          reviewId: reviewId,
        }),
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.success(message);
      }
    } catch (error) {
      toast.error('잠시후 다시 시도해주세요.');
    }
  };

  return (
    <button
      className="bg-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-500 transition-all z-50"
      onClick={removeReview}
    >
      리뷰 삭제하기
    </button>
  );
};

export default ReviewDeleteButton;

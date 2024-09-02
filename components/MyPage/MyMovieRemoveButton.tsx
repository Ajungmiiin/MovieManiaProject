'use client';

import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

interface RemoveButtonProps {
  movieId: string;
  userId: string;
  identifier: string;
}

const MyMovieRemoveButton = ({
  movieId,
  userId,
  identifier,
}: RemoveButtonProps) => {
  const router = useRouter();
  const toast = useToast();
  const removeHandler = async () => {
    const response = await fetch('/api/my', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId,
        userId,
        identifier,
      }),
    });

    const responseMessage = await response.json();

    if (response.ok) {
      location.reload();
      toast.success(responseMessage.message);
    }

    if (!response.ok) {
      toast.error('잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <button
      className="text-center bg-red-700 rounded-md py-2 w-full font-semibold text-sm hover:opacity-90 transition-opacity"
      onClick={removeHandler}
    >
      삭제하기
    </button>
  );
};

export default MyMovieRemoveButton;

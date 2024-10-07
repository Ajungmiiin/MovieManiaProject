'use client';

import { MdBookmarkAdd } from 'react-icons/md';
import { FaCommentDots } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ActionButtonGroup = ({
  movie,
  userId,
}: {
  movie: MovieData;
  userId: string | null;
}) => {
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();

  const movieData = {
    title: movie.title || movie.original_title,
    id: movie.id,
    imageSrc: movie.poster_path || movie.backdrop_path,
  };

  //  액션 관련 fn
  const handleAction = async (type: string) => {
    let requestUrl;

    // 로그인이 안되어 있을 때
    if (!userId) {
      toast.error('로그인 후 이용하실 수 있습니다.');
      setPending(false);
      return;
    }

    // 요청하는 타입에 따라 URL 변화
    switch (type) {
      case 'bookmark':
        requestUrl = '/api/bookmark';
        break;
      case 'watching':
        requestUrl = '/api/watching';
        break;
    }

    setPending(true);

    try {
      console.log(requestUrl);
      const response = await fetch(requestUrl as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          movieData,
        }),
      });

      if (response.ok) {
        const responseMessage = await response.json();
        router.refresh();
        toast.success(responseMessage.message);
        setPending(false);
      }

      if (!response.ok) {
        const message = await response.json();
        toast.error(message.message);
        setPending(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('잠시 후 다시 이용해주세요.');
      setPending(false);
    }
  };

  const handleWrtieReview = () => {
    setPending(true);
    if (!userId) {
      toast.error('로그인 후 이용하실 수 있습니다.');
      setPending(false);
      return;
    }

    // 같은 정보를 재요청하기보다 Params로 데이터를 넘겨줌
    const searchParams = new URLSearchParams();
    searchParams.set('movie', JSON.stringify({ title: movieData.title }));
    router.push(`/movie/${movieData.id}/review?${searchParams.toString()}`);
    setPending(false);
  };

  return (
    <div className="bg-black py-4 flex justify-around border-t  md:justify-start md:gap-6 md:border-t-0 lg:justify-start lg:mb-14">
      {/* 북마크 */}
      <button
        className="movie-detail-action-button disabled:cursor-wait"
        onClick={() => handleAction('bookmark')}
        disabled={pending}
      >
        <MdBookmarkAdd className="w-[40px] h-[40px]" />
        보고싶어요
      </button>

      {/* 리뷰 */}
      <button
        className="movie-detail-action-button"
        onClick={handleWrtieReview}
      >
        <FaCommentDots className="w-[40px] h-[40px]" />
        리뷰남기기
      </button>

      {/* 보고있어요 */}
      <button
        className="movie-detail-action-button"
        onClick={() => handleAction('watching')}
      >
        <IoEyeSharp className="w-[40px] h-[40px]" />
        보고있어요
      </button>
    </div>
  );
};

export default ActionButtonGroup;

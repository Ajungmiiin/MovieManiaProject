import MovieReview from '@/components/MovieDetail/Review/MovieReview';
import MyMovie from '@/components/MyPage/MyMovie';
import MyPageSearchBar from '@/components/MyPage/MyPageSearchBar';
import SearchBar from '@/components/SearchBar';
import { Comment } from '@/type/Review.';
import { getMyPage } from '@/utils/getMyPage';
import Link from 'next/link';
import React, { Key } from 'react';

interface movieType {
  id: string;
  imageSrc: string;
  _id: string;
  title: string;
}

const page = async ({
  params: { identifier },
  searchParams: { user, search },
}: {
  params: { identifier: string };
  searchParams: { user: string; search: string };
}) => {
  const { bookmark, watching, review } = await getMyPage(user);
  let contentTitle;
  let content;

  switch (identifier) {
    case 'bookmark':
      contentTitle = '내가 북마크한 영화';
      content = bookmark;
      break;

    case 'watching':
      contentTitle = '내가 보고 있는 영화';
      content = watching;
      break;

    case 'review':
      contentTitle = '내가 작성한 리뷰';
      content = review;
      break;

    default:
      throw new Error('잘못된 접근입니다.');
  }

  return (
    <section className="p-8">
      <h3 className="text-center text-2xl mb-4 font-bold">{contentTitle}</h3>

      {/* 검색 */}
      <MyPageSearchBar />

      {/* 모든 영화 */}
      {identifier !== 'review' && (
        <ul className="grid grid-cols-2">
          {/* 검색어가 없을 때 */}
          {!search &&
            content.map((movie: movieType) => (
              <MyMovie key={movie._id as unknown as Key} movie={movie} />
            ))}

          {/* 검색어가 있을 때 */}
          {search &&
            content
              .filter((movie: movieType) => movie.title.includes(search))
              .map((movie: movieType) => (
                <MyMovie key={movie._id as unknown as Key} movie={movie} />
              ))}
        </ul>
      )}

      {/* 작성한 모든 리뷰 */}
      {identifier === 'review' && (
        <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {/* 검색어가 없을 때 */}
          {!search &&
            content.map((review: Comment) => (
              <MovieReview key={review._id} review={review} id={review._id} />
            ))}

          {/* 검색어가 있을 때 */}
          {search &&
            content
              .filter((review: Comment) => review.movieName?.includes(search))
              .map((review: Comment) => (
                <MovieReview key={review._id} review={review} id={review._id} />
              ))}
        </ul>
      )}
    </section>
  );
};

export default page;

'use client';

import Link from 'next/link';
import MovieReview from './MovieReview';
import { Comment, movieReviewList } from '@/type/Review.';

const MovieReviewList = ({ reviewList }: { reviewList: movieReviewList }) => {
  return (
    <>
      <ul className="flex flex-col gap-4 md:grid grid-rows-2 grid-cols-2">
        {reviewList.comments.slice(0, 4).map((review: Comment) => (
          <MovieReview
            review={{
              ...review,
              movieName: reviewList.movieName,
              movieId: reviewList.movieId,
            }}
            key={review._id}
            id={review._id}
          />
        ))}
      </ul>
      {reviewList.comments.length > 4 && (
        <Link
          href={`/movie/${reviewList.movieId}/review/all`}
          className="w-full block text-center my-4 text-xl py-2 rounded-md text-gray-400 hover:opacity-80 transition-opacity"
        >
          모든 리뷰보기
        </Link>
      )}
    </>
  );
};

export default MovieReviewList;

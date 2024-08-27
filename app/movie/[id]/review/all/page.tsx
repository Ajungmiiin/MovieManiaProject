import MovieReview from '@/components/MovieDetail/Review/MovieReview';
import { movieReviewList } from '@/type/Review.';
import getMovieReview from '@/utils/getMovieReview';
import React from 'react';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const response = await getMovieReview(id);
  const reviewList: movieReviewList = JSON.parse(response as string);
  return (
    <section className="bg-black text-white h-full p-6">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="font-semibold text-center text-xl mb-6 lg:text-2xl">
          {reviewList.movieName}
          <span className="ml-2">
            {reviewList.comments.length > 20
              ? `(20+)`
              : `(${reviewList.comments.length})`}
          </span>
        </h3>
        <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2">
          {reviewList.comments.map((review) => (
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
      </div>
    </section>
  );
};

export default page;

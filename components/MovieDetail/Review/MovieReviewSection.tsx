import getMovieReview from '@/utils/getMovieReview';
import MovieReviewList from './MovieReviewList';
import { comment } from '@/utils/getMyReview';
export interface movieReview {
  userId?: string;
  userName?: string;
  comment?: string;
  movieName?: string;
  movieId?: string;
  review?: comment;
}

const MovieReviewSection = async ({ id }: { id: string }) => {
  const movieReview = await getMovieReview(id);
  let reviewList;
  if (movieReview) {
    reviewList = JSON.parse(movieReview);
    console.log(reviewList.comments.length);
  }

  if (movieReview === undefined || reviewList.comments.length === 0) {
    return (
      <p className="text-center bg-gray-600 rounded-md p-4 text-lg">
        리뷰가 존재하지 않습니다.
      </p>
    );
  } else {
    return <MovieReviewList reviewList={reviewList} />;
  }
};

export default MovieReviewSection;

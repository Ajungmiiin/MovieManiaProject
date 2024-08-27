import Review from '@/models/Review';
import { connectDB } from './connect';

interface review {
  movieName: string;
  movieId: string;
  userId: string;
  userName: string;
  comment: string;
  _id: string;
}

export interface comment {
  userId: string;
  userName: string;
  comment: string;
  _id: string;
}

export const getMyReview = async (userId: string) => {
  const myReviewList: review[] = [];

  await connectDB();
  const myReview = await Review.find({ 'comments.userId': userId });

  myReview.map(
    (review: { movieName: string; movieId: string; comments: comment[] }) => {
      review.comments.map((comment: comment) => {
        if (comment.userId === userId) {
          return myReviewList.push({
            movieName: review.movieName,
            movieId: review.movieId,
            userId: comment.userId,
            userName: comment.userName,
            comment: comment.comment,
            _id: comment._id.toString(),
          });
        } else {
          return;
        }
      });
    }
  );

  return myReviewList;
};

export default getMyReview;

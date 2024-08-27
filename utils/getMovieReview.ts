import Review from '@/models/Review';
import { connectDB } from './connect';

export default async function getMovieReview(id: string) {
  await connectDB();

  const movieReview = await Review.findOne({ movieId: id });

  if (movieReview) {
    return JSON.stringify(movieReview);
  } else {
    return undefined;
  }
}

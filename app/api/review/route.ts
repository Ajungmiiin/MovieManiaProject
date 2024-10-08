import Review from '@/models/Review';
import mongoose from 'mongoose';

import { revalidatePath } from 'next/cache';

import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (request: NextRequest) => {
  const { movieId, reviewId } = await request.json();
  const objectId = new mongoose.Types.ObjectId(reviewId as string);
  const movie = await Review.findOne({ movieId });

  if (!movie && movie.comments.length === 0) {
    return new NextResponse(
      JSON.stringify({
        message: '질못된 접근입니다.',
      }),
      {
        status: 400,
      }
    );
  }

  try {
    if (movie.comments.length === 1) {
      try {
        await Review.findOneAndDelete({ movieId: movieId });

        revalidatePath(`/movie/${movieId}`, 'layout');
        return new NextResponse(
          JSON.stringify({
            message: '정상적으로 삭제되었습니다.',
          }),
          {
            status: 200,
          }
        );
      } catch (error) {
        return new NextResponse(
          JSON.stringify({
            message: error,
          }),
          {
            status: 400,
          }
        );
      }
    }

    const result = await Review.updateOne(
      { movieId: movieId },
      { $pull: { comments: { _id: objectId } } }
    );

    revalidatePath(`/movie/${movieId}`, 'layout');
    return new NextResponse(
      JSON.stringify({
        message: '정상적으로 삭제되었습니다.',
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        message: err,
      }),
      {
        status: 400,
      }
    );
  }
};

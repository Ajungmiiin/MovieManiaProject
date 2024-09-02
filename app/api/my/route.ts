import BookMark from '@/models/BookMark';
import Watching from '@/models/Watching';
import { connectDB } from '@/utils/connect';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (request: NextRequest) => {
  const { movieId, userId, identifier } = await request.json();

  await connectDB();

  try {
    if (identifier === 'bookmark') {
      await BookMark.updateOne(
        { userId: userId },
        { $pull: { movieList: { id: movieId } } }
      );

      const movieList = await BookMark.findOne({ userId: userId });
      console.log(movieList);
      revalidatePath(`/my`);
      revalidatePath(`/my/bookmark/all`, 'page');

      return new NextResponse(
        JSON.stringify({
          message: '정상적으로 삭제되었습니다.',
        }),
        {
          status: 200,
        }
      );
    }

    if (identifier === 'watching') {
      await Watching.updateOne(
        { userId: userId },
        { $pull: { movieList: { id: movieId } } }
      );

      revalidatePath(`/my`);
      revalidatePath(`/my/watching/all`, 'page');

      return new NextResponse(
        JSON.stringify({
          message: '정상적으로 삭제되었습니다.',
        }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: '잠시 후 다시 시도해주세요.',
      }),
      {
        status: 401,
      }
    );
  }
};

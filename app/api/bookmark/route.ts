import { NextRequest, NextResponse } from 'next/server';

import BookMark from '@/models/BookMark';

import { addUserActivity } from '@/utils/userActivity';
import { revalidatePath } from 'next/cache';

export const POST = async (request: NextRequest) => {
  const { userId, movieData } = await request.json();

  // 로그인 정보가 없을 때
  if (!userId) {
    return new NextResponse(
      JSON.stringify({
        message: '로그인 후 이용하실 수 있습니다.',
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const response = await addUserActivity({
      userId,
      movieData,
      model: BookMark,
    });

    if (response!.result) {
      revalidatePath('/my', 'page');
      return new NextResponse(
        JSON.stringify({ message: '북마크에 추가되었습니다.' }),
        {
          status: 200,
        }
      );
    }

    if (!response!.result) {
      return new NextResponse(JSON.stringify({ message: response!.message }), {
        status: 400,
      });
    }
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
};

import { NextResponse } from 'next/server';
import { connectDB } from './connect';
import { Model, Schema } from 'mongoose';
import findMovieById from './findMovieById';

interface userActivity {
  userId: string;
  movieData: {
    title: string;
    id: string;
    imageSrc: string;
  };
  model: Model<Schema>;
}

export async function addUserActivity({
  userId,
  movieData,
  model,
}: userActivity) {
  await connectDB();

  const existingData = await model.findOne({ userId });

  // DB가 존재하지 않을 때
  if (!existingData) {
    const newDBList = new model({
      userId,
      movieList: [movieData],
    });

    try {
      await newDBList.save();
      return {
        result: true,
      };
    } catch (error) {
      return {
        result: false,
        message: '잠시 후 다시 시도해주세요',
      };
    }
  }

  // DB가 존재 할 때
  if (existingData) {
    try {
      const existingMovieData = await findMovieById({
        model,
        userId,
        movieId: movieData.id.toString(),
      });

      if (existingMovieData) {
        return {
          result: false,
          message: '이미 저장된 영화입니다.',
        };
      }

      await model.findOne({ userId }).updateOne({
        $push: { movieList: movieData },
      });

      return {
        result: true,
      };
    } catch (error) {
      return {
        result: false,
        message: '잠시 후 다시 시도해주세요.',
      };
    }
  }
}

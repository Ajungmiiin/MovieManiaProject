import { Model, Schema } from 'mongoose';

const findMovieById = async ({
  model,
  userId,
  movieId,
}: {
  model: Model<Schema>;
  userId: string;
  movieId: string;
}) => {
  const existingMovieData = await model.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$movieList' },
    { $match: { 'movieList.id': movieId } },
    { $project: { _id: 0, movieList: 1 } },
  ]);

  if (existingMovieData.length > 0) {
    return true;
  }

  if (existingMovieData.length === 0) {
    return false;
  }
};

export default findMovieById;

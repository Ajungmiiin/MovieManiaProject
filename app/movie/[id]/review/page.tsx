import { auth } from '@/auth';
import ReviewForm from '@/components/ReviewForm/ReviewForm';
import Review from '@/models/Review';
import { connectDB } from '@/utils/connect';
import { revalidatePath } from 'next/cache';

const page = ({
  params: { id: movieId },
  searchParams: { movie },
}: {
  params: { id: string };
  searchParams: { movie: string };
}) => {
  const { title } = JSON.parse(movie);

  const writeReview = async (prevState: State, formData: FormData) => {
    'use server';
    const user = await auth();

    if (!user) {
      return {
        error: '유저 정보가 올바르지 않습니다.',
        success: false,
      };
    }

    const commentData = {
      userName: user!.user!.name,
      userId: user!.user!.id,
      comment: formData.get('review'),
    };

    await connectDB();

    const existingData = await Review.findOne({ movieId });

    if (!existingData) {
      const newReview = await new Review({
        movieId: movieId,
        movieName: title as string,
        comments: [commentData],
      });

      try {
        await newReview.save();

        revalidatePath(`/movie/${movieId}`);

        return {
          error: null,
          success: true,
        };
      } catch (error) {
        console.log(error);

        return {
          error: '잠시 후 다시 시도해주세요.',
          success: false,
        };
      }
    }

    try {
      await Review.findOne({ movieId }).updateOne({
        $push: { comments: commentData },
      });

      revalidatePath(`/movie/${movieId}`);

      return {
        error: null,
        success: true,
      };
    } catch (error) {
      console.log(error);

      return {
        error: '잠시 후 다시 시도해주세요.',
        success: false,
      };
    }
  };

  return (
    <section className="h-screen lg:max-w-screen-lg lg:mx-auto lg:border-black lg:border">
      <ReviewForm title={title} action={writeReview} />
    </section>
  );
};

export default page;

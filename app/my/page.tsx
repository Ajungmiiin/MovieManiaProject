import { auth } from '@/auth';
import MovieReview from '@/components/MovieDetail/Review/MovieReview';
import MyMovieList from '@/components/MyPage/MyMovieList';
import LogoutButton from '@/components/authentication/LogoutButton';
import { Comment } from '@/type/Review.';
import { getMyPage } from '@/utils/getMyPage';
import Link from 'next/link';

const page = async () => {
  const loginUser = await auth();
  const { review, bookmark, watching } = await getMyPage(
    loginUser!.user!.id as string
  );

  console.log(bookmark);
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 유저이름 & 로그아웃버튼 */}
      <section className="px-8 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-3xl mr-2">{loginUser!.user!.name}</h3>

          <LogoutButton cls={'p-1'}>
            <span className="pl-2">로그아웃</span>
          </LogoutButton>
        </div>
      </section>

      {/* 유저 활동 (북마크&리뷰 ---) */}
      <section className="px-8">
        <div className="p-4 md:px-[10rem] lg:px-[15rem]">
          <ul className="flex justify-between">
            <li className="text-center text-xl">
              {bookmark.length}
              <span className="block">북마크</span>
            </li>
            <li className="text-center text-xl ">
              {review.length}
              <span className="block">작성한 리뷰</span>
            </li>
            <li className="text-center text-xl ">
              {watching.length}
              <span className="block">보는 중</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 북마크 리스트 */}
      <section className="px-8 py-4">
        <h2 className="text-xl font-bold mb-4 md:text-center md:text-2xl">
          내가 북마크한 영화
        </h2>
        {bookmark.length > 0 && (
          <MyMovieList
            userId={loginUser!.user!.id as string}
            movies={bookmark}
            identifier="bookmark"
          />
        )}
        {bookmark.length === 0 && (
          <Link
            href="/"
            className="block text-center bg-gray-800 py-4 rounded-md font-bold hover:bg-gray-700 transition-all cursor-pointer"
          >
            영화 추가하러 가기
          </Link>
        )}
      </section>

      {/* 보고있는 영화 리스트 */}
      <section className="px-8 py-4">
        <h2 className="text-xl font-bold mb-4 md:text-center md:text-2xl">
          내가 보고있는 영화
        </h2>
        {watching.length > 0 && (
          <MyMovieList
            userId={loginUser!.user!.id as string}
            movies={watching}
            identifier="watching"
          />
        )}
        {watching.length === 0 && (
          <Link
            href="/"
            className="block text-center bg-gray-800 py-4 rounded-md font-bold hover:bg-gray-700 transition-all cursor-pointer"
          >
            영화 추가하러 가기
          </Link>
        )}
      </section>

      {/* 유저가 작성한 리뷰 리스트 */}
      <section className="px-8 py-4">
        <h2 className="mb-4 text-xl font-bold md:text-center md:text-2xl">
          내가 작성한 리뷰
        </h2>
        <ul className="gap-4 flex flex-col md:grid md:grid-cols-2">
          {review.slice(0, 4).map((review: Comment) => (
            <MovieReview key={review._id} review={review} id={review._id} />
          ))}
        </ul>
        {review.length > 4 && (
          <Link
            href={`/my/review/all?user=${loginUser!.user!.id}`}
            className="w-full block text-center my-4 text-xl py-2 rounded-md text-gray-400 hover:opacity-80 transition-opacity"
          >
            모든 리뷰보기
          </Link>
        )}
      </section>
    </div>
  );
};

export default page;

import { fetchMovieDetail } from '@/utils/api/http';

import MovieInfo from '@/components/MovieDetail/MovieInfo';
import CastList from '@/components/MovieDetail/CastList';
import ActionButtonGroup from '@/components/MovieDetail/ActionButtonGroup';
import MovieImage from '@/components/MovieImage';
import MovieReviewSection from '@/components/MovieDetail/Review/MovieReviewSection';
import { auth } from '@/auth';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await auth();
  console.log('movie', user);
  const movieData = await fetchMovieDetail(id);

  return (
    <>
      {/* 영화 전체 정보 */}
      <section className="relative">
        <div className="relative w-full h-[500px]">
          {/* 백드롭 */}
          <div className="absolute bg-gradient-to-b from-transparent to-black bottom-0 left-0 w-full z-[1] h-2/3" />
          {/* 영화 이미지 */}
          <MovieImage
            alt={movieData.title || movieData.name || movieData.original_title}
            src={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
            className="object-cover"
          />
          {/* 영화 제목 & 정보 */}
          <MovieInfo
            title={
              movieData.title || movieData.name || movieData.original_title
            }
            genres={movieData.genres}
            releaseDate={movieData.release_date}
            runtime={movieData.runtime}
          />
        </div>
      </section>

      {/* 액션 버튼 & 영화 오버뷰 */}
      <section className="bgBlack w-full p-6 text-white">
        <div className="max-w-screen-xl mx-auto md:flex md:items-start">
          <div className="md:order-2 md:ml-12">
            {/* 액션버튼 */}
            <ActionButtonGroup
              movie={movieData}
              userId={user?.user?.id || null}
            />
            <div>
              {/* 태그라인 & 오버뷰 */}
              {movieData.tagline && (
                <p className="text-center pt-4 font-semibold text-lg  md:text-2xl md:text-start ">{`" ${movieData.tagline} "`}</p>
              )}

              <p className="text-center pt-4 md:text-lg md:text-start ">
                {movieData.overview}
              </p>
            </div>
          </div>

          {/* 포스터 이미지 */}
          <div className="pt-4 md:order-1 md:pt-0">
            <div className="w-[270px] h-[400px] relative m-auto md:w-[300px]">
              <MovieImage
                src={`https://image.tmdb.org/t/p/w1280${movieData.poster_path}`}
                alt={
                  movieData.title || movieData.name || movieData.original_title
                }
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 출연진 정보 */}
      <section className="bgBlack p-6 text-white ">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">출연/제작</h3>
          <CastList id={id} />
        </div>
      </section>

      {/* 영화리뷰 */}
      <section className="bgBlack p-6 text-white ">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">리뷰</h3>
          <MovieReviewSection id={id} />
        </div>
      </section>
    </>
  );
};

export default page;

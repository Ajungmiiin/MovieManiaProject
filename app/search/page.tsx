import MovieImage from '@/components/MovieImage';
import { getSearchMovie } from '@/utils/api/http';
import Image from 'next/image';
import Link from 'next/link';

const page = async ({
  searchParams: { results },
}: {
  searchParams: { results: string };
}) => {
  const searchResults = await getSearchMovie(results);

  return (
    <section className="p-4 md:p-8">
      <h3 className="text-center text-xl mb-4 md:text-2xl">{`'${results}' 의 검색결과 (${searchResults?.length})`}</h3>
      {searchResults !== null && (
        <ul className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {searchResults!.map((movie) => (
            <li key={movie.id}>
              <Link href={`movie/${movie.id}`}>
                <div className="relative w-[120px] h-[190px] m-auto lg:w-[150px]">
                  <MovieImage
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title || movie.original_title}
                  />
                </div>
                <h4 className="text-center text-lg text-nowrap overflow-hidden overflow-ellipsis mt-1 font-semibold">
                  {movie.title || movie.original_title || movie.name}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default page;

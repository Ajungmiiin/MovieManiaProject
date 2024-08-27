import MovieList from './MovieList';
import { fetchMovie } from '@/utils/api/http';

interface MovieRowProps {
  title: string;
  fetchUrl: string;
}

const MovieRow = async ({ title, fetchUrl }: MovieRowProps) => {
  const movies = await fetchMovie(fetchUrl);

  return (
    <section className="p-4 max-w-screen-xl mx-auto bg-white text-black">
      {/* SECTION TITLE (CATEGORY)*/}
      <div className="flex mb-2">
        <h3 className="pl-3 text-xl font-semibold sm:text-2xl lg:text-2xl">
          {title}
        </h3>
      </div>

      {/* MOVIE LIST */}
      <MovieList movies={movies} />
    </section>
  );
};

export default MovieRow;

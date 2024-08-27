import Link from 'next/link';
import MovieImage from '../MovieImage';
import { MyMovieProps } from './MyMovieList';
import MyMovieRemoveButton from './MyMovieRemoveButton';

const MyMovie = ({
  movie,
  userId,
  identifier,
}: {
  movie: MyMovieProps;
  userId: string;
  identifier: string;
}) => {
  return (
    <li>
      <Link href={`/movie/${movie.id}`}>
        <div className="relative w-[150px] h-[200px] mb-1 mx-auto sm:h-[210px] overflow-hidden rounded-md border-gray-500 md:h-[250px]">
          <MovieImage
            src={`https://image.tmdb.org/t/p/w300${movie.imageSrc}`}
            alt={movie.title}
          />
        </div>
        <h3 className="text-center font-semibold text-white py-2">
          {movie.title}
        </h3>
      </Link>
      <MyMovieRemoveButton
        movieId={movie.id}
        userId={userId}
        identifier={identifier}
      />
    </li>
  );
};

export default MyMovie;

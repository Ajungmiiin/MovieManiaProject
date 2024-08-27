import Link from 'next/link';
import MyMovie from './MyMovie';

export interface MyMovieProps {
  id: string;
  title: string;
  imageSrc: string;
  _id: string;
}

const MyMovieList = ({
  movies,
  identifier,
  userId,
}: {
  movies: MyMovieProps[];
  identifier: string;
  userId: string;
}) => {
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:flex md:justify-around md:gap-4">
        {movies.slice(0, 4).map((movie) => (
          <MyMovie
            movie={movie}
            key={movie._id}
            userId={userId}
            identifier={identifier}
          />
        ))}
      </ul>
      {movies.length > 4 && (
        <Link
          href={`/my/${identifier}/all?user=${userId}`}
          className="block w-full text-center bg-gray-700 rounded-md py-2 mt-6 font-semibold text-lg"
        >
          모두보기
        </Link>
      )}
    </>
  );
};

export default MyMovieList;

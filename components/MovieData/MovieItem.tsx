import Image from 'next/image';
import MovieImage from '../MovieImage';

interface MovieItemProps {
  imageSrc: string;
  title: string;
}

const MovieItem = ({ imageSrc, title }: MovieItemProps) => {
  return (
    <>
      <div className="relative w-full h-[190px] mb-1 mx-auto sm:h-[210px] md:h-[250px] md:w-[180px]">
        <MovieImage
          src={`https://image.tmdb.org/t/p/w300${imageSrc}`}
          alt={title}
          className="border border-gray-200"
        />
      </div>
      {/* Movie Title */}
      <h3 className="text-center text-ellipsis text-nowrap overflow-hidden tracking-tighter sm:text-lg">
        {title}
      </h3>
    </>
  );
};

export default MovieItem;

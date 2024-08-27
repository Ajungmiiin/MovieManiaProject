import React from 'react';

interface MovieInfoProps {
  genres?: { id: number; name: string }[];
  runtime: number;
  releaseDate: string;
  title: string;
}

const MovieInfo = ({ genres, runtime, releaseDate, title }: MovieInfoProps) => {
  const formattedGenres = genres?.map((genre) => genre.name).join(' ˑ ');
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const releaseYear = new Date(releaseDate).getFullYear();

  return (
    <div className="absolute bottom-0 left-0 w-full text-white z-20 px-6  m-auto md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-sm md:text-base">
          <p>{releaseYear}</p>
          <p>{formattedGenres}</p>
          <p>{`${hours}시간 ${minutes}분`}</p>
        </div>
        <h2 className="text-3xl mt-2 font-semibold md:text-4xl">{title}</h2>
      </div>
    </div>
  );
};

export default MovieInfo;

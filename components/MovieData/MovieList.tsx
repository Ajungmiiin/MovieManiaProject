'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import MovieItem from './MovieItem';

export interface movieListProps {
  original_title?: string;
  title: string;
  movieImage?: string;
  id: number;
  imageSrc?: string;
}

const MovieList = ({ movies }: { movies: movieListProps[] }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      modules={[Navigation]}
      navigation={true}
      breakpoints={{
        '470': {
          slidesPerView: 4,
        },
        '640': {
          slidesPerView: 5,
        },
        '1024': {
          slidesPerView: 6,
        },
      }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link href={`/movie/${movie.id}`}>
            {/* Movie Item */}
            <MovieItem
              title={
                (movie.title as string) || (movie.original_title as string)
              }
              imageSrc={
                (movie.movieImage as string) || (movie.imageSrc as string)
              }
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieList;

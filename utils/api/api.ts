import axios from 'axios';

export const getMovieData = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'ko-KR',
  },
  headers: {
    accept: 'application/json',
  },
});

export const requests = [
  {
    title: '현재 상영작',
    fetchUrl: 'movie/now_playing',
  },
  {
    title: '지금 뜨는 영화',
    fetchUrl: '/trending/all/week',
  },
  {
    title: '인기영화',
    fetchUrl: '/movie/top_rated',
  },
  {
    title: '액션',
    fetchUrl: '/discover/movie?with_genres=28',
  },
  {
    title: '코미디',
    fetchUrl: '/discover/movie?with_genres=35',
  },
  {
    title: '공포',
    fetchUrl: '/discover/movie?with_genres=27',
  },
  {
    title: '로맨스',
    fetchUrl: '/discover/movie?with_genres=10749',
  },
  {
    title: '다큐',
    fetchUrl: '/discover/movie?with_genres=99',
  },
];

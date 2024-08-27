import { getMovieData } from './api';

export const fetchMovie = async (fetchUrl: string) => {
  const response = await getMovieData.get(fetchUrl);

  const data = response.data.results;

  // 리스트를 출력하는 데 필요한 데이터만 뽑아서 리턴
  const movieData = data.map((movie: MovieData) => {
    // 가끔 받아온 데이터에서 title , original_title 대신 name이 있는 경우가 있음
    if (!movie.title || !movie.original_title) {
      return {
        original_title: movie.original_title,
        title: movie.name,
        movieImage: movie.poster_path,
        id: movie.id,
      };
    }

    return {
      original_title: movie.original_title,
      title: movie.title,
      movieImage: movie.poster_path,
      id: movie.id,
    };
  });

  return movieData;
};

export const fetchMovieDetail = async (id: string) => {
  // 영화 정보를 받아옴
  const { data: movieData } = await getMovieData.get<MovieData>(`/movie/${id}`);

  return movieData;
};

export const getSearchMovie = async (searchTerm: string) => {
  if (searchTerm === null) {
    return null;
  }

  const response = await getMovieData.get<{ results: MovieData[] }>(
    `/search/multi?include_adult=false&query=${searchTerm}`
  );
  const data = response.data;

  return data.results;
};

export const getCastList = async (id: string) => {
  // 영화에 참여한 사람들 목록
  const {
    data: { crew, cast },
  } = await getMovieData.get<{ crew: CastData[]; cast: CastData[] }>(
    `/movie/${id}/credits`
  );

  // 감독과 상위 주요 배우 5명만 추려서 리스트로 만듬
  const castList = [
    crew.find((member: CastData) => member.job === 'Director'),
    ...cast.slice(0, 5),
  ];

  return castList;
};

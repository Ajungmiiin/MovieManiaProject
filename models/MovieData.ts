interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  status?: string;
  production_countries?: { iso_3166_1: string; name: string }[];
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  runtime: number;
  tagline?: string;
}

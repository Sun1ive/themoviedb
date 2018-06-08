interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
/* eslint-disable-next-line */
export interface IApiState {
  page: number;
  movies: IMovie[];
}

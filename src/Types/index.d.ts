export interface IMovie {
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

export interface IGenre {
  id: number;
  name: string;
}

export interface IApiState {
  page: number;
  movies: IMovie[];
  genres: IGenre[];
  totalResults: number;
}

export interface IApiResponseObject {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IAppState {
  favorites: number[];
}

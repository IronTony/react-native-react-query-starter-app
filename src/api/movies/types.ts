export type MoviesRequestPayload = {
  limit?: number;
};

export type MoviesSuccessPayload = {
  id: string;
  title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  rt_score: string;
  people: string;
  species: string;
  locations: string;
  url: string;
};

export type MovieDetailsRequestPayload = {
  movieId?: string;
};

export type MovieDetailsSuccessPayload = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people?: string[] | null;
  species?: string[] | null;
  locations?: string[] | null;
  vehicles?: string[] | null;
  url: string;
};

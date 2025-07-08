
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //  Trending Movies
    getTrendingMovies: builder.query<any, void>({
      query: () => `trending/movie/day?api_key=${TMDB_API_KEY}`,
    }),

    //  Search Movies by Query
    getSearchMovies: builder.query<any, string>({
      query: (q) =>
        `search/movie?query=${encodeURIComponent(q)}&api_key=${TMDB_API_KEY}`,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useLazyGetSearchMoviesQuery: useLazySearchMoviesQuery,
} = tmdbApi;


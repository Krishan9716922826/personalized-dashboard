import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query({
      query: (category: string) =>
        `top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`,
    }),
    getSearchResults: builder.query({
      query: (q: string) => `everything?q=${q}&apiKey=${NEWS_API_KEY}`,
    }),
  }),
});


export const {
  useGetTopHeadlinesQuery,
  useLazyGetSearchResultsQuery: useLazySearchNewsQuery,
} = newsApi;


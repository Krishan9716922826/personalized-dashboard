"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLazySearchNewsQuery } from "@/services/newsApi";
import { useLazySearchMoviesQuery } from "@/services/tmdbApi";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [searchNews, { data: newsData }] = useLazySearchNewsQuery();
  const [searchMovies, { data: movieData }] = useLazySearchMoviesQuery();

  useEffect(() => {
    if (q) {
      searchNews(q);
      searchMovies(q);
    }
  }, [q]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Results for: {q}</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">News Results</h2>
        {newsData?.articles?.slice(0, 5).map((item: any, idx: number) => (
          <div key={idx} className="border p-3 rounded bg-gray-50 dark:bg-gray-800 mb-2">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            <a href={item.url} target="_blank" className="text-blue-500 text-sm underline">
              Read More
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Movie Results</h2>
        {movieData?.results?.slice(0, 5).map((movie: any) => (
          <div key={movie.id} className="border p-3 rounded bg-gray-50 dark:bg-gray-800 mb-2">
            <p className="font-semibold">{movie.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {movie.overview?.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

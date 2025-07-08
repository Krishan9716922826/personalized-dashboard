"use client";

import { useState, useEffect } from "react";
import { useLazySearchNewsQuery } from "@/services/newsApi";
import { useLazySearchMoviesQuery } from "@/services/tmdbApi";
import { usePathname } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [triggerNews, { data: newsData, isFetching: loadingNews }] =
    useLazySearchNewsQuery();
  const [triggerMovies, { data: movieData, isFetching: loadingMovies }] =
    useLazySearchMoviesQuery();

  const pathname = usePathname();

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        triggerNews(query);
        triggerMovies(query);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, triggerNews, triggerMovies]);

  // Clear query when route/path changes
  useEffect(() => {
    setQuery("");
  }, [pathname]);

  return (
    <div className="fixed top-2 left-64 right-4 z-50">
      <input
        type="text"
        placeholder="Search news or movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded-md border bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
      />

      {query.length > 2 && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded p-3 shadow-lg max-h-96 overflow-y-auto">
          {(loadingNews || loadingMovies) && (
            <p className="text-sm text-gray-500">Searching...</p>
          )}

          {/* News Results */}
          {newsData?.articles?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md font-bold mb-2">📰 News Results</h3>
              {newsData.articles
                .slice(0, 5)
                .map((article: any, idx: number) => (
                  <a
                    key={`news-${idx}`}
                    href={article.url}
                    className="block text-blue-600 dark:text-blue-300 hover:underline text-sm mb-1"
                  >
                    {article.title}
                  </a>
                ))}
            </div>
          )}

          {/* Movie Results */}
          {movieData?.results?.length > 0 && (
            <div>
              <h3 className="text-md font-bold mb-2">🎬 Movie Results</h3>
              {movieData.results.slice(0, 5).map((movie: any) => (
                <a
                  key={movie.id}
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  className="flex items-center gap-2 mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-14 rounded object-cover"
                    />
                  )}
                  <span className="text-sm text-gray-800 dark:text-white">
                    {movie.title}
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loadingNews &&
            !newsData?.articles?.length &&
            !movieData?.results?.length && (
              <p className="text-sm text-gray-500">No results found.</p>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


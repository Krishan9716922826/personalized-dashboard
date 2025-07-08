
"use client";

import { useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useGetTopHeadlinesQuery } from "@/services/newsApi";
import { useGetTrendingMoviesQuery } from "@/services/tmdbApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

const TrendingSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<"movies" | "news">("movies");

  const categories = useAppSelector((state) => state.preferences.selectedCategories);
  const category = categories.length > 0 ? categories[0] : skipToken;

  const { data: movieData, isLoading: movieLoading } = useGetTrendingMoviesQuery();
  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery(category);

  const isLoading = activeTab === "movies" ? movieLoading : newsLoading;

  return (
    <div className="mt-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🔥 Trending</h2>
        <button
          className="text-sm text-blue-500 underline"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>

      {isVisible && (
        <>
          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            <button
              className={`px-3 py-1 rounded text-sm font-semibold ${
                activeTab === "movies"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("movies")}
            >
              Movies
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-semibold ${
                activeTab === "news"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("news")}
            >
              News
            </button>
          </div>

          {/* Loading Skeletons */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-52 rounded animate-pulse bg-gray-200 dark:bg-gray-700"
                ></div>
              ))}
            </div>
          )}

          {/* Movies Grid */}
          {!isLoading && activeTab === "movies" && movieData?.results && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movieData.results.slice(0, 6).map((movie: any) => (
                <div
                  key={`movie-${movie.id}`}
                  className="bg-white dark:bg-gray-800 p-3 rounded shadow hover:shadow-lg transition transform hover:scale-105"
                >
                  <p className="font-semibold">{movie.title}</p>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "/fallback.jpg"
                    }
                    alt={movie.title}
                    className="mt-2 rounded w-full h-40 object-cover"
                  />
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-300 line-clamp-2">
                    {movie.overview}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* News Grid */}
          {!isLoading && activeTab === "news" && newsData?.articles && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData.articles.slice(0, 6).map((article: any, idx: number) => (
                <div
                  key={`news-${idx}`}
                  className="bg-white dark:bg-gray-800 p-3 rounded shadow hover:shadow-lg transition transform hover:scale-105"
                >
                  <p className="font-semibold">{article.title}</p>
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="mt-2 w-full h-40 object-cover rounded"
                    />
                  )}
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-300 line-clamp-2">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline block mt-1"
                  >
                    Read More
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendingSection;

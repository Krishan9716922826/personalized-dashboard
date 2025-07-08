

"use client";

import { useGetTrendingMoviesQuery } from "@/services/tmdbApi";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addFavorite, removeFavorite } from "@/features/favorites/favoritesSlice";
import { motion } from "framer-motion";

const MovieFeed = () => {
  const { data, error, isLoading } = useGetTrendingMoviesQuery();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  if (isLoading) return <p className="p-4">Loading trending movies...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load movies.</p>;

  return (
    <div className="mt-8 p-4 space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold"
      >
        🎬 Trending Movies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.results?.slice(0, 5).map((movie: any, idx: number) => {
          const id = movie.id.toString();
          const isFavorite = favorites.some((fav) => fav.id === id);

          const handleToggleFavorite = () => {
            const payload = {
              id,
              title: movie.title,
              description: movie.overview,
              image: movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "",
              type: "movie" as const,
            };

            isFavorite
              ? dispatch(removeFavorite(id))
              : dispatch(addFavorite(payload));
          };

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="border rounded p-4 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {movie.overview?.slice(0, 100)}...
              </p>

              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="mt-2 rounded"
                />
              ) : (
                <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-gray-600 dark:text-gray-400">
                  No Image
                </div>
              )}

              <button
                onClick={handleToggleFavorite}
                className={`text-sm mt-3 block ${
                  isFavorite
                    ? "text-red-500 hover:text-red-700"
                    : "text-pink-500 hover:text-pink-700"
                }`}
              >
                {isFavorite ? "❌ Remove" : "❤️ Add to Favorites"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieFeed;

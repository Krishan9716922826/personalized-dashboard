"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "@/features/favorites/favoritesSlice";
import { motion } from "framer-motion";

const NEWS_CACHE: Map<string, { expires: number; articles: any[] }> = new Map();
const TTL = 15 * 60 * 1000; // 15 minutes
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const NewsFeed = () => {
  const categories = useAppSelector((state) => state.preferences.selectedCategories);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const [newsData, setNewsData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!categories.length) return;

    const fetchAllNewsSequential = async () => {
      setLoading(true);
      const newsByCategory: Record<string, any[]> = {};

      for (const cat of categories) {
        const cached = NEWS_CACHE.get(cat);
        if (cached && cached.expires > Date.now()) {
          newsByCategory[cat] = cached.articles;
          continue;
        }

        try {
          const res = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${cat}&country=us&pageSize=5&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
          );
          const json = await res.json();
          newsByCategory[cat] = json.articles || [];

          NEWS_CACHE.set(cat, {
            articles: json.articles || [],
            expires: Date.now() + TTL,
          });

          await delay(1100); // Respect NewsAPI limit
        } catch (err) {
          console.error(`News fetch failed for ${cat}:`, err);
          newsByCategory[cat] = [];
        }
      }

      if (isMounted) {
        setNewsData(newsByCategory);
        setLoading(false);
      }
    };

    fetchAllNewsSequential();

   
    return () => {
      isMounted = false;
    };
  }, [categories]);

  if (loading) return <p className="p-4">Loading news...</p>;
  if (!categories.length) {
    return <p className="p-4 text-gray-500 italic">No categories selected.</p>;
  }

  return (
    <div className="p-4 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6"
      >
        📰 Your Personalized Feed
      </motion.h1>

      {categories.map((category) => {
        const articles = newsData[category] || [];

        if (!articles.length) {
          return (
            <p key={category} className="text-gray-500 italic">
              No news found for {category}.
            </p>
          );
        }

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold capitalize mb-4 border-b border-gray-700 pb-1">
              {category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((article: any, idx: number) => {
                const isFavorite = favorites.some((fav) => fav.url === article.url);

                const handleToggleFavorite = () => {
                  if (isFavorite) {
                    dispatch(removeFavorite(article.url));
                  } else {
                    dispatch(
                      addFavorite({
                        id: article.url,
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        image: article.urlToImage,
                        type: "news",
                      })
                    );
                  }
                };

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {article.description?.slice(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm underline hover:text-blue-800"
                      >
                        Read More
                      </a>
                      <button
                        onClick={handleToggleFavorite}
                        className={`text-sm ${
                          isFavorite
                            ? "text-red-500 hover:text-red-700"
                            : "text-pink-500 hover:text-pink-700"
                        }`}
                      >
                        {isFavorite ? "❌ Remove" : "💗 Add"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NewsFeed;



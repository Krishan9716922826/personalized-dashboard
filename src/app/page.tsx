import MovieFeed from "@/components/MovieFeed";
import NewsFeed from "@/components/NewsFeed";
import TrendingSection from "@/components/TrendingSection";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Personalized Feed</h1>
      <NewsFeed />
      <MovieFeed />
      <TrendingSection />
    </div>
  );
}

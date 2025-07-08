

"use client";

import DraggableFavorites from "@/components/DraggableFavorites";

export default function FavoritesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">⭐ Your Favorites</h1>
      <DraggableFavorites />
    </div>
  );
}


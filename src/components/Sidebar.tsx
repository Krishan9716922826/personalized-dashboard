"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { toggleCategory, toggleDarkMode } from "@/features/preferences/preferencesSlice";
import Link from "next/link";

const categories = ["technology", "sports", "finance", "health", "entertainment"];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.preferences.selectedCategories);
  const darkMode = useAppSelector(state => state.preferences.darkMode);

  return (
    <aside className="w-64 min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Dashboard</h2>

      <nav className="flex flex-col gap-2 mb-6">
        <Link href="/" className="hover:underline text-sm text-gray-700 dark:text-gray-300">Home</Link>
        <Link href="/favorites" className="hover:underline text-sm text-gray-700 dark:text-gray-300">Favorites</Link>
        <Link href="/settings" className="hover:underline text-sm text-gray-700 dark:text-gray-300">Settings</Link>
      </nav>

      <div className="mb-6">
        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Categories</p>
        {categories.map(category => (
          <label key={category} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => dispatch(toggleCategory(category))}
            />
            {category}
          </label>
        ))}
      </div>

      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
      >
        {darkMode ? "Switch to Light" : "Switch to Dark"}
      </button>
    </aside>
  );
};

export default Sidebar;

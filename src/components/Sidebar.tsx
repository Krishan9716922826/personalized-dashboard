"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  toggleCategory,
  toggleDarkMode,
} from "@/features/preferences/preferencesSlice";
import Link from "next/link";
import { Menu } from "lucide-react";

const categories = [
  "technology",
  "sports",
  "finance",
  "health",
  "entertainment",
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.preferences.selectedCategories
  );
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  return (
    <aside
      className={`sticky top-0 h-screen transition-all duration-300 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700
    ${isCollapsed ? "w-16" : "w-64"} p-4 flex flex-col gap-4 overflow-y-auto`}
    >
      {/* Header with toggle button */}
      <div className="flex justify-between items-center">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="text-gray-600 dark:text-gray-300 focus:outline-none"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="hover:underline text-sm text-gray-700 dark:text-gray-300"
        >
          {!isCollapsed && "Home"}
        </Link>
        <Link
          href="/favorites"
          className="hover:underline text-sm text-gray-700 dark:text-gray-300"
        >
          {!isCollapsed && "Favorites"}
        </Link>
        <Link
          href="/settings"
          className="hover:underline text-sm text-gray-700 dark:text-gray-300"
        >
          {!isCollapsed && "Settings"}
        </Link>
      </nav>

      {/* Category Toggles */}
      {!isCollapsed && (
        <div>
          <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
            Categories
          </p>
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-1"
            >
              <input
                type="checkbox"
                checked={selected.includes(category)}
                onChange={() => dispatch(toggleCategory(category))}
              />
              {category}
            </label>
          ))}
        </div>
      )}

      {/* Dark Mode Toggle */}
      {!isCollapsed && (
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 mt-auto"
        >
          {darkMode ? "Switch to Light" : "Switch to Dark"}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;

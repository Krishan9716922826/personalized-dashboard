# 🧠 Personalized Dashboard

A customizable content dashboard built with [Next.js](https://nextjs.org), enabling users to explore and manage personalized news, movies, and more with theme toggling, search, favorites, and responsive UI.

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-1.9+-38b2ac?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Features

- 🔥 **Trending Section** — Explore top headlines and popular movies
- 📰 **Personalized News Feed** — News by user-selected categories
- 🎬 **Movies Feed** — Trending movies from TMDB API
- 💗 **Favorites Management** — Save, remove, reorder (drag-and-drop)
- 🎨 **Theme Customization** — Toggle dark/light mode
- 🔍 **Search Functionality** — Filter your favorite items
- 🧠 **Persistent State** — Redux Toolkit + LocalStorage
- 📱 **Responsive Design** — Mobile-friendly layout

---

## 🚀 Getting Started

Install dependencies and run the development server:

```bash
# Install packages
npm install

# Start the dev server
npm run dev

```
---

## project structure
src/
├── app/              # Next.js App Router (Pages + Layouts)
├── components/       # Shared and UI components
├── features/         # Feature-specific slices and components (e.g., favorites, preferences)
├── hooks/            # Custom React/Redux hooks
├── services/         # RTK Query APIs (e.g., TMDB, NewsAPI)
├── store/            # Redux store configuration and slices
├── types/            # Global TypeScript types
├── utils/            # Utility functions

---

## 🔄 User Flow

1. **Landing Page**: View personalized dashboard with trending content.
2. **Content Selection**: Choose categories for news and explore movie suggestions.
3. **Favorites**: Add and reorder your favorite items using drag-and-drop.
4. **Customization**: Toggle between dark/light themes and select your content preferences.
5. **Responsive**: Enjoy a seamless experience on all devices.






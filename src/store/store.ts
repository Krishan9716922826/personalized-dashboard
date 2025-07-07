import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/features/preferences/preferencesSlice";
// import contentReducer from "@/features/content/contentSlice"; // add later
// import favoritesReducer from "@/features/favorites/favoritesSlice"; // add later

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    // content: contentReducer,
    // favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

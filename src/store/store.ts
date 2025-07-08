
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import preferencesReducer from "@/features/preferences/preferencesSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import { newsApi } from "@/services/newsApi";
import { tmdbApi } from "@/services/tmdbApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // localStorage for web

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["preferences", "favorites"], // only persist these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(newsApi.middleware, tmdbApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

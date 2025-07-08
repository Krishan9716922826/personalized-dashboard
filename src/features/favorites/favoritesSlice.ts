// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface FavoriteItem {
//   id: string;
//   title: string;
//   type: "news" | "movie";
//   url?: string;
//   description?: string;
//   image?: string;
// }

// interface FavoritesState {
//   items: FavoriteItem[];
// }

// const initialState: FavoritesState = {
//   items: [],
// };

// const favoritesSlice = createSlice({
//   name: "favorites",
//   initialState,
//   reducers: {
//     addFavorite(state, action: PayloadAction<FavoriteItem>) {
//       const payloadWithId = {
//         ...action.payload,
//         id: action.payload.id || `${action.payload.title}-${Date.now()}`,
//       };
//       const exists = state.items.some((item) => item.id === payloadWithId.id);
//       if (!exists) state.items.push(payloadWithId);
//     },
//     removeFavorite(state, action: PayloadAction<string>) {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     reorderFavorites(state, action: PayloadAction<number[]>) {
//       const reordered = action.payload.map((index) => state.items[index]);
//       state.items = reordered;
//     },
//   },
// });

// export const { addFavorite, removeFavorite, reorderFavorites } =
//   favoritesSlice.actions;
// export default favoritesSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: string;
  title: string;
  type: "news" | "movie";
  url?: string;
  description?: string;
  image?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      const payloadWithId = {
        ...action.payload,
        id: action.payload.id || `${action.payload.title}-${Date.now()}`,
      };
      const exists = state.items.some((item) => item.id === payloadWithId.id);
      if (!exists) state.items.push(payloadWithId);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    reorderFavorites(state, action: PayloadAction<number[]>) {
      const reordered = action.payload.map((index) => state.items[index]);
      state.items = reordered;
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

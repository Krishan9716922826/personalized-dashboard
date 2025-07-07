import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  selectedCategories: string[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  selectedCategories: ["technology", "sports"], // default
  darkMode: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleCategory, toggleDarkMode } = preferencesSlice.actions;
export default preferencesSlice.reducer;

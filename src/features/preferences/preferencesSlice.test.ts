import preferencesReducer, {
  toggleCategory,
  toggleDarkMode,
} from "./preferencesSlice";

// 👇 Add this: mock getItem to always return null
beforeEach(() => {
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  localStorage.clear();
});

describe("preferencesSlice", () => {
  const initialState = {
    selectedCategories: [],
    darkMode: false,
  };

  it("should return the initial state", () => {
    expect(preferencesReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should toggle a category ON", () => {
    const newState = preferencesReducer(initialState, toggleCategory("technology"));
    expect(newState.selectedCategories).toContain("technology");
  });

  it("should toggle the same category OFF", () => {
    const stateWithCategory = {
      ...initialState,
      selectedCategories: ["technology"],
    };
    const newState = preferencesReducer(stateWithCategory, toggleCategory("technology"));
    expect(newState.selectedCategories).not.toContain("technology");
  });

  it("should toggle dark mode", () => {
    const newState = preferencesReducer(initialState, toggleDarkMode());
    expect(newState.darkMode).toBe(true);
  });
});

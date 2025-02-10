import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserState } from "../../types/types";

const initialState: UserState = {
  personalizeSources: [],
  personalizeCategories: [],
  personalizeAuthors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSource: (state, action: PayloadAction<string>) => {
      if (!state.personalizeSources.includes(action.payload)) {
        state.personalizeSources.push(action.payload);
      }
    },
    removeSource: (state, action: PayloadAction<string>) => {
      state.personalizeSources = state.personalizeSources.filter(
        (source) => source !== action.payload,
      );
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.personalizeCategories.includes(action.payload)) {
        state.personalizeCategories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.personalizeCategories = state.personalizeCategories.filter(
        (category) => category !== action.payload,
      );
    },
    addAuthor: (state, action: PayloadAction<string>) => {
      if (!state.personalizeAuthors.includes(action.payload)) {
        state.personalizeAuthors.push(action.payload);
      }
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      state.personalizeAuthors = state.personalizeAuthors.filter(
        (author) => author !== action.payload,
      );
    },
  },
});

export const {
  addSource,
  removeSource,
  addCategory,
  removeCategory,
  addAuthor,
  removeAuthor,
} = userSlice.actions;

export default userSlice.reducer;

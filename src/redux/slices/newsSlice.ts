import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NewsState, SetNewsDataPayload } from "../../types/types";

const initialState: NewsState = {
  newsData: [],
  loading: false,
  loadMore: false,
  error: null,
  noMoreArticles: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsData: (state, action: PayloadAction<SetNewsDataPayload>) => {
      const { payload = [], shouldAppend = false } = action.payload || {};
      if (payload.length === 0 && shouldAppend) {
        state.noMoreArticles = true;
        state.loadMore = false;
      } else {
        state.newsData = shouldAppend
          ? [...state.newsData, ...payload]
          : payload;
        state.noMoreArticles = false;
      }
      state.loadMore = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loadMore = false;
    },
    setLoadMore: (state, action: PayloadAction<boolean>) => {
      state.loadMore = action.payload;
    },
  },
});

export const { setNewsData, setLoading, setError, setLoadMore } =
  newsSlice.actions;

export default newsSlice.reducer;

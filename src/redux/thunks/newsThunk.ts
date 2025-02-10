import { Dispatch } from "@reduxjs/toolkit";

import { getGuardianNews, getNewsApiNews, getNYTNews } from "../../services/services";
import {
  extractGuardianArticles,
  extractNycArticles,
  extractWsjArticles,
} from "../../utils/utilities";
import {
  setError,
  setLoading,
  setLoadMore,
  setNewsData,
} from "../slices/newsSlice";
import { NewsFilters } from "../../types/types";

export const fetchAllNews = (filters: NewsFilters, isMore: boolean) => async (dispatch: Dispatch) => {
  if (!isMore) {
    dispatch(setNewsData({ payload: [], shouldAppend: false }));
    dispatch(setLoading(true));
  } else {
    dispatch(setLoadMore(true));
  }

  try {
    const results = await Promise.allSettled([
      getNewsApiNews(filters),
      getGuardianNews(filters),
      getNYTNews(filters),
    ]);

    const successfulData = results.map((result, index) => {
      let sourceName = "";
      if (index === 0) sourceName = "newsApi";
      if (index === 1) sourceName = "guardian";
      if (index === 2) sourceName = "nyt";

      if (sourceName === "newsApi" && result.status === "fulfilled") {
        return result.value?.articles?.map((el: any) =>
          extractWsjArticles(el, filters.category)
        );
      } else if (sourceName === "guardian" && result.status === "fulfilled") {
        return result.value?.response?.results?.map((el: any) =>
          extractGuardianArticles(el, filters.category)
        );
      } else if (sourceName === "nyt" && result.status === "fulfilled") {
        return result.value?.response?.docs?.map((el: any) =>
          extractNycArticles(el, filters.category)
        );
      }
      return [];
    });

    if (successfulData.length > 0) {
      const mergedData = successfulData.flat().sort((a, b) => {
        return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
      });
      dispatch(setNewsData({ payload: mergedData, shouldAppend: isMore }));
    } else {
      dispatch(setError("Failed to fetch news from all sources"));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchNewsApiNews = (filters: NewsFilters, isMore: boolean) => async (dispatch: Dispatch) => {
  if (!isMore) {
    dispatch(setNewsData({ payload: [], shouldAppend: false }));
    dispatch(setLoading(true));
  } else {
    dispatch(setLoadMore(true));
  }

  try {
    const data = await getNewsApiNews(filters);
    const newData = data?.articles?.map((el: any) =>
      extractWsjArticles(el, filters.category)
    );
    dispatch(setNewsData({ payload: newData, shouldAppend: isMore }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchGuardianNews = (filters: NewsFilters, isMore: boolean) => async (dispatch: Dispatch) => {
  if (!isMore) {
    dispatch(setNewsData({ payload: [], shouldAppend: false }));
    dispatch(setLoading(true));
  } else {
    dispatch(setLoadMore(true));
  }
  try {
    const data = await getGuardianNews(filters);
    const newData = data?.response?.results?.map((el: any) =>
      extractGuardianArticles(el, filters.category)
    );
    dispatch(setNewsData({ payload: newData, shouldAppend: isMore }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchNytNews = (filters: NewsFilters, isMore: boolean) => async (dispatch: Dispatch) => {
  if (!isMore) {
    dispatch(setNewsData({ payload: [], shouldAppend: false }));
    dispatch(setLoading(true));
  } else {
    dispatch(setLoadMore(true));
  }
  try {
    const data = await getNYTNews(filters);
    const newData = data?.response?.docs?.map((el: any) =>
      extractNycArticles(el, filters.category)
    );
    dispatch(setNewsData({ payload: newData, shouldAppend: isMore }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

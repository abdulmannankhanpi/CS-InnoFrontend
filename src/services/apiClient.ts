import axios, { AxiosInstance, AxiosResponse } from "axios";

import { BASE_URLS } from "./endpoints";
import { ApiKeys } from "../types/types";

const apiClient: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchNews = async (
  baseUrlKey: keyof typeof BASE_URLS,
  params: Record<string, any> = {}
): Promise<any> => {
  try {
    const baseUrl = BASE_URLS[baseUrlKey];
    const apiKeys: ApiKeys = {
      NEWSAPI: import.meta.env.VITE_NEWS_API_KEY,
      GUARDIAN: import.meta.env.VITE_GUARDIAN_API_KEY,
      NYT: import.meta.env.VITE_NYC_API_KEY
    };

    const keyParam = baseUrlKey === "NEWSAPI" ? "apiKey" : "api-key";

    const response: AxiosResponse = await apiClient.get(baseUrl, {
      params: { ...params, [keyParam]: apiKeys[baseUrlKey] },
    });

    return response.data;
  } catch (error) {
    console.error("API Error: ", error);
    throw error;
  }
};

export default fetchNews;

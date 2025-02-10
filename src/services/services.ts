import { ApiProviders } from "../enums/ApiProviders";
import { NewsFilters } from "../types/types";
import fetchNews from "./apiClient";

function removeFalsyValues(obj: Record<string, any>): Record<string, any> {
  const refinedObject: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      refinedObject[key] = obj[key];
    }
  });
  return refinedObject;
}

export const getNewsApiNews = async (filters: NewsFilters) => {
  try {
    filters.category = filters.category === "general" ? "" : filters.category;
    const combinedQ = [filters.keyword, filters.category, filters.author]
      .filter(Boolean)
      .join(" ");
    return await fetchNews(
		ApiProviders.NEWSAPI,
      removeFalsyValues({
        q: combinedQ || "",
        language: "en",
        sortBy: "publishedAt",
        from: filters.startDate,
        to: filters.endDate,
        domains: "cnn.com",
        page: filters.pageNo || 1,
        pageSize: filters.pageSize || 12,
      }),
    );
  } catch (error: any) {
    console.error("Error fetching News API News:", error.message);
    throw error;
  }
};

export const getGuardianNews = async (filters: NewsFilters) => {
  try {
    filters.category = filters.category === "general" ? "" : filters.category;
    const combinedQ = filters.author
      ? [filters.keyword, `"${filters.author}"`].filter(Boolean).join(" AND ")
      : filters.keyword;
    return await fetchNews(
		ApiProviders.GUARDIAN,
      removeFalsyValues({
        q: combinedQ || "",
        section: filters.category,
        language: "en",
        sortBy: "publishedAt",
        "from-date": filters.startDate,
        "to-date": filters.endDate,
        "show-fields": "all",
        page: filters.pageNo || 1,
        pageSize: filters.pageSize || 12,
      }),
    );
  } catch (error: any) {
    console.error("Error fetching Guardian News:", error.message);
    throw error;
  }
};

export const getNYTNews = async (filters: NewsFilters) => {
  try {
    filters.category = filters.category === "general" ? "" : filters.category;
    const combinedQ = [
      filters.category && `section_name:("${filters.category}")`,
      filters.author && `byline:("${filters.author}")`,
    ]
      .filter(Boolean)
      .join(" AND ");
    return await fetchNews(
		ApiProviders.NYT,
      removeFalsyValues({
        q: filters.keyword || "",
        fq: combinedQ,
        begin_date: filters.startDate,
        end_date: filters.endDate,
        page: filters.pageNo || 1,
        pageSize: filters.pageSize || 12,
      }),
    );
  } catch (error: any) {
    console.error("Error fetching NYT News:", error.message);
    throw error;
  }
};

import { ApiProviders } from "../enums/ApiProviders";

export const BASE_URLS: Record<ApiProviders, string> = {
  [ApiProviders.NEWSAPI]: "https://newsapi.org/v2/everything",
  [ApiProviders.GUARDIAN]: "https://content.guardianapis.com/search",
  [ApiProviders.NYT]: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
};

export interface Article {
	id?: string;
	author?: string;
	title?: string;
	description?: string;
	descriptionHtml?: string;
	originalUrl?: string;
	thumbnail?: string;
	source?: string;
	createdOn?: string;
	category?: string;
}

export interface NewsFilters {
	keyword?: string;
	category?: string;
	author?: string;
	source?: string;
	startDate?: string;
	endDate?: string;
	pageNo?: number;
	pageSize?: number;
  }

export interface NewsState {
	newsData: any[];
	loading: boolean;
	loadMore: boolean;
	error: string | null;
	noMoreArticles: boolean;
}

export interface SetNewsDataPayload {
	payload?: any[];
	shouldAppend?: boolean;
}

export interface UserState {
	personalizeSources: string[];
	personalizeCategories: string[];
	personalizeAuthors: string[];
}

export interface ApiKeys {
	NEWSAPI: string | undefined;
	GUARDIAN: string | undefined;
	NYT: string | undefined;
  }
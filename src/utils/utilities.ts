import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { Article } from "../types/types";

function extractAuthorNames(htmlString: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const anchorTags = tempDiv.querySelectorAll("a");

  const authorNames = Array.from(anchorTags)
    .map((anchor) => anchor.textContent?.trim() || "")
    .filter(Boolean)
    .join(", ");

  return authorNames;
}

export const extractWsjArticles = (
  article: any,
  category?: string,
): Article => {
  return {
    id: uuidv4(),
    author: article.author || "Unknown",
    title: article.title || "Untitled",
    description: article.description || "No description available.",
    descriptionHtml: article.description || "",
    originalUrl: article.url || "",
    thumbnail: article.urlToImage || "",
    source: article.source.name,
    createdOn: article.publishedAt || "",
    category: category || "general",
  };
};

export const extractGuardianArticles = (
  article: any,
  category?: string,
): Article => {
  return {
    id: uuidv4(),
    author: extractAuthorNames(article.fields?.bylineHtml || ""),
    title: article.webTitle || "Untitled",
    description: article.fields?.bodyText || "No description available.",
    descriptionHtml: article.fields?.body || "",
    originalUrl: article.webUrl || "",
    thumbnail: article.fields?.thumbnail || "",
    source: "The Guardian",
    createdOn: article.webPublicationDate || "",
    category: category || "general",
  };
};

export const extractNycArticles = (
  article: any,
  category?: string,
): Article => {
  return {
    id: uuidv4(),
    author: article.byline?.original || "Unknown",
    title: article.headline?.main || "Untitled",
    description: article.abstract || "No description available.",
    descriptionHtml: article.abstract || "",
    originalUrl: article.web_url || "",
    thumbnail:
      article.multimedia && article.multimedia[0]?.url
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : undefined,
    source: article.source || "",
    createdOn: article.pub_date || "",
    category: category || "general",
  };
};

export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formattedDate = (date?: string): string => {
  if (!date) return "Date not available";
  return moment(date).format("MMMM D, YYYY | h:mma");
};

export const sanitizeHtmlString = (htmlString: string): string => {
  if (!htmlString) return "<p>No description available.</p>";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  tempDiv.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
  });

  tempDiv.querySelectorAll("iframe").forEach((iframe) => {
    const wrapper = document.createElement("div");

    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.paddingTop = "56.25%";
    wrapper.style.borderRadius = "10px";
    wrapper.style.overflow = "hidden";
    wrapper.style.background = "#000";

    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.pointerEvents = "auto";
    iframe.allowFullscreen = true;

    iframe.style.transform = "translateZ(0)";
    iframe.style.webkitTransform = "translateZ(0)";

    iframe.parentNode?.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);
  });

  return tempDiv.innerHTML;
};

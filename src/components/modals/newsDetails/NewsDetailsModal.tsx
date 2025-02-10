import React from "react";

import { formattedDate, sanitizeHtmlString } from "../../../utils/utilities";
import CommonModal from "../../common/CommonModal";

import "./NewsDetailsModal.css";
import { Article } from "../../../types/types";

interface NewsDetailsModalProps {
  selectedArticle: Article | null;
  show: boolean;
  handleClose: () => void;
}

const NewsDetailsModal: React.FC<NewsDetailsModalProps> = ({
  selectedArticle,
  show,
  handleClose,
}) => {
  return (
    <CommonModal
      show={show}
      handleClose={handleClose}
      title={`${selectedArticle?.source || "Article"}'s Article`}
      footerLink={selectedArticle?.originalUrl}
      footerText="Read Full Article"
    >
      <img
        src={selectedArticle?.thumbnail || "/images/article_image.png"}
        alt="Article"
        className="news-image"
      />
	  <p className="news-meta mt-2">
        {selectedArticle?.title}
      </p>
      <p className="news-meta">
        <strong>By:</strong> {selectedArticle?.author || "Unknown author"}
      </p>
      <p className="news-meta">
        <strong>Source:</strong> {selectedArticle?.source || "Unknown source"}
      </p>
      <p className="news-meta">
        <strong>Published On:</strong> {formattedDate(selectedArticle?.createdOn)}
      </p>
      <div
        className="news-text"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtmlString(selectedArticle?.descriptionHtml || ""),
        }}
      />
    </CommonModal>
  );
};

export default NewsDetailsModal;

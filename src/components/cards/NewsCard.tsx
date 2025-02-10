import React, { useState } from "react";
import { Card, Button, Badge, Stack } from "react-bootstrap";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import moment from "moment";

import { capitalizeWords } from "../../utils/utilities";
import { Article } from "../../types/types";

import "./NewsCard.css";

interface NewsCardProps {
  article: Article;
  onShowModal: (article: Article) => void;
  handleOpenPersonalize?: (article: Article) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onShowModal,
  handleOpenPersonalize = () => {},
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { author, title, description, thumbnail, source, createdOn, category } =
    article;
  const formattedDate = moment.utc(createdOn).format("MMMM D, YYYY | h:mma");

  return (
    <Card className="news-card">
      <Card.Img
        variant="top"
        src={thumbnail || "/images/article_image.png"}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/article_image.png";
        }}
      />

      <Card.ImgOverlay
        className="overlay-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Text className="overlay-text">{source}</Card.Text>

        {isHovered ? (
          <RxBookmarkFilled
            className="save-icon"
            title="Personalize your feed"
            onClick={() => handleOpenPersonalize(article)}
          />
        ) : (
          <RxBookmark className="save-icon" title="Personalize your feed" />
        )}
      </Card.ImgOverlay>

      <Card.Body>
        <Card.Title
          className="card-title"
          title={title}
          onClick={() => onShowModal(article)}
        >
          {title}
        </Card.Title>

        <div className="text-muted author" title={capitalizeWords(author || "")}>
          <small>{capitalizeWords(author || "Unknown author")}</small>
        </div>

        <div className="text-muted" title={formattedDate}>
          <small>{formattedDate}</small>
        </div>

        {description ? (
          <Card.Text className="description-text">{description}</Card.Text>
        ) : (
          <Card.Text className="empty-description">
            Description not available
          </Card.Text>
        )}

        <div className="read-more-container">
          <Stack direction="horizontal">
            <Badge bg="none" className="custom-badge" pill>
              {category || "General"}
            </Badge>
          </Stack>

          <Button
            type="button"
            variant="link"
            className="read-more-btn"
            onClick={() => onShowModal(article)}
			title="Read more"
          >
            Read more
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;

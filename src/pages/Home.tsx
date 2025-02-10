import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";

import FilterComponent from "../components/filter/FilterComponent";
import NewsCard from "../components/cards/NewsCard";
import PersonalizeModal from "../components/modals/personalize/PersonalizeModal";
import Loader from "../components/loader/Loader";

import {
  fetchAllNews,
  fetchGuardianNews,
  fetchNewsApiNews,
  fetchNytNews,
} from "../redux/thunks/newsThunk";
import { Article, NewsFilters } from "../types/types";
import NewsDetailsModal from "../components/modals/newsDetails/NewsDetailsModal";

type HomeProps = {
  view: "personalize" | "public";
};

const Home: React.FC<HomeProps> = ({ view }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { newsData, loading, error, loadMore, noMoreArticles } = useSelector(
    (state: RootState) => state.news
  );

  const [show, setShow] = useState<boolean>(false);
  const [showPersonalize, setShowPersonalize] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filters, setFilters] = useState<NewsFilters | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const isPersonalize = view === "personalize";

  const handleShow = (article: Article) => {
    setSelectedArticle(article);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleClosePersonalize = () => {
    setShowPersonalize(false);
    setSelectedArticle(null);
  };

  const handleOpenPersonalize = (article: Article) => {
    setShowPersonalize(true);
    setSelectedArticle(article);
  };

  const handleApplyFilters = (filters: NewsFilters) => {
    setFilters(filters);
    setPageNo(1);
  };

  useEffect(() => {
    if (!filters) return;
	
    const mergeFilters = { ...filters, pageNo };
    const isMore = pageNo > 1;
	console.log(mergeFilters,"filters")

    if (mergeFilters.source === "newsApi" || mergeFilters.source === "CNN") {
      dispatch(fetchNewsApiNews(mergeFilters, isMore));
    } else if (
      mergeFilters.source === "guardian" ||
      mergeFilters.source === "The Guardian"
    ) {
      dispatch(fetchGuardianNews(mergeFilters, isMore));
    } else if (
      mergeFilters.source === "nyt" ||
      mergeFilters.source === "The New York Times"
    ) {
      dispatch(fetchNytNews(mergeFilters, isMore));
    } else if (mergeFilters.source === "" && !isPersonalize) {
      dispatch(fetchAllNews(mergeFilters, isMore));
    }
  }, [filters, pageNo, isPersonalize]);

  return (
    <>
      <div className="container px-3 main-container">
        {!isPersonalize ? (
          <FilterComponent onApplyFilters={handleApplyFilters} view="public" />
        ) : (
          <FilterComponent
            onApplyFilters={handleApplyFilters}
            view="personalize"
          />
        )}
        {loading && <Loader />}

        <Row className="g-4 gx-4">
          {newsData?.map((el: any, index: number) => (
            <Col lg={3} md={6} sm={6} xs={12} key={index}>
              <NewsCard
                article={el}
                onShowModal={handleShow}
                handleOpenPersonalize={handleOpenPersonalize}
              />
            </Col>
          ))}

          {!loading && newsData?.length === 0 && (
            <p className="text-center mt-4">
              {!isPersonalize
                ? "No latest news found."
                : "No news found. Please adjust or select your personalize filters to get news.."}
            </p>
          )}

          {!loading &&
            newsData?.length > 0 &&
            !loadMore &&
            !noMoreArticles &&
            !error && (
              <div className="text-center mt-4 mb-4">
                <Button
                  onClick={() => setPageNo((prev) => prev + 1)}
                  variant="link"
                  className="read-more-btn"
                >
                  Load More
                </Button>
              </div>
            )}

          {noMoreArticles && (
            <p className="text-center mt-4">No more articles.</p>
          )}

          {loadMore && (
            <div className="mb-4">
              <Loader />
            </div>
          )}

          {error && <p className="text-center text-danger">Error fetching news</p>}
        </Row>
      </div>
      <NewsDetailsModal
        selectedArticle={selectedArticle}
        show={show}
        handleClose={handleClose}
      />	
      <PersonalizeModal
        selectedArticle={selectedArticle}
        show={showPersonalize}
        handleClose={handleClosePersonalize}
      />
    </>
  );
};

export default Home;
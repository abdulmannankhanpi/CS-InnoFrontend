import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Row, Col, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

import useDebounce from "../../hooks/useDebounce";
import { setNewsData } from "../../redux/slices/newsSlice";
import { RootState } from "../../redux/store/store";
import { NewsFilters } from "../../types/types";
import MyFeedModal from "../modals/myFeed/MyFeedModal";

interface FilterComponentProps {
  onApplyFilters: (filters: NewsFilters & { keyword: string }) => void;
  view: string;
}

const initialState: NewsFilters = {
  startDate: "",
  endDate: "",
  category: "",
  source: "",
  author: "",
  pageSize: 12,
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  onApplyFilters,
  view,
}) => {
  const dispatch = useDispatch();
  const { personalizeAuthors, personalizeCategories, personalizeSources } =
    useSelector((state: RootState) => state.user);

  const [filters, setFilters] = useState<NewsFilters>(initialState);
  const [keyword, setKeyword] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isPersonalize = view === "personalize";
  const debouncedKeyword = useDebounce(keyword, 500);

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
	dispatch(setNewsData({ payload: [], shouldAppend: false }));
  
	if (view === "personalize") {
	  if (personalizeSources.length > 0) {
		setFilters((prev) => ({
		  ...prev,
		  source: personalizeSources[0],
		}));
	  } else {
		toast.warn(
		  <>
			Please save at least 1 source from Global Feed. <br />
			Click the save icon on the top-right of the news for saving.
		  </>
		);
	  }
	} else {
	  setFilters(initialState);
	}
  
	setKeyword("");
  }, [view]);

  useEffect(() => {
    onApplyFilters({ ...filters, keyword: debouncedKeyword });
  }, [debouncedKeyword, filters]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "keyword") {
      setKeyword(value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseEdit = () => setIsEdit(false);

  const renderFilters = () => (
    <>
      <Row className="g-3">
        <Col lg={4} md={6} xs={12} sm={12}>
          {!isPersonalize ? (
            <Form.Group>
              <Form.Label htmlFor="keyword">Search keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter keywords..."
                name="keyword"
                value={keyword}
                onChange={handleInputChange}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label htmlFor="author">Select Author</Form.Label>
              <Form.Select
                name="author"
                value={filters.author}
                onChange={handleInputChange}
              >
                <option value="hold">Select Author</option>
                {personalizeAuthors?.map((author) => (
                  <option
                    key={author}
                    className="text-capitalize"
                    value={author}
                  >
                    {author}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Col>

        <Col xs={12} sm={6} lg={isPersonalize ? 3 : 2} md={6}>
          <Form.Group>
            <Form.Label htmlFor="category">Search Category</Form.Label>
            <Form.Select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
            >
              {!isPersonalize ? (
                <>
                  <option value="">All Categories</option>
                  <option value="business">Business</option>
                  <option value="technology">Technology</option>
                  <option value="sports">Sports</option>
                  <option value="health">Health</option>
                  <option value="science">Science</option>
                </>
              ) : (
                <>
                  <option value="">Select Category</option>
                  {personalizeCategories?.map((category) => (
                    <option
                      key={category}
                      className="text-capitalize"
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} lg={isPersonalize ? 3 : 2} md={6}>
          <Form.Group>
            <Form.Label htmlFor="source">Search Source</Form.Label>
            <Form.Select
              name="source"
              value={filters.source}
              onChange={handleInputChange}
            >
              {!isPersonalize ? (
                <>
                  <option value="">All Sources</option>
                  <option value="guardian">The Guardian</option>
                  <option value="nyt">New York Times</option>
                  <option value="newsApi">CNN</option>
                </>
              ) : (
                <>
                  <option value="hold">Select Source</option>
                  {personalizeSources?.map((source) => (
                    <option
                      key={source}
                      className="text-capitalize"
                      value={source}
                    >
                      {source}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>
        </Col>

        {isPersonalize ? (
          <Col xs={12} sm={6} lg={2} md={6}>
            <Form.Group>
              <Form.Label htmlFor="startDate">Edit Feed</Form.Label>
              <div className="mx-4 cursor-pointer">
                <FaEdit
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </div>
            </Form.Group>
          </Col>
        ) : null}

        {!isPersonalize && (
          <>
            <Col xs={12} sm={6} lg={2} md={6}>
              <Form.Group>
                <Form.Label htmlFor="startDate">From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} lg={2} md={6}>
              <Form.Group>
                <Form.Label htmlFor="endDate">To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </>
        )}
      </Row>
    </>
  );

  return (
    <>
      <div className="p-3 bg-light rounded mb-4">
        {isSmallScreen ? (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filters</Accordion.Header>
              <Accordion.Body>{renderFilters()}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          <Form>{renderFilters()}</Form>
        )}
      </div>
      <MyFeedModal show={isEdit} handleClose={handleCloseEdit} />
	  <ToastContainer autoClose={6000} position='top-center' />
    </>
  );
};

export default FilterComponent;

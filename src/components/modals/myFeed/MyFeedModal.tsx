import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";

import {
  removeAuthor,
  removeCategory,
  removeSource,
} from "../../../redux/slices/userSlice";
import CommonModal from "../../common/CommonModal";
import { RootState } from "../../../redux/store/store";

interface MyFeedModalProps {
  show: boolean;
  handleClose: () => void;
}

const MyFeedModal: React.FC<MyFeedModalProps> = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const { personalizeSources, personalizeCategories, personalizeAuthors } =
    useSelector((state: RootState) => state.user);

  const handleRemove = (value: string) => {
    if (personalizeSources.includes(value)) {
      dispatch(removeSource(value));
    } else if (personalizeCategories.includes(value)) {
      dispatch(removeCategory(value));
    } else if (personalizeAuthors.includes(value)) {
      dispatch(removeAuthor(value));
    }
  };

  const allPreferences: string[] = [
    ...personalizeSources,
    ...personalizeCategories,
    ...personalizeAuthors,
  ];

  return (
    <CommonModal
      show={show}
      handleClose={handleClose}
      title="Your Personalized Feed"
    >
      {allPreferences.length > 0 ? (
        <div className="p-3 bg-light rounded mb-4">
          <p>Click on a badge to remove it from your personalized feed:</p>
          <div className="d-flex flex-wrap gap-2">
            {allPreferences.map((item) => (
              <Badge
                key={item}
                bg="secondary"
                className="p-2"
                pill
                onClick={() => handleRemove(item)}
                style={{ cursor: "pointer" }}
              >
                {item} &times;
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>No personalization preferences found.</p>
        </div>
      )}
    </CommonModal>
  );
};

export default MyFeedModal;
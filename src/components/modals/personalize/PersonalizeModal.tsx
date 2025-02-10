import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
	removeSource,
	removeCategory,
	removeAuthor,
	addSource,
	addCategory,
	addAuthor,
} from "../../../redux/slices/userSlice";
import CommonModal from "../../common/CommonModal";

interface PersonalizeModalProps {
	selectedArticle: {
		source?: string;
		category?: string;
		author?: string;
	} | null;
	show: boolean;
	handleClose: () => void;
}

const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
	selectedArticle,
	show,
	handleClose,
}) => {
	const {
		personalizeAuthors,
		personalizeCategories,
		personalizeSources,
	} = useSelector((state: any) => state.user);
	const dispatch = useDispatch();

	const handleCheckboxChange = (item: string, type: string) => {
		switch (type) {
			case "source":
				if (personalizeSources.includes(item)) {
					dispatch(removeSource(item));
				} else {
					dispatch(addSource(item));
				}
				break;
			case "category":
				if (personalizeCategories.includes(item)) {
					dispatch(removeCategory(item));
				} else {
					dispatch(addCategory(item));
				}
				break;

			case "author":
				if (personalizeAuthors.includes(item)) {
					dispatch(removeAuthor(item));
				} else {
					dispatch(addAuthor(item));
				}
				break;
			default:
				break;
		}
	};

	const renderCheckboxes = (
		items: string[],
		selectedItems: string[],
		type: string
	) => (
		<Form>
			{items.map((item, index) => (
				<Form.Check
					key={index}
					type="checkbox"
					label={item}
					className="text-capitalize"
					checked={selectedItems.includes(item)}
					onChange={() => handleCheckboxChange(item, type)}
				/>
			))}
		</Form>
	);

	return (
		<CommonModal
			show={show}
			handleClose={handleClose}
			title="Select your personalize news feed"
		>
			<h5>Select Sources</h5>
			{selectedArticle?.source &&
				renderCheckboxes([selectedArticle.source], personalizeSources, "source")}

			<h5 className="mt-3">Select Categories</h5>
			{selectedArticle?.category &&
				renderCheckboxes(
					[selectedArticle.category],
					personalizeCategories,
					"category"
				)}

			<h5 className="mt-3">Select Authors</h5>
			{selectedArticle?.author &&
				renderCheckboxes(
					selectedArticle.author.split(",") || [],
					personalizeAuthors,
					"author"
				)}
		</CommonModal>
	);
};

export default PersonalizeModal;

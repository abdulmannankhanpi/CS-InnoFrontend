import React, { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

interface CommonModalProps {
  show: boolean;
  handleClose: () => void;
  title?: string;
  footerLink?: string;
  footerText?: string;
  children: ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({
  show,
  handleClose,
  title,
  footerLink,
  footerText,
  children,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-wrap">
          {title || "Modal Title"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">{children}</Modal.Body>
      {footerLink && footerText && (
        <Modal.Footer>
          <Button
            variant="link"
            href={footerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
          >
            {footerText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommonModal;

import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Error404: React.FC = () => {
  return (
    <div className="container main-container d-flex justify-content-center align-items-center text-center">
      <Row>
        <Col>
          <TbError404 size={100} className="text-danger" />
          <h1 className="mt-3">Oops! Page Not Found</h1>
          <p className="text-muted">
            We can't seem to find the page you're looking for.
          </p>
          <Button
            variant="link"
            className="read-more-btn"
            as={Link as any}
            to="/"
          >
            Go to Home
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Error404;

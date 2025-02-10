import React from "react";
import { Col, Row, Card } from "react-bootstrap";

const AboutUs: React.FC = () => {
  return (
    <div className="container main-container">
      <Row className="justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">About Us</Card.Title>
              <Card.Text>
                Hi ✋, I am Abdul Mannan Khan, a Full Stack Developer with over 5
                years of experience. This is a case study for the Frontend
                Developer position at Innoscipta AG. I am open to suggestions
                and look forward to connecting with you.
              </Card.Text>
              <h5 className="mt-4">Contact Details</h5>
              <p>
                Email:{" "}
                <a
                  href="mailto:mannan.khan63@gmail.com"
                  className="custom-link"
                >
                  mannan.khan63@gmail.com
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;

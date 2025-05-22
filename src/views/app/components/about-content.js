import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import aboutImage2 from "assets/images/about-2.jpg";
import { Link } from "react-router-dom";

const AboutContent = () => {
  return (
    <>
      <section className="gray-bg-light">
        <Container>
          <Row className="align-items-center justify-content-between flex-column-reverse flex-lg-row">
            <Col xs={12} sm={12} md={12} lg={6}>
              <h5 className="text-dark">
                <strong className="text-orange">
                  A.G Diagnostics Pvt. Ltd.
                </strong>{" "}
                is a reputed, state-of-art clinical diagnostics laboratory,
                spread over <strong>16,000 sq. ft.</strong> processing centre
                at Bhandarkar Road, Pune with a network of over{" "}
                <Link to={`/find-a-lab`}><strong className="text-purple">55 collection centres</strong></Link>{" "}
                across the city.
              </h5>
              <p className="text-dark">
                With cutting-edge equipment that renders pathology services
                with utmost precision, we take pride in becoming the
                Healthcare Partner for all our customers by offering them the
                full range of pathology, home collection, and wellness
                services.
              </p>
              <p className="text-dark">
                At present, Dr Awanti Golwilkar and Dr Vinanti Golwilkar run this world-class,
                highest quality standard diagnostic set-up of A.G Diagnostics
                Pvt. Ltd., backed by a team of expert Pathologists,
                Microbiologists, skilled Phlebotomists and Technicians to
                deliver reliable & accurate diagnosis in the shortest possible
                time.
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="about-image">
                <img src={aboutImage2} alt="About A G Diagnostics, a Pathology Lab and Diagnostic Centre" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AboutContent;

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import aboutImage1 from "assets/images/about-1.png";


const FounderContent = () => {
  return (
    <>
      <section className="bg-light-orange">
        <Container>
          <Row className="justify-content-between">
            <Col xs={12} sm={12} md={12} lg={5}>
              <div className="about-image sticky-img">
                <img src={aboutImage1} alt="Dr Ajit Golwilkar" className="img-fluid" />
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <h5 className="text-dark">
                In the year 1978,{" "}
                <strong className="text-orange">Dr Ajit Golwilkar</strong>{" "}
                dreamt of bringing world-class pathology services to the city
                of Pune and brought his first pathology laboratory set up on Karve Road,
                called Golwilkar Laboratories to life. His name has been
                considered synonymous with quality laboratory services in Pune
                & the country for over four decades.
              </h5>
              <p className="text-dark">
                To begin with, the samples used to test with the then
                available basic diagnostic techniques, nonetheless maintaining
                the highest accuracy and reliability. His endeavour had been
                to deliver results in the shortest possible time yet, at an
                affordable price.
              </p>
              <p className="text-dark">
                There have been many firsts to the credit of Dr Golwilkar, who
                provided automation and a diverse tests facility for
                radioimmunoassay and other immunoassay techniques,
                immunophenotyping, immunohistochemistry &amp; flow cytometry,
                molecular diagnostic techniques, polymerase chain reaction,
                automated microbiology techniques, quality system,
                accreditation, and laboratory information system (LIS).
              </p>
              <p className="text-dark">
                Dr Golwilkar recognised the need for Home Visit services way
                back in 1978 and pioneered this concept in the city. He
                recognized that terminally ill patients, patients who cannot
                move due to injuries, differently-abled patients, pregnant
                women, senior citizens, and patients who live far from his
                set-up but trust his services, need home service facilities.
                He himself started doing home visits for blood collection. He
                has personally trained and motivated many of our home-visit
                phlebotomists.
              </p>
              <p className="text-dark">
                Thus, home visit services are a sine qua non feature of our
                laboratory. May it be rain or sunshine or chilly winter
                morning, our expert home visit team members will offer
                courteous and prompt services across the city.
              </p>
              <p className="text-dark">
                Dr Golwilkar had been serving society across all sectors
                including many hospitals, teaching institutions, medical
                colleges, research institutes and social organizations in
                Pune. Thus, his name has been recognised with ‘Trust’ by many
                families throughout generations for their diagnostic needs.
              </p>
              <p className="text-dark">
                His legacy is now ably carried forward by his daughters - Dr
                Awanti Golwilkar Mehendale and Dr Vinanti Golwilkar Patankar.
                It can be said that pathology runs in their blood.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}


export default FounderContent;

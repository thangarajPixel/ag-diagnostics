import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Microbiology from "assets/images/microbiology.jpg";
import ClinicalPathology from "assets/images/clinical-pathology.jpg";
import QualityControl from "assets/images/quality-control.jpg";
import Hematology from "assets/images/hematology.jpg";
import Histopathology from "assets/images/histopathology.jpg";
import ClinicalBiochemistry from "assets/images/clinical-biochemistry.jpg";

const TechnicalCapabilitiesContent = () => {

  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-between align-items-center flex-column-reverse flex-md-row flex-lg-row">
            <Col xs={12} sm={12} md={8} lg={6}>
              <h4 className="mb-2 pb-3">Microbiology & Molecular Biology</h4>
              <h5 className="text-dark">
                In Microbiology, excellent quality controls ensure the best
                quality cultures with accurate organism identification &
                susceptibility testing with timely reports aided by
                state-of-the-art equipment and software.
              </h5>
              <p className="text-dark">
                Molecular diagnostics works for several infectious and
                non-infectious parameters ensuring timely reports with proven
                sensitivity and specificity for important tests such as
                SARS-CoV-2, Influenza Panel, quantitative tests like HIV1,
                HBV, HCV, CMV viral load ensuring valuable information for
                treatment and prognosis. Preventive applications exist for
                HPV, Carba-R etc., whereas microassays facilitate a syndromic
                approach for investigating respiratory, gastrointestinal,
                meningoencephalitis & blood-borne infections, and drug
                resistance parameters.
              </p>
            </Col>
            <Col xs={12} sm={12} md={4} lg={5}>
              <div className="about-image">
                <img src={Microbiology} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="divider">&nbsp;</div>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} sm={12} md={4} lg={5}>
              <div className="about-image">
                <img src={Hematology} alt="" className="img-fluid" />
              </div>
            </Col>
            <Col xs={12} sm={12} md={8} lg={6}>
              <h4 className="mb-2 pb-3">Hematology</h4>
              <h5 className="text-dark">
                Our hematology & special hematology section offers
                state-of-the-art testing for routine as well as specialized
                tests.
              </h5>
              <p className="text-dark">
                The wide spectrum of tests includes complete blood count for
                diagnosing anaemias, infections such as malaria & dengue, and
                cancers of the blood to mention a few. A highly specialised
                set-up is available to evaluate bleeding and coagulation
                disorders and to monitor anticoagulation therapies. An
                automated blood group analyser ensures the detection of rare
                blood groups. Flow cytometry and electrophoresis are other
                high-end tests offered at A.G Diagnostics Pvt. Ltd. Bone
                marrow aspiration & bone marrow biopsy are tests which require
                a great degree of expertise. A.G Diagnostics has a large team
                of highly qualified and experienced technologists and a team
                of doctors working in this department, providing world-class
                services.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="divider">&nbsp;</div>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center flex-column-reverse flex-md-row flex-lg-row">
            <Col xs={12} sm={12} md={8} lg={6}>
              <h4 className="mb-2 pb-3">Clinical Pathology</h4>
              <h5 className="text-dark">
                Clinical Pathology includes the examination of urine, stool,
                semen, body fluids etc.
              </h5>
              <p className="text-dark">
                These seemingly simple tests are very important for diagnosing
                routine & rare disease states & also monitoring patients’
                progress. The department is equipped with automated urine and
                semen analyser which eliminates human errors.
                <br />
                <br />
                The team of pathologists supervises all tests in the
                department, thus ensuring reliable results.
              </p>
            </Col>
            <Col xs={12} sm={12} md={4} lg={5}>
              <div className="about-image">
                <img src={ClinicalPathology} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="divider">&nbsp;</div>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} sm={12} md={4} lg={5}>
              <div className="about-image">
                <img src={QualityControl} alt="" className="img-fluid" />
              </div>
            </Col>
            <Col xs={12} sm={12} md={8} lg={6}>
              <h4 className="mb-2 pb-3">Quality Assurance Department</h4>
              <h5 className="text-dark">
                A.G Diagnostics Pvt. Ltd. is committed to getting every test
                right the first time, every time and in the shortest time. To
                ensure this, the laboratory follows stringent quality control
                procedures & participates in multiple proficiency testing
                programs.
              </h5>
              <p className="text-dark">
                Standardized test methods and processes are in use in all
                departments of the laboratory and the lab also takes regular
                feedback from all its users. This feedback is used to drive
                continual improvement. The laboratory uses quality indicators
                and sigma metrics to monitor the quality improvement program.
              </p>
              <h5>
                <strong className="text-purple">
                  A.G Diagnostics is accredited by NABL as per ISO 15189:2022.
                </strong>
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="divider">&nbsp;</div>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center flex-column-reverse flex-md-row flex-lg-row">
            <Col xs={12} sm={12} md={8} lg={6}>
              <h4 className="mb-2 pb-3">Histopathology & Cytopathology</h4>
              <h5 className="text-dark">
                Histopathology & Cytopathology department deals with tissue
                diagnosis.
              </h5>
              <p className="text-dark">
                Routine Histopathology, Cytopathology including LBC &
                Immunohistochemistry is offered by A.G Diagnostics which helps
                in the diagnosis and prognosis of various diseases, most
                importantly malignancies. A.G Diagnostics has a team of
                histopathologists with over 40 years of experience & it is
                ensured that all reports are released after careful
                deliberations and ancillary testing as required.
              </p>
            </Col>
            <Col xs={12} sm={12} md={4} lg={5}>
              <div className="about-image">
                <img src={Histopathology} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="divider">&nbsp;</div>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} sm={12} md={4} lg={5}>
              <div className="about-image">
                <img
                  src={ClinicalBiochemistry}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={8} lg={6}>
              <h4 className="mb-2 pb-3">Clinical Biochemistry</h4>
              <h5 className="text-dark">
                Clinical Biochemistry department can be considered the core
                department of the laboratory.
              </h5>
              <p className="text-dark">
                Numerous biochemistry parameters, hormones and infectious
                markers are processed in this department using various
                techniques & methods such as Nephelometry, CMIA, CLIA, ELISA,
                HPLC etc. The department is equipped with state-of-art
                instrumentation and a very experienced clinical team.
                Antenatal screening, allergy testing, food intolerance
                testing, lead toxicity testing, therapeutic drug monitoring,
                and autoimmune disease diagnosis are the very important areas
                covered in the Clinical Biochemistry department.{" "}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TechnicalCapabilitiesContent;

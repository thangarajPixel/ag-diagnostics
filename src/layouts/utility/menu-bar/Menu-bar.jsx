import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import packageIcon1 from "assets/images/packages/icon1.png";
import { FiMapPin } from "react-icons/fi";
import {
  Link,
  // useHistory
} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { usePackages } from "hooks/packages";
import "./style.css";

export default function Menubar(props) {
  let cityName = localStorage.getItem("city_name");
  // let history = useHistory();
  const {
    defaultCity,
    cityData,
    cityChangeHandler,
    cityModal,
    modalHandler,
    hide,
  } = props;
  const { register, handleSubmit } = useForm();

  const getData = (e) => {
    let data = cityData.filter(
      (stu) => Number(stu.cityId) === Number(e.target.value)
    );
    localStorage.setItem("city_name", data?.[0]?.city);
  };

  const [packageData, setPackageData] = useState(null);
  const { mutate: packages } = usePackages();

  const onFetchPackages = (searchParams) => {
    const nformData = JSON.stringify(searchParams);
    packages(nformData, {
      onSuccess: (data) => {
        setPackageData(data?.packages);
      },
    });
  };

  useEffect(() => {
    if (defaultCity) {
      const params = {
        cityId: defaultCity,
        package_name: "AG-care",
      };
      onFetchPackages(params);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCity]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     history.push(`/${cityName}/packages}`);
  //   }, 1000);
  // }, [cityName]);

  return (
    <>
      <section className="menu-bar">
        <Button onClick={() => modalHandler(true)} className="locationMobile">
          <FiMapPin /> {localStorage.getItem("city_name") || "Pune"}
        </Button>
        <Container className="p-0">
          <Row className="g-0 align-items-center">
            <Col>
              <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link to="/" as={Link}>
                      Home
                    </Nav.Link>
                    <NavDropdown title="About Us" renderMenuOnMount={true}>
                      <NavDropdown.Item to="/about-us/ag-diagnostics" as={Link}>
                        A.G Diagnostics
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/about-us/about-founder" as={Link}>
                        Our Inspiration
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/about-us/our-team" as={Link}>
                        Our Team
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/about-us/csr-policy" as={Link}>
                        CSR Policy
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="Packages"
                      renderMenuOnMount={true}
                      className="mega-menu"
                    >
                      {packageData
                        ?.filter((item, idx) => idx < 20)
                        .map((common, a) => (
                          <NavDropdown.Item
                            to={`/${common.cityName.toLowerCase()}/package-details/${common.slug}`}
                            as={Link}
                            key={a}
                            onClick={() => {
                              localStorage.setItem("slug", common.slug);
                              localStorage.setItem(
                                "city_name",
                                common.cityName
                              );
                              localStorage.setItem("cityId", common.cityId);
                              localStorage.setItem("fee", common.fees);
                              localStorage.setItem(
                                "discountFee",
                                common.discountFees
                              );
                              localStorage.setItem("packageId", common.id);
                            }}
                          >
                            <img src={common?.icon} alt="" />
                            {common?.packageName}
                          </NavDropdown.Item>
                        ))}
                      <NavDropdown.Item
                        to={`/${cityName.toLowerCase()}/packages`}
                        as={Link}
                        className="line"
                      >
                        View more
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link to="/home-visit" as={Link}>
                      Book Home Visit
                    </Nav.Link>
                    <Nav.Link to="/services" as={Link}>
                      Services
                    </Nav.Link>
                    <Nav.Link to="/technical-capabilities" as={Link}>
                      Technical Capabilities
                    </Nav.Link>
                    <Nav.Link to="/find-a-lab" as={Link}>
                      Find a Lab
                    </Nav.Link>
                   
                    <Nav.Link target="_blank" to="/blogs/" as={Link}>
                      Blogs
                    </Nav.Link>
                    <Nav.Link to="/contact-us" as={Link}>
                      Contact Us
                    </Nav.Link>
                    <Nav.Link to="/brochures" as={Link}>
                      Brochures
                    </Nav.Link>
                    {hide ? null : (
                      <Button
                        onClick={() => modalHandler(true)}
                        className="location"
                      >
                        <FiMapPin />{" "}
                        {localStorage.getItem("city_name") || "Pune"}
                      </Button>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
        <Modal
          show={cityModal}
          onHide={() => modalHandler(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Select Location</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleSubmit(cityChangeHandler)}
              className="form-location"
            >
              <select {...register("cityId")} onChange={getData}>
                {cityData &&
                  cityData.map((common, a) => (
                    <option
                      key={a}
                      selected={
                        Number(defaultCity) === Number(common?.cityId)
                          ? true
                          : false
                      }
                      value={common?.cityId}
                    >
                      {common?.city}
                    </option>
                  ))}
              </select>
              <p className="text-center pad-top-20">
                <Button className="btn1 mb-0" type="submit">
                  <FaPaperPlane /> &nbsp; SUBMIT
                </Button>
              </p>
            </form>
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
}

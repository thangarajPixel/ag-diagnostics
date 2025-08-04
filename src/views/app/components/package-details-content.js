import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import PackageDetailsIcon from "assets/images/package-details-icon.png";
import SampleTube from "assets/images/sample-tube.png";
import Calendar from "assets/images/calendar.png";
import SampleType from "assets/images/sample-type.png";
import AgeIcon from "assets/images/age.png";
import HomeCollections from "assets/images/home-collections.png";
import TestRequirement from "assets/images/testrequirement.png";
import Report from "assets/images/report.png";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPaperPlane } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEnquiry } from "hooks/packages";
import { message } from "antd";
const PackageDetails = ({ packageData }) => {
  const { cityName, discountFees, fees, id } = packageData
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate: enquiry, isLoading: loading } = useEnquiry();

  const [isEnabled, setIsEnabled] = useState(false);
  console.log(packageData);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    reset();
  };

  const submitHandler = (e) => {
    const submitData = { ...e };
    submitData.packageId = id;
    submitData.name = e.name;
    submitData.email = e.email;
    submitData.mobile = e.mobile;
    submitData.message = e.message;
    let formData = JSON.stringify(submitData);
    enquiry(formData, {
      onSuccess: (item) => {
        if (item?.Status === 200) {
          message.success(item?.Message);
          setIsEnabled((previousState) => !previousState);
          reset();
          setTimeout(() => {
            // history.push(`/${cityName.toLowerCase()}/packages`);
            history.push("/thankyou-pages-enquiry")
          }, 1000);
        } else {
          message.error(item?.Message);
          setIsEnabled((previousState) => !previousState);
          reset();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    var metaTag = document.querySelector('meta[name="description"]');
    document.title = packageData.meta_title ?? packageData.packageName
    if (metaTag) {
      metaTag.setAttribute("content", packageData.meta_description ?? packageData.packageName);
    }
    console.log(packageData)
  }, [packageData])

  return (
    <>
      <section className="package-details position-relative">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8}>
              <Row className="align-items-center">
                <Col xs={12} sm={12} md={12} lg={10}>
                  <div className="package-details-heading">
                    <img src={packageData?.icon} alt="" className="img-fluid" />
                    <h3>{packageData?.packageName}</h3>
                  </div>
                  <h4>Test information</h4>
                  <div className="pckge_include">
                    <img src={SampleTube} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Total tests included</h5>
                      <p>{packageData?.testLists}</p>
                    </div>
                  </div>
                  <div className="pckge_include">
                    <img src={Calendar} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Test Schedule</h5>
                      <p>{packageData?.testSchedule}</p>
                    </div>
                  </div>
                  <div className="pckge_include">
                    <img src={SampleType} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Sample type</h5>
                      <p>{packageData?.sampleType}</p>
                    </div>
                  </div>
                  <div className="pckge_include">
                    <img src={AgeIcon} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Age restrictions</h5>
                      <p>{packageData?.ageRestrictions || "-"}</p>
                    </div>
                  </div>
                  <div className="pckge_include">
                    <img src={HomeCollections} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Home collection</h5>
                      <p>This test is elegible for home collection</p>
                    </div>
                  </div>
                  <h4>Information for patients</h4>
                  <div className="pckge_include">
                    <img src={TestRequirement} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Pre-test requirements</h5>
                      <ul className="list-style1">
                        {packageData?.preRequisties ? (
                          <li className="ms-0">{packageData?.preRequisties}</li>
                        ) : (
                          "-"
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="pckge_include">
                    <img src={Report} alt="" className="img-fluid" />
                    <div className="pckge_details">
                      <h5>Report availability</h5>
                      <p className="mb-0">{packageData?.reportAvailability}</p>
                    </div>
                  </div>

                </Col>
              </Row>

              <div className="mt-5 pe-80">
                {packageData?.description &&
                  <div dangerouslySetInnerHTML={{ __html: packageData?.description }} />
                }
              </div>

            </Col>



            <Col xs={12} sm={12} md={12} lg={4}>
              <div className="pckge_price_details text-center">
                {discountFees === "0" ? null : <h5>&#8377;{discountFees}/-</h5>}
                <h3>&#8377;{fees}/-</h3>
                <Button onClick={toggleSwitch} className="btn1 d-block w-100">
                  Enquire Now
                </Button>
                <Link
                  to={`/home-visit/${`${packageData?.cityName}`.toLowerCase()}/${packageData?.slug
                    }`}
                  className="btn2 d-block"
                >
                  Book Home Collection
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        className={
          isEnabled ? "package-details-form active" : "package-details-form"
        }
      >
        <Container>
          <Row>
            <Col>
              <button onClick={toggleSwitch} className="btn-close">
                <GrClose />
              </button>
              <h3 className="text-purple text-start mar-bot-20">
                Enquire Now!
              </h3>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="contact-form"
              >
                <Form.Control
                  type="text"
                  value={packageData?.packageName}
                  className="mar-bot-20"
                  disabled
                />
                <Form.Control
                  type="text"
                  placeholder="AG-CARE Essential Extended"
                  className="mar-bot-20"
                  disabled
                  {...register("packageId")}
                  hidden={true}
                />
                <Form.Control
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="mar-bot-20"
                />
                {errors.name && <span>This field is required</span>}
                <Form.Control
                  type="tel"
                  {...register("mobile", { required: true })}
                  minlength="10"
                  maxlength="10"
                  placeholder="Phone Number"
                  className="mar-bot-20"
                />
                {errors.name && <span>This field is required</span>}
                <Form.Control
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email ID"
                  className="mar-bot-20"
                />
                {errors.name && <span>This field is required</span>}
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("message", { required: true })}
                  placeholder="Message"
                  className="mar-bot-20"
                />
                {errors.name && <span>This field is required</span>}
                <p className="text-center pad-top-20">
                  {loading ? (
                    <Button className="btn1 mb-0" disabled>
                      <FaPaperPlane /> &nbsp; SUBMIT
                    </Button>
                  ) : (
                    <Button className="btn1 mb-0" type="submit">
                      <FaPaperPlane /> &nbsp; SUBMIT
                    </Button>
                  )}
                </p>
              </form>
            </Col>
          </Row>
        </Container>

        
      </section>
    </>
  );
};

export default PackageDetails;

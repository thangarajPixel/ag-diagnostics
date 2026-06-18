import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FiClock, FiPhoneCall } from 'react-icons/fi';
import { TbMap2, TbPhoneCall } from 'react-icons/tb';
import { useFindLab } from "hooks/findLab";
import { useCity } from "hooks/home";
import Loader from "./loader";
import { TextLeft } from "react-bootstrap-icons";


const FindLabFaqSchema = () => {
  const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Can I get lab test results online?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, A.G Diagnostics provides secure online access to your lab test reports. Once your test is completed, you'll receive a link via SMS, email or  download your report directly from our app."
    }
  },{
    "@type": "Question",
    "name": "Do you offer full body checkups or health packages?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, we provide a variety of comprehensive health checkup packages such as executive health checkup, women’s wellness package, senior citizen health package which include tests like ECG,Xray,TMT / 2D Echo in addition to blood tests.For appointment call us at 02067636763"
    }
  },{
    "@type": "Question",
    "name": "What types of lab tests can I book from home?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Majority of blood tests from blood sugar and thyroid to full body checkups as well as COVID tests—we offer a wide range of lab test home collection options that cover your everyday and preventive health needs."
    }
  },{
    "@type": "Question",
    "name": "Can I book a lab test for my parents if I’m in a different city?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! You can book a home sample collection online or over the phone from anywhere in India—even abroad—and we’ll take care of your loved ones in Pune with real-time updates."
    }
  }]
};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
    />
  );
};


const FindALabContent = () => {

    const { data: city } = useCity();
    const { mutate: packages, isLoading: loading } = useFindLab();
    const [findData, setFindData] = useState(null);
    const [cityData, setCityData] = useState([]);
    // const [cityId, setCityId] = useState(localStorage.getItem("city_id") || "");
    const [cityId, setCityId] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [initValues, setInitValues] = useState({ "cityId": cityId, "search": searchKey, });

    const cityChangeHandler = (e) => {
        initValues.cityId = e.target.value;
        let data = { ...initValues };
        data.cityId = e.target.value;
        setInitValues(data);
        setCityId(e.target.value)
    }

    const searchHandler = (e) => {
        initValues.search = e.target.value;
        let data = { ...initValues };
        data.search = e.target.value;
        setInitValues(data);
        setSearchKey(e.target.value);
    }

    const onFetchPackages = (searchParams) => {
        const nformData = JSON.stringify(searchParams);
        packages(nformData, {
            onSuccess: (data) => {
                setFindData(data?.data)
            }
        });
    }

    useEffect(() => {
        if (city) {
            setCityData(city?.city)
        }
    }, [city]);

    useEffect(() => {
        onFetchPackages(initValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey, cityId]);

    return (
        <>
            <section className="bg-purple pad-top-20 pb-0">
                <Container>
                    <Row className="justify-content-between">
                        <Col xs={12} sm={12} md={6} lg={6} xl={5} className="pad-bot-20">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="text-nowrap text-white filter-by-text">Filter by: &nbsp;</span>
                                <Form.Select aria-label="select package" className="border-0" onChange={cityChangeHandler} >
                                    <option>-- Select Location --</option>
                                    {cityData && cityData.map((common, a) => (
                                        <option key={a} value={common?.cityId}>{common?.city}</option>
                                    ))}
                                    {/* selected={cityId === common?.cityId ? true : false} */}
                                </Form.Select>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={4} className="pad-bot-20">
                            <Form.Control type="text" className="border-0" placeholder="Search by Lab Title / Nearby" onChange={searchHandler} />
                        </Col>
                    </Row>
                </Container>
            </section>
         



















              <section className="bg-light-orange pt-5">
                <Container>
                    <Row>
                        <Col>
                            <div className="main-lab-address">
                                <h3 className="mb-0 text-orange">Main Laboratory</h3> &nbsp; <small><strong>A.G Diagnostics Pvt. Ltd.</strong> <br/> "Nayantara", Opp. TVS showroom, Bhandarkar Road, Pune - 411 004</small>
                            </div>
                        </Col>
                    </Row>
                    {loading ? <div className="common-loading"><Loader /></div> : findData === undefined || findData === null || findData?.length === 0 ? (
                        <div className="common-loading">
                            <h3 className="no">No Data Found</h3>
                        </div>
                    ) : (
                        <Row>
                            {findData?.map((common, a) => (
                                <Col xs={12} sm={12} md={6} lg={6} xl={4} key={a}>
                                    <div className="package-slide">
                                        <h5 className="text-purple">{common?.location}<span>{common?.city}, {common?.state}</span></h5>
                                        <div className="location">
                                            <GrLocation /> {common?.address}
                                        </div>
                                        <div className="working-hours"><AiOutlineFieldTime /> <strong>Week Days:</strong> {common?.timing}
                                            <br />
                                            {/*<strong>Sunday:</strong> {common?.timing} */}
                                        </div>
                                        <div className="phone">
                                            <FiPhoneCall /> {common?.phone}
                                        </div>
                                        <a className="orange-btn" href={`https://maps.google.com/?q=${common?.latitude},${common?.longitude}`} target="_blank" rel="noreferrer">
                                            <TbMap2 /> Get Direction
                                        </a>
                                    </div>
                                </Col>
                            ))}
                        </Row>                        
                    )}
                    <Row>
                        <Col>
                        <hr/>
                            <div className="main-lab-address pt-4 pb-0">
                                <h3 className="mb-0 text-orange text-center">Associate Centres</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                   

                         <Col xs={12} sm={12} md={6} lg={6} xl={4}>
                            <div className="package-slide">
                                <h5 className="text-purple">
                                Bramhandnayak Pathology
                                </h5>
                                <div className="location">
                                <GrLocation />Elora Shoppe, Shop No. 27,<br/>Plot No. 2&3, Indrayaninagar,<br/>Bhosari,<br/>Pune-411039
                                </div>
                                <div className="phone">
                                    <FiClock /> Mon - Sat : 07.30 AM to 7.30 PM Sunday : Closed
                                </div>
                                <div className="phone">
                                    <FiPhoneCall /> 8390809696
                                </div>
                                {/* <a className="orange-btn" href={`tel:8390809696`} target="_blank" rel="noreferrer">
                                            <TbPhoneCall /> Contact Now
                                        </a> */}
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                        <hr/>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="col-sm-12 col-md-12 col-lg-10">
                            <p className="text-center text-dark mt-4 mb-0">Experience excellence in diagnostics with A.G Diagnostics, your trusted choice for healthcare services. Our state-of-the-art Pathology Labs in Pune are equipped with cutting-edge technology and staffed by experienced professionals dedicated to accurate results and compassionate care. As the Best Pathology Lab in Pune, we prioritize your health and well-being. Visit us at our convenient locations across the city to access top-quality diagnostic services. Your health is our priority, and we are committed to delivering the highest standards of diagnostic excellence. <strong>Trust A.G Diagnostics for all your diagnostic needs in Pune.</strong></p>
                        </Col>
                    </Row>
                </Container>
            </section>





















            


            {/* faq */}
            <section>
              <Container>
                  <h3 className="text-center mb-5">FAQ's</h3>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Can I get lab test results online?</Accordion.Header>
                    <Accordion.Body>
                      Yes, A.G Diagnostics provides secure online access to your lab test reports. Once your test is completed, you'll receive a link via SMS, email or  download your report directly from our app.
                    </Accordion.Body>
                  </Accordion.Item>
            
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Do you offer full body checkups or health packages?</Accordion.Header>
                    <Accordion.Body>
                     Yes, we provide a variety of comprehensive health checkup packages such as executive health checkup, women’s wellness package, senior citizen health package which include tests like ECG,Xray,TMT / 2D Echo in addition to blood tests.For appointment call us at <a href="tel:02067636763">02067636763</a>
                    </Accordion.Body>
                  </Accordion.Item>
            
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>What types of lab tests can I book from home?</Accordion.Header>
                    <Accordion.Body>
Majority of blood tests from blood sugar and thyroid to full body checkups as well as COVID tests—we offer a wide range of lab test home collection options that cover your everyday and preventive health needs.                    </Accordion.Body>
                  </Accordion.Item>
            
                   <Accordion.Item eventKey="3">
                    <Accordion.Header>Can I book a lab test for my parents if I’m in a different city?</Accordion.Header>
                    <Accordion.Body>
Yes! You can book a home sample collection online or over the phone from anywhere in India—even abroad—and we’ll take care of your loved ones in Pune with real-time updates.                    </Accordion.Body>
                  </Accordion.Item>
            
            
                </Accordion>
              </Container>
            
              
            </section>
            <FindLabFaqSchema/>
        </>
    );
}


export default FindALabContent;
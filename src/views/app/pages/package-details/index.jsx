import {useState, useEffect} from "react";
import {useCity} from "hooks/home";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {Helmet} from "react-helmet";
import { Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";


import axios from "axios";
import Loader from "views/app/components/loader";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import InnerBanner from "views/app/components/inner-banner";
import PackagesScroll from "views/app/components/packages-scroll";
import PackageDetailsContent from "views/app/components/package-details-content";


const AgCareFaqSchema = () => {
  const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is a CBC blood test and why is it important?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A CBC (Complete Blood Count) blood test measures various components of your blood, such as red blood cells, white blood cells, hemoglobin, and platelets. It helps diagnose infections, anemia, Thrombocytopenia and few medical conditions."
    }
  },{
    "@type": "Question",
    "name": "What does a Fasting Blood Sugar test detect?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The Fasting Blood Sugar (FBS) test measures the glucose levels in your blood after fasting for 8–10 hours. It is a key test for detecting diabetes or prediabetes."
    }
  },{
    "@type": "Question",
    "name": "Can this test detect diabetes early?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. The Fasting Blood Sugar test is one of the primary screenings used to spot prediabetes and early signs of diabetes or —even before symptoms appear."
    }
  },{
    "@type": "Question",
    "name": "Can stress affect my blood test results?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, chronic stress may slightly affect your blood sugar levels or cholesterol. It’s best to stay calm and well-rested before any blood test for the most accurate results."
    }
  },{
    "@type": "Question",
    "name": "Are these tests suitable for people managing high blood pressure?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! If you have high BP, it’s important to also monitor your blood sugar, cholesterol and CBC levels regularly. This package gives a quick, affordable overview of your health status."
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



const PackageDetails = () => {

  
  const {packageName, cityName} = useParams();
  const {data: city} = useCity();
  const [cityData, setCityData] = useState([]);
  const [packageData, setPackageData] = useState(null);
  const [defaultCity, setDefaultCity] = useState(
    localStorage.getItem("city_id") || "490"
  ); //Default pune
  const [cityModal, setCityModal] = useState(false);
  const modalHandler = (status) => {
    setCityModal(status);
  };

  const cityChangeHandler = (values) => {
    setDefaultCity(values?.cityId);
    modalHandler(false);
    localStorage.setItem("city_id", values?.cityId);
  };

  useEffect(() => {
    if (defaultCity) {
      setDefaultCity(defaultCity);
    }
  }, [defaultCity]);

  useEffect(() => {
    if (city) {
      setCityData(city?.city);
    }
  }, [city]);

  useEffect(() => {
    axios
      .get(
        `https://admin.agdiagnostics.com/api/package-detail/${packageName}?city_name=${cityName}`
      )
      .then((response) => {
        setPackageData(response.data?.package_detail);
        document.head.insertAdjacentHTML('beforeend', response.data?.package_detail?.meta_info);
      });
  }, [packageName]);

  return (
    <div>
      <Helmet>
        {/* <meta
          name="description"
          content={packageData?.meta_description ?? packageData?.slug}
        /> */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}git init
        cityModal={cityModal}
        modalHandler={modalHandler}
        hide={"hide"}
      />
      <InnerBanner />
      {packageData === null ? (
        <center>
          <Loader />
        </center>
      ) : (
        <PackageDetailsContent packageData={packageData} />
      )}

       <PackagesScroll defaultCity={defaultCity} />

{packageData?.id === 5 && packageData?.cityId === '490'? (
<>
<section>
  <Container>
      <h3 className="text-center mb-5">FAQ's</h3>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>What is a CBC blood test and why is it important?</Accordion.Header>
        <Accordion.Body>
          A CBC (Complete Blood Count) blood test measures various components of your blood, such as red blood cells, white blood cells, hemoglobin, and platelets. It helps diagnose infections, anemia,Thrombocytopenia and few medical conditions.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>What does a Fasting Blood Sugar test detect?</Accordion.Header>
        <Accordion.Body>
          The Fasting Blood Sugar (FBS) test measures the glucose levels in your blood after fasting for 8–10 hours. It is a key test for detecting diabetes or prediabetes.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Can this test detect diabetes early?</Accordion.Header>
        <Accordion.Body>
          Yes. The Fasting Blood Sugar test is one of the primary screenings used to spot prediabetes and early signs of diabetes or —even before symptoms appear.
        </Accordion.Body>
      </Accordion.Item>

       <Accordion.Item eventKey="3">
        <Accordion.Header>Can stress affect my blood test results?</Accordion.Header>
        <Accordion.Body>
        Yes, chronic stress may slightly affect your blood sugar levels or cholesterol. It’s best to stay calm and well-rested before any blood test for the most accurate results.
        </Accordion.Body>
      </Accordion.Item>

       <Accordion.Item eventKey="4">
        <Accordion.Header>Are these tests suitable for people managing high blood pressure?</Accordion.Header>
        <Accordion.Body>
        Yes! If you have high BP, it’s important to also monitor your blood sugar, cholesterol and CBC levels regularly. This package gives a quick, affordable overview of your health status.
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
  </Container>

  
</section>

<AgCareFaqSchema/>
</>
) : ''}

     
    </div>
  );
};

export default PackageDetails;

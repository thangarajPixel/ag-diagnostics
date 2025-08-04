import React, {useState, useEffect} from "react";
import HomeSlider from "views/app/components/homeslider";
import HomeWhyUs from "views/app/components/home-why-us";
import PackagesScroll from "views/app/components/packages-scroll";
import SimpleSteps from "views/app/components/simple-steps";
import PcrCollection from "views/app/components/pcr-collection";
import HomeWhoWeAre from "views/app/components/home-who-we-are";
import ExpertiseScroll from "views/app/components/expertise-scroll";
import FindCenter from "views/app/components/find-center";
import Testimonials from "views/app/components/home-testimonials";
import {useCity} from "hooks/home";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import MetaTags from "react-meta-tags";
import HomeFaq from "views/app/components/home-faq";


const HomeFaqSchema = () => {
  const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What services are offered at A.G Diagnostics Centre in Pune?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A.G Diagnostics offers a comprehensive range of health checkups, including blood tests, urine tests, pathology, radiology, and preventive health packages. We are known as one of the best diagnostic centres in Pune for accurate quality results and professional care."
    }
  },{
    "@type": "Question",
    "name": "Can I book a blood test home collection?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, A.G Diagnostics provides blood test home collection services across Pune (including PCMC)  for your convenience. Simply book your test online or call us, and our trained phlebotomists will collect your sample at your doorstep safely and hygienically."
    }
  },{
    "@type": "Question",
    "name": "What types of health checkup packages are available?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We offer a variety of packages including basic health checkups, full-body checkups, senior citizen packages, and specialized packages like thyroid, diabetes, and kidney profiles."
    }
  },{
    "@type": "Question",
    "name": "Is it safe to get a blood test done at home?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, totally safe! Our phlebotomists follow strict hygiene protocols,  and use sterilized equipment."
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




export default function Home() {
  const {data: city} = useCity();
  const [cityData, setCityData] = useState([]);
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
    localStorage.removeItem("apply_id");
  }, []);

  return (
    <>
      <MetaTags>
        <title>
          Best Diagnostic Centre in Pune | Dr Ajit Golwilkar Lab | A G
          Diagnostics
        </title>
        <meta
          name="description"
          content="A G Diagnostics: Providing quality pathology laboratory services for over 40 years in Pune and Ahmednagar. Book your test in our nearest Diagnostic Centre now!"
        />
        <link rel="canonical" href="https://www.agdiagnostics.com/" />
      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
      />
      <HomeSlider />
      <HomeWhyUs />
      <PackagesScroll defaultCity={defaultCity} />
      <SimpleSteps />
      <PcrCollection />
      <HomeWhoWeAre />
      <ExpertiseScroll />
      <FindCenter />
      <Testimonials />
      <HomeFaq/>
      <HomeFaqSchema/>
    </>
  );
}

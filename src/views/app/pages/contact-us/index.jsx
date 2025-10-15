import React, { useState, useEffect } from "react";
import ContactUsBanner from "views/app/components/contact-us-banner";
import ContactUsContent from "views/app/components/contact-us-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const ContactUs = () => {

  const { data: city } = useCity();
  const [cityData, setCityData] = useState([]);
  const [defaultCity, setDefaultCity] = useState(localStorage.getItem("city_id") || "490"); //Default pune
  const [cityModal, setCityModal] = useState(false);

  const modalHandler = (status) => {
    setCityModal(status)
  }

  const cityChangeHandler = (values) => {
    setDefaultCity(values?.cityId)
    modalHandler(false)
    localStorage.setItem("city_id", values?.cityId)
  }

  useEffect(() => {
    if (defaultCity) {
      setDefaultCity(defaultCity)
    }
  }, [defaultCity]);

  useEffect(() => {
    if (city) {
      setCityData(city?.city)
    }
  }, [city]);

  return (
    <>
      <MetaTags>
            <title>Contact Us - A G Diagnostics</title>
            <meta name="description" content="Get in touch with A G Diagnostics for all your inquiries including address, phone number and timings. Contact us via email or find us to provide feedback." />
            <link rel="canonical" href="https://www.agdiagnostics.com/contact-us" />

            <meta property="og:url" content="https://www.agdiagnostics.com/contact-us"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Contact Us - A G Diagnostics"/>
<meta property="og:description" content="Get in touch with A G Diagnostics for all your inquiries including address, phone number and timings. Contact us via email or find us to provide feedback."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Contact Us - A G Diagnostics"/>
<meta name="twitter:description" content="Get in touch with A G Diagnostics for all your inquiries including address, phone number and timings. Contact us via email or find us to provide feedback."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>


      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
      />
      <ContactUsBanner />
      <ContactUsContent />
    </>
  );
}

export default ContactUs;

import React, { useState, useEffect } from "react";
import ServicesBanner from "views/app/components/services-banner";
import ServicesContent from "views/app/components/services-content";
import { useCity } from "hooks/home";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import MetaTags from 'react-meta-tags';

const Services = () => {

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
            <title>Directory Of Services - A G Diagnostics</title>
            <meta name="description" content="A G Diagnostics provide wide variety of diagnostic and pathology test. Visit our website to learn more about each test, its method, and its purpose." />
            <link rel="canonical" href="https://www.agdiagnostics.com/services" />

            <meta property="og:url" content="https://www.agdiagnostics.com/services"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Directory Of Services - A G Diagnostics"/>
<meta property="og:description" content="A G Diagnostics provide wide variety of diagnostic and pathology test. Visit our website to learn more about each test, its method, and its purpose."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Directory Of Services - A G Diagnostics"/>
<meta name="twitter:description" content="A G Diagnostics provide wide variety of diagnostic and pathology test. Visit our website to learn more about each test, its method, and its purpose."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>



      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler} />
      <ServicesBanner />
      <ServicesContent defaultCity={defaultCity} />
    </>
  );
}

export default Services;

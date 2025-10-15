import React, { useState, useEffect } from "react";
import BrochuresBanner from "views/app/components/brochure-banner";
import BrochureContent from "views/app/components/brochure-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const Brochures = () => {

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
            <title>Download Brochures - A G Diagnostics</title>
            <meta name="description" content="Download our package booklets and technical leaflets for comprehensive details on diagnostic and pathology lab tests. Get informed today." />
            <link rel="canonical" href="https://www.agdiagnostics.com/brochures" />
            <meta property="og:url" content="https://www.agdiagnostics.com/brochures"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Download Brochures - A G Diagnostics"/>
<meta property="og:description" content="Download our package booklets and technical leaflets for comprehensive details on diagnostic and pathology lab tests. Get informed today."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Download Brochures - A G Diagnostics"/>
<meta name="twitter:description" content="Download our package booklets and technical leaflets for comprehensive details on diagnostic and pathology lab tests. Get informed today."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
      />
      <BrochuresBanner />
      <BrochureContent />
    </>
  );
}


export default Brochures;

import React, { useState, useEffect } from "react";
import TechnicalCapabilitiesBanner from "views/app/components/technical-capabilities-banner";
import TechnicalCapabilitiesContent from "views/app/components/technical-capabilities-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';


const TechnicalCapabilities = () => {

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
          <title>Technical Capabilities - A G Diagnostics </title>
          <meta name="description" content="A G Diagnostics offers cutting-edge technology in Microbiology & Molecular Biology, Hematology, Clinical Pathology, Quality Assurance, and more." />
          <link rel="canonical" href="https://www.agdiagnostics.com/technical-capabilities" />
          <meta property="og:url" content="https://www.agdiagnostics.com/technical-capabilities"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Technical Capabilities - A G Diagnostics"/>
<meta property="og:description" content="A G Diagnostics offers cutting-edge technology in Microbiology & Molecular Biology, Hematology, Clinical Pathology, Quality Assurance, and more."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Technical Capabilities - A G Diagnostics"/>
<meta name="twitter:description" content="A G Diagnostics offers cutting-edge technology in Microbiology & Molecular Biology, Hematology, Clinical Pathology, Quality Assurance, and more."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
      />
      <TechnicalCapabilitiesBanner />
      <TechnicalCapabilitiesContent />
    </>
  );
}

export default TechnicalCapabilities;

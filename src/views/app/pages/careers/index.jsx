import React, { useState, useEffect } from "react";
import CareersBanner from "views/app/components/careers-banner";
import CareersContent from "views/app/components/careers-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const Careers = () => {

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
            <title>Jobs | Careers | A G Diagnostics</title>
            <meta name="description" content="Join A G Diagnostics for a rewarding career with diverse learning, research, and development opportunities. Grow your career with us today." />
            <link rel="canonical" href="https://www.agdiagnostics.com/careers" />

            <meta property="og:url" content="https://www.agdiagnostics.com/careers"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Jobs | Careers | A G Diagnostics"/>
<meta property="og:description" content="Join A G Diagnostics for a rewarding career with diverse learning, research, and development opportunities. Grow your career with us today."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Jobs | Careers | A G Diagnostics"/>
<meta name="twitter:description" content="Join A G Diagnostics for a rewarding career with diverse learning, research, and development opportunities. Grow your career with us today."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>


      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
      />
      <CareersBanner />
      <CareersContent />
    </>
  );
}

export default Careers;

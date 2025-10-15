import React, { useState, useEffect } from "react";
import FindALabBanner from "views/app/components/find-a-lab-banner";
import FindALabContent from "views/app/components/find-a-lab-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const FindALab = () => {

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
          <title>Find our Nearby Best Quality Pathology Lab in Pune & Ahmednagar - A.G Diagnostics</title>
          <meta name="description" content="We have more than 50 sample collection centers in Pune and Ahmednagar. Check out a nearby Diagnostic Centre for Blood Tests and Full Body Checkups." />
          <link rel="canonical" href="https://www.agdiagnostics.com/find-a-lab" />

          <meta property="og:url" content="https://www.agdiagnostics.com/find-a-lab"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Find our Nearby Best Quality Pathology Lab in Pune & Ahmednagar - A.G Diagnostics"/>
<meta property="og:description" content="We have more than 50 sample collection centers in Pune and Ahmednagar. Check out a nearby Diagnostic Centre for Blood Tests and Full Body Checkups."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>

<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Find our Nearby Best Quality Pathology Lab in Pune & Ahmednagar - A.G Diagnostics"/>
<meta name="twitter:description" content="We have more than 50 sample collection centers in Pune and Ahmednagar. Check out a nearby Diagnostic Centre for Blood Tests and Full Body Checkups."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>



      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
        hide="hide"
      />
      <FindALabBanner />
      <FindALabContent />
    </>
  );
}

export default FindALab;

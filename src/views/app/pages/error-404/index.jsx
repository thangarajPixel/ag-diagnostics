import React, { useState, useEffect } from "react";
import ErrorContent from "views/app/components/404-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';


const Error404 = () => {

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
            <title>404 Page - A.G Diagnostics</title>
            <meta name="description" content="404 Page - A.G Diagnostics" />
      </MetaTags>
      <Menubar
        defaultCity={defaultCity}
        cityData={cityData}
        cityChangeHandler={cityChangeHandler}
        cityModal={cityModal}
        modalHandler={modalHandler}
      />
      <ErrorContent />
    </>
  );
}

export default Error404;

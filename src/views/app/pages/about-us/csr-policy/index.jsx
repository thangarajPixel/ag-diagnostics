import React, { useState, useEffect } from "react";
import CsrBanner from "views/app/components/csr-policy-banner";
import CsrContent from "views/app/components/csr-policy-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const CsrPolicy = () => {

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
                <title>Corporate Social Responsibility (CSR) - A G Diagnostics</title>
                <meta name="description" content="A G Diagnostics Private Limited is committed to conducting sustainable and ethical business practices through its Corporate Social Responsibility (CSR) activities." />
                <link rel="canonical" href="https://www.agdiagnostics.com/about-us/csr-policy" />


<meta property="og:url" content="https://www.agdiagnostics.com/about-us/csr-policy"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Corporate Social Responsibility (CSR) - A G Diagnostics"/>
<meta property="og:description" content="A G Diagnostics Private Limited is committed to conducting sustainable and ethical business practices through its Corporate Social Responsibility (CSR) activities."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>


<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Corporate Social Responsibility (CSR) - A G Diagnostics"/>
<meta name="twitter:description" content="A G Diagnostics Private Limited is committed to conducting sustainable and ethical business practices through its Corporate Social Responsibility (CSR) activities."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/logo.e0343e7e9281d6cf4eb9.png"/>


            </MetaTags>
            <Menubar
                defaultCity={defaultCity}
                cityData={cityData}
                cityChangeHandler={cityChangeHandler}
                cityModal={cityModal}
                modalHandler={modalHandler}
            />
            <CsrBanner />
            <CsrContent />
        </>
    );
}

export default CsrPolicy;

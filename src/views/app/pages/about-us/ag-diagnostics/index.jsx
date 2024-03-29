import React, { useState, useEffect } from "react";
import AboutUsBanner from "views/app/components/about-us-banner";
import AboutContent from "views/app/components/about-content";
import HomeWhyUs from "views/app/components/home-why-us";
import OurValues from "views/app/components/our-values";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const AboutUs = () => {

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
                <title>About Our Pathology and Diagnostic Centre | A G Diagnostics</title>
                <meta name="description" content="A G Diagnostics is the most reputed lab in Pune and Ahmednagar with over 50 collection centres staffed with expert pathologists, phlebotomists & technicians." />
                <link rel="canonical" href="https://www.agdiagnostics.com/about-us/ag-diagnostics" />
            </MetaTags>
            <Menubar
                defaultCity={defaultCity}
                cityData={cityData}
                cityChangeHandler={cityChangeHandler}
                cityModal={cityModal}
                modalHandler={modalHandler}
            />
            <AboutUsBanner />
            <AboutContent />
            <HomeWhyUs />
            <OurValues />
        </>
    );
}
export default AboutUs;

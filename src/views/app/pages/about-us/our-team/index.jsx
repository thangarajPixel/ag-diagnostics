import React, { useState, useEffect } from "react";
import TeamBanner from "views/app/components/team-banner";
import TeamContent from "views/app/components/team-content";
import Menubar from "layouts/utility/menu-bar/Menu-bar";
import { useCity } from "hooks/home";
import MetaTags from 'react-meta-tags';

const OurTeam = () => {

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
                <title>Meet Our Dr Ajit Golwilkar Lab Team - A G Diagnostics</title>
                <meta name="description" content="A G Diagnostics: 20+ years of tech team experience for efficient and ethical services. Stay ahead with our innovative practices and cutting-edge technology." />
                <link rel="canonical" href="https://www.agdiagnostics.com/about-us/our-team" />


<meta property="og:url" content="https://www.agdiagnostics.com/about-us/our-team"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Meet Our Dr Ajit Golwilkar Lab Team - A G Diagnostics"/>
<meta property="og:description" content="A G Diagnostics: 20+ years of tech team experience for efficient and ethical services. Stay ahead with our innovative practices and cutting-edge technology."/>
<meta property="og:image" content="https://www.agdiagnostics.com/static/media/about-2.8892246d2f2160c45813.jpg"/>


<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Meet Our Dr Ajit Golwilkar Lab Team - A G Diagnostics"/>
<meta name="twitter:description" content="A G Diagnostics: 20+ years of tech team experience for efficient and ethical services. Stay ahead with our innovative practices and cutting-edge technology."/>
<meta name="twitter:image" content="https://www.agdiagnostics.com/static/media/about-2.8892246d2f2160c45813.jpg"/>


            </MetaTags>
            <Menubar
                defaultCity={defaultCity}
                cityData={cityData}
                cityChangeHandler={cityChangeHandler}
                cityModal={cityModal}
                modalHandler={modalHandler}
            />
            <TeamBanner />
            <TeamContent />
        </>
    );
}

export default OurTeam;

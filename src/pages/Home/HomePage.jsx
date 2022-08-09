import React from "react";
import CityWeather from "../../components/cityWeather/cityWeather";
import Forecast from "../../components/forecast/forecast";
import './Homepage.css'
const HomePage = () => {


    return (
        <div className="Homepage">
            <CityWeather />
            <Forecast />

        </div>
    );
}

export default HomePage;

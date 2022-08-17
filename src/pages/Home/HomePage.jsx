import { Form } from "formik";
import React from "react";
import CityWeather from "../../components/cityWeather/cityWeather";
import Forecast from "../../components/forecast/forecast";
import FormSearch from "../../components/formSearchCity/formSearch";
import Hightlights from "../../components/hightlights/hightlights";
import './Homepage.css'
const HomePage = () => {


    return (
        <div className="Homepage">
            <CityWeather />
            <div>
                {/* <Forecast /> */}
                <Hightlights />

            </div>

        </div>
    );
}

export default HomePage;

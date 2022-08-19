import React, { useState, useContext } from "react";
import CityWeather from "../../components/cityWeather/cityWeather";
import Forecast from "../../components/forecast/forecast";
import FormSearch from "../../components/formSearchCity/formSearch";
import Hightlights from "../../components/hightlights/hightlights";
import './Homepage.css'
import { getUserPosition } from '../../utils/Geolocalization'


const HomePage = () => {

    //Coord initial when there is no City name
    const initialStates = [51.507351, -0.127758]

    const [geolocation, setGeolocation] = useState(initialStates);

    const finaPosition = () => {
        getUserPosition()
            .then(res => {
                setGeolocation(res)
            })
            .catch(err => console.log(err))
            .finally(() => console.log('Finished get coords'))
    }


    return (
        <div className="Homepage">
            <CityWeather
                geolocation={geolocation}
                setGeolocation={setGeolocation}
                finaPosition={finaPosition}
            />
            <div>
                <Forecast />
                <Hightlights
                    geolocation={geolocation}
                />

            </div>

        </div >
    );
}

export default HomePage;

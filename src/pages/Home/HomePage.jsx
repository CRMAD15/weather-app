import React, { useState, } from "react";
import CityWeather from "../../components/cityWeather/cityWeather";
import Forecast from "../../components/forecast/forecast";
import Hightlights from "../../components/hightlights/hightlights";
import './Homepage.css'
import { getUserPosition } from '../../utils/Geolocalization'
import ButtonsUnits from "../../components/btnsComponent/buttonsUnits";


const HomePage = () => {

    //Coord initial when there is no City name
    const initialStates = [51.507351, -0.127758]
    const [units, setUnits] = useState('metric')

    const [geolocation, setGeolocation] = useState(initialStates);

    const finalPosition = () => {
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
                finalPosition={finalPosition}
                units={units}
            />
            <div>
                <ButtonsUnits
                    setUnits={setUnits}
                />
                <Forecast
                    geolocation={geolocation}
                    units={units}
                />
                <Hightlights
                    geolocation={geolocation}
                    units={units}
                />

            </div>

        </div >
    );
}

export default HomePage;

import React, { useState } from 'react';
import weatherService from '../services/weather.service';


const CityWeather = () => {
    const [cityWeather, setCityWeather] = useState();


    const city = "Madrid"
    const getInfoPerDay = () => {
        weatherService
            .weatherByCity(city)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div onClick={getInfoPerDay}>
            holaa
        </div>
    );
}

export default CityWeather;

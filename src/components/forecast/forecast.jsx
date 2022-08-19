import React, { useState, useEffect, useContext } from 'react';
import weatherService from "../../services/weather.service";
import ForecastCard from '../forecastCard/forecastCard';
import Loader from '../loader/loader';
import './forecast.css'
import { CityContext } from '../../context/cityContext';
import { divideDaysForescast } from '../../utils/ChangeInfoFromApi';

const Forecast = () => {
    const { city } = useContext(CityContext)

    const [forecastData, setForecastData] = useState([])

    useEffect(() => {
        forecast()
    }, [city]);

    const forecast = () => {
        if (city) {
            weatherService
                .getForecast(city)
                .then(({ data }) => {
                    setForecastData(data)

                })
                .catch(err => console.log(err))
        }
    }

    let realValuesOfForecast = divideDaysForescast(forecastData.list)
    return (
        <div className='days-week'>

            {
                !realValuesOfForecast ?
                    <Loader /> :
                    realValuesOfForecast.map((forecastDay, idx) => {
                        return (
                            <ForecastCard
                                key={idx}
                                forecastDay={forecastDay}
                            />


                        )
                    }
                    )

            }

        </div>

    );
}

export default Forecast;

import React, { useState, useEffect } from 'react';
import weatherService from "../../services/weather.service";
import ForecastCard from '../forecastCard/forecastCard';
import './forecast.css'
const Forecast = () => {


    const [forecastData, setForecastData] = useState([])

    useEffect(() => {
        forecast()
    }, []);
    const city = 'Madrid'
    const days = 5

    const forecast = () => {
        weatherService
            .getForecast(city, days)
            .then(({ data }) => {
                setForecastData(data.forecast.forecastday)

            })
            .catch(err => console.log(err))

    }

    console.log(forecastData)

    return (
        <div className='days-week'>

            {
                forecastData?.map((forecastDay, idx) => {
                    return (
                        <ForecastCard
                            key={idx}
                            {...forecastDay}
                        />
                    )
                })

            }

        </div>

    );
}

export default Forecast;

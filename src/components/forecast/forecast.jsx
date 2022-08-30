import React, { useState, useEffect, useContext } from 'react';
import weatherService from "../../services/weather.service";
import ForecastCard from '../forecastCard/forecastCard';
import Loader from '../loader/loader';
import './forecast.css'
import { CityContext } from '../../context/cityContext';
import { divideDaysForescast } from '../../utils/ChangeInfoFromApi';

const Forecast = ({ geolocation, units }) => {
    const { city } = useContext(CityContext)

    const [forecastData, setForecastData] = useState([])

    useEffect(() => {
        forecast()
    }, [city, units]);

    const forecast = () => {
        if (city) {
            weatherService
                .getForecast(city, units)
                .then(({ data }) => {
                    setForecastData(data)

                })
                .catch(err => console.log(err))
                .finally(() => console.log('Finished promise by CITY in forecast'))

        } else {
            let lat;
            let lon;
            lat = geolocation[0];
            lon = geolocation[1];
            weatherService
                .getForecastByCoords(lat, lon, units)
                .then(({ data }) => {
                    setForecastData(data)
                })
                .catch(error => console.log(error))
                .finally(() => console.log('Finished promise by coords in forecast'))
        }
    }

    let realValuesOfForecast = divideDaysForescast(forecastData.list)
    return (
        <div >
            {

                !realValuesOfForecast ?
                    <Loader /> :
                    <div className='days-week'>

                        {realValuesOfForecast.map((forecastDay, idx) => {
                            return (
                                <ForecastCard
                                    key={idx}
                                    forecastDay={forecastDay}
                                    units={units}
                                />
                            )
                        }

                        )}
                    </div>

            }

        </div>

    );
}

export default Forecast;

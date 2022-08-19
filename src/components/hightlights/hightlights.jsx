import React, { useEffect, useState, useContext } from 'react';
import weatherService from '../../services/weather.service';
import './hightlights.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import BarStatus from '../barStatus/barStatus';
import { CityContext } from '../../context/cityContext'
import Loader from '../loader/loader';

const Hightlights = ({ geolocation }) => {

    const [weatherData, setWeatherData] = useState();
    const { city } = useContext(CityContext);


    useEffect(() => {
        getWeatgerPerDay()
    }, [city]);

    const getWeatgerPerDay = () => {
        if (city) {
            weatherService
                .weatherByCity(city)
                .then(({ data }) => {
                    setWeatherData(data)
                })
                .catch(err => console.log(err))
                .finally(() => console.log('Finished promise by city on hightlights'))
        } else {
            let lat;
            let lon;
            lat = geolocation[0];
            lon = geolocation[1];
            weatherService
                .weatherByLatLon(lat, lon)
                .then(({ data }) => {
                    setWeatherData(data)
                })
                .catch(error => console.log(error))
                .finally(() => console.log('Finished promise by coords on hightlights'))
        }
    }
    const statusHumedity = weatherData?.main.humidity + '%'

    return (
        <div>
            {
                weatherData ?
                    <div className='main-hightlight-container' >
                        <h1>Today's Hightlights of {weatherData.name}</h1>
                        <div className="hightlight-container">
                            <div className='wind-status'>
                                <h3>Wind status</h3>
                                <h1>{weatherData.wind.speed} kph</h1>
                                <div className='navigation-icon'>
                                    <NavigationIcon
                                        fontSize='small'
                                        style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}
                                    />
                                    <h3>{weatherData.wind.deg}</h3>
                                </div>

                            </div>
                            <div className="humidity-status">
                                <h3>Humidity</h3>
                                <h1>{weatherData.main.humidity}%</h1>
                                <div className='bar-status-center'>
                                    <BarStatus
                                        status={statusHumedity}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3>Visivility</h3>
                                <h1>{weatherData.visibility} km</h1>
                            </div>
                            <div>
                                <h3>Air Pressure</h3>
                                <h1>{weatherData.main.pressure} mb </h1>
                            </div>
                        </div>
                    </div>
                    :
                    <Loader />
            }
            <p className='footer-hightlights'>Created by <span>Cristian Calderón</span></p>
        </div>
    );
}

export default Hightlights;

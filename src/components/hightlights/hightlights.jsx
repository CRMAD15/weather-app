import React, { useEffect, useState, useContext } from 'react';
import weatherService from '../../services/weather.service';
import './hightlights.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import BarStatus from '../barStatus/barStatus';
import { CityContext } from '../../context/cityContext'
import Loader from '../loader/loader';

const Hightlights = () => {

    const [weatherData, setWeatherData] = useState();
    const { city } = useContext(CityContext);



    useEffect(() => {
        getWeatgerPerDay()
    }, []);


    const getWeatgerPerDay = () => {
        if (city) {
            weatherService
                .weatherByCity(city)
                .then(({ data }) => {
                    console.log(data)
                    setWeatherData(data)
                })
                .catch(err => console.log(err))
                .finally(() => console.log('Finished promise in hightlights'))


        }


    }

    const statusHumedity = weatherData?.main.humidity + '%'

    return (
        <div>
            {
                weatherData ?
                    <div className='main-hightlight-container' >
                        <h1>Today's Hightlights</h1>
                        <div className="hightlight-container">
                            <div className='wind-status'>
                                <h3>Wind status</h3>
                                <h1>{weatherData.wind.speed} kph</h1>
                                <div className='navigation-icon'>
                                    <NavigationIcon fontSize='small' style={{ transform: `rotate(${weatherData.wind.deg}deg)` }} />
                                    <h3>{weatherData.wind.deg}</h3>
                                </div>

                            </div>
                            <div className="humidity-status">
                                <h3>Humidity</h3>
                                <h1>{weatherData.main.humidity}%</h1>
                                <div className='bar-status-center'>
                                    <BarStatus
                                        status={statusHumedity} />
                                </div>
                            </div>
                            <div>
                                <h3>Visivility</h3>
                                <h1>{weatherData.visibility} km</h1>
                            </div>
                            <div>
                                <h3>Air Pressure</h3>
                                <h1>{weatherData.pressure} mb</h1>
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

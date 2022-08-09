import React, { useEffect, useState } from 'react';
import weatherService from '../../services/weather.service';
import './hightlights.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import BarStatus from '../barStatus/barStatus';

const Hightlights = () => {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        getWeatgerPerDay()
    }, []);
    const city = 'Valencia'


    const getWeatgerPerDay = () => {
        weatherService
            .weatherByCity(city)
            .then(({ data }) => {
                setWeatherData(data)
            })
            .catch(err => console.log(err))

    }

    const statusHumedity = weatherData?.current.humidity + '%'

    return (
        <div className='main-hightlight-container' >
            <h1>Today's Hightlights</h1>
            <div className="hightlight-container">
                <div className='wind-status'>
                    <h3>Wind status</h3>
                    <h1>{weatherData?.current.wind_kph} kph</h1>
                    <div className='navigation-icon'>
                        <NavigationIcon fontSize='small' style={{ transform: `rotate(${weatherData?.current.wind_degree}deg)` }} />
                        <h3>{weatherData?.current.wind_dir}</h3>
                    </div>


                </div>
                <div className="humidity-status">
                    <h3>Humidity</h3>
                    <h1>{weatherData?.current.humidity}%</h1>
                    <div className='bar-status-center'>
                        <BarStatus
                            status={statusHumedity} />
                    </div>
                </div>
                <div>
                    <h3>Visivility</h3>
                    <h1>{weatherData?.current.vis_km} km</h1>
                </div>
                <div>
                    <h3>Air Pressure</h3>
                    <h1>{weatherData?.current.pressure_mb} mb</h1>
                </div>
            </div>

        </div>
    );
}

export default Hightlights;

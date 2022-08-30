import React from 'react';
import './forecastCard.css'
import { getDaysWeekForecast } from '../../utils/DateFunciton';

const ForecastCard = ({ forecastDay, units }) => {

    let firstArr = forecastDay[0]
    let secondArr = forecastDay[2]
    let thridArr = forecastDay[4]

    const days = getDaysWeekForecast(firstArr.dt_txt)
    const maxTemp = Math.round(thridArr.main.temp_max)
    const mminTemp = Math.round(secondArr.main.temp_min)


    console.log(forecastDay)
    let iconUrl = `https://openweathermap.org/img/wn/${secondArr.weather[0].icon}@2x.png`

    return (
        <div className='forecastCard-container'>
            <h3>{days}</h3>
            <img src={iconUrl} alt="Logo type weather" />
            <div className='temperatures'>
                <h6>{maxTemp} {units === 'metric' ? 'ºC' : 'ºF'}</h6>
                <h6 className='min-temperature'>{mminTemp} {units === 'metric' ? 'ºC' : 'ºF'}</h6>
            </div>
        </div>
    );
}

export default ForecastCard;

import React from 'react';
import './forecastCard.css'
import { getDaysWeekForecast } from '../../utils/DateFunciton';

const ForecastCard = ({ forecastDay }) => {

    let firstArr = forecastDay[0]


    const days = getDaysWeekForecast(firstArr.dt_txt)
    const maxTemp = Math.round(firstArr.main.temp_max)
    const mminTemp = Math.round(firstArr.main.temp_min)


    console.log(firstArr.weather.icon)
    let iconUrl = `https://openweathermap.org/img/wn/${firstArr.weather[0].icon}@2x.png`

    return (
        <div className='forecastCard-container'>
            <h3>{days}</h3>
            <img src={iconUrl} alt="Logo type weather" />
            <div className='temperatures'>
                <h6>{maxTemp}ºC</h6>
                <h6 className='min-temperature'>{mminTemp}ºC</h6>
            </div>
        </div>
    );
}

export default ForecastCard;

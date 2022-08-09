import React from 'react';
import './forecastCard.css'
import { getDaysWeekForecast } from '../../utils/DateFunciton';

const ForecastCard = ({ date, day }) => {

    const days = getDaysWeekForecast(date)
    const maxTemp = Math.round(day.maxtemp_c)
    const mminTemp = Math.round(day.mintemp_c)


    return (
        <div className='forecastCard-container'>
            <h3>{days}</h3>
            <img src={day.condition.icon} alt="Logo type weather" />
            <div className='temperatures'>
                <h6>{maxTemp}ºC</h6>
                <h6 className='min-temperature'>{mminTemp}ºC</h6>
            </div>
        </div>
    );
}

export default ForecastCard;

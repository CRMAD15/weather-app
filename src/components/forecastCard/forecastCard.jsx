import React from 'react';
import './forecastCard.css'
import { getDaysWeekForecast } from '../../utils/DateFunciton';

const ForecastCard = ({ date, day }) => {
    console.log(date)

    const days = getDaysWeekForecast(date)
    return (
        <div className='forecastCard-container'>
            <h3>{days}</h3>
            <img src={day.condition.icon} alt="Logo type weather" />
            <div className='temperatures'>
                <h6>{day.maxtemp_c}</h6>
                <h6>{day.mintemp_c}</h6>
            </div>
        </div>
    );
}

export default ForecastCard;
